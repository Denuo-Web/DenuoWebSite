#!/usr/bin/env bash
# Provision the shakescape/ Handshake authority beside the existing denuoweb/
# authority. Run as root on denuoweb-vm after the shakescape.com site is live.
set -euo pipefail

if [[ ${EUID} -ne 0 ]]; then
  echo "run this script as root" >&2
  exit 2
fi

readonly zone='shakescape'
readonly public_ipv4='35.212.156.128'
readonly internal_ipv4='10.138.0.2'
readonly zone_dir='/etc/bind/zones'
readonly unsigned_zone="${zone_dir}/db.${zone}"
readonly signed_zone="${zone_dir}/db.${zone}.signed"
readonly hns_cert_dir='/etc/ssl/shakescape'
readonly hns_cert="${hns_cert_dir}/shakescape.crt"
readonly hns_key="${hns_cert_dir}/shakescape.key"
stamp="$(date -u +%Y%m%dT%H%M%SZ)"
readonly stamp
readonly backup_dir="/var/backups/shakescape-hns/${stamp}"

for command in awk dig dnssec-dsfromkey dnssec-keygen dnssec-signzone dnssec-verify \
  grep named-checkconf named-checkzone nginx openssl python3 rndc systemctl; do
  command -v "${command}" >/dev/null 2>&1 || {
    echo "required command is unavailable: ${command}" >&2
    exit 2
  }
done

install -d -o root -g root -m 0700 "${backup_dir}"

backup() {
  local source="$1"
  if [[ -e "${source}" || -L "${source}" ]]; then
    cp -a -- "${source}" "${backup_dir}/$(basename "${source}")"
  fi
}

for path in \
  /etc/bind/named.conf \
  /etc/bind/named.conf.local \
  /etc/bind/named.conf.options \
  /etc/nginx/nginx.conf \
  /etc/nginx/sites-available/shakescape-hns \
  /etc/systemd/system/shakescape-dnssec-sign.service \
  /etc/systemd/system/shakescape-dnssec-sign.timer \
  /usr/local/sbin/shakescape-dnssec-sign; do
  backup "${path}"
done

install -d -o root -g root -m 0750 "${hns_cert_dir}"
if [[ ! -s "${hns_cert}" || ! -s "${hns_key}" ]]; then
  openssl req \
    -x509 \
    -newkey ec \
    -pkeyopt ec_paramgen_curve:prime256v1 \
    -nodes \
    -sha256 \
    -days 397 \
    -subj '/CN=shakescape' \
    -addext 'subjectAltName=DNS:shakescape,DNS:www.shakescape,DNS:ns1.shakescape' \
    -keyout "${hns_key}" \
    -out "${hns_cert}"
fi
chown root:root "${hns_cert}" "${hns_key}"
chmod 0644 "${hns_cert}"
chmod 0600 "${hns_key}"
openssl x509 -in "${hns_cert}" -noout -checkend 2592000 >/dev/null
openssl x509 -in "${hns_cert}" -noout -ext subjectAltName | grep -Fq 'DNS:shakescape'

install -o root -g bind -m 0644 "${hns_cert}" /etc/bind/doh/shakescape.crt
install -o root -g bind -m 0640 "${hns_key}" /etc/bind/doh/shakescape.key

spki_sha256="$({
  openssl x509 -in "${hns_cert}" -pubkey -noout |
    openssl pkey -pubin -outform DER
} | openssl dgst -sha256 | awk '{print $2}')"
[[ "${spki_sha256}" =~ ^[0-9a-f]{64}$ ]] || {
  echo "failed to derive the shakescape SPKI SHA-256 pin" >&2
  exit 1
}

install -d -o root -g bind -m 0750 "${zone_dir}"
shopt -s nullglob
private_keys=("${zone_dir}"/Kshakescape.+013+*.private)
shopt -u nullglob
if [[ ${#private_keys[@]} -eq 0 ]]; then
  (
    cd "${zone_dir}"
    dnssec-keygen -a ECDSAP256SHA256 -b 256 -n ZONE shakescape >/dev/null
    dnssec-keygen -a ECDSAP256SHA256 -b 256 -n ZONE -f KSK shakescape >/dev/null
  )
fi

shopt -s nullglob
private_keys=("${zone_dir}"/Kshakescape.+013+*.private)
public_keys=("${zone_dir}"/Kshakescape.+013+*.key)
shopt -u nullglob
if [[ ${#private_keys[@]} -ne 2 || ${#public_keys[@]} -ne 2 ]]; then
  echo "expected exactly one shakescape KSK and one ZSK" >&2
  exit 1
fi
chown root:bind "${private_keys[@]}" "${public_keys[@]}"
chmod 0640 "${private_keys[@]}"
chmod 0644 "${public_keys[@]}"

serial="$(date -u +%Y%m%d)00"
cat >"${unsigned_zone}.new" <<EOF
\$ORIGIN shakescape.
\$TTL 300

@   IN SOA ns1.shakescape. hostmaster.shakescape. (
        ${serial} ; serial
        300        ; refresh
        300        ; retry
        1209600    ; expire
        300        ; minimum
)

@       IN NS    ns1.shakescape.
ns1     IN A     ${public_ipv4}
_dns.ns1 IN SVCB 1 shakescape. alpn=h2 port=8443 ipv4hint=${public_ipv4} dohpath=/dns-query{?dns}
@       IN A     ${public_ipv4}
@       IN HTTPS 1 . alpn="h3,h2,http/1.1"
www     IN A     ${public_ipv4}
_443._tcp IN TLSA 3 1 1 ${spki_sha256}
_443._tcp.ns1 IN TLSA 3 1 1 ${spki_sha256}
EOF
chown root:bind "${unsigned_zone}.new"
chmod 0644 "${unsigned_zone}.new"
named-checkzone -k fail -n fail shakescape. "${unsigned_zone}.new" >/dev/null
mv -f -- "${unsigned_zone}.new" "${unsigned_zone}"

dnssec-signzone \
  -S \
  -K "${zone_dir}" \
  -o shakescape. \
  -N date \
  -e +35d \
  -f "${signed_zone}.new" \
  "${unsigned_zone}" >/dev/null
dnssec-verify -o shakescape. "${signed_zone}.new"
named-checkzone -k fail -n fail shakescape. "${signed_zone}.new" >/dev/null
chown root:bind "${signed_zone}.new"
chmod 0644 "${signed_zone}.new"
mv -f -- "${signed_zone}.new" "${signed_zone}"

cat >/etc/bind/named.conf.shakescape-tls <<'EOF'
tls shakescape-hns-doh-tls {
    cert-file "/etc/bind/doh/shakescape.crt";
    key-file "/etc/bind/doh/shakescape.key";
};
EOF
cat >/etc/bind/named.conf.shakescape-zone <<'EOF'
zone "shakescape" {
    type master;
    file "/etc/bind/zones/db.shakescape.signed";
};
EOF
chown root:bind /etc/bind/named.conf.shakescape-tls /etc/bind/named.conf.shakescape-zone
chmod 0644 /etc/bind/named.conf.shakescape-tls /etc/bind/named.conf.shakescape-zone

python3 - <<'PY'
from pathlib import Path

def insert_once(path: str, marker: str, anchor: str, addition: str) -> None:
    target = Path(path)
    text = target.read_text()
    if marker in text:
        return
    if text.count(anchor) != 1:
        raise SystemExit(f"expected exactly one anchor in {path}: {anchor!r}")
    target.write_text(text.replace(anchor, anchor + addition, 1))

insert_once(
    "/etc/bind/named.conf",
    'include "/etc/bind/named.conf.shakescape-tls";',
    'tls denuoweb-hns-doh-tls {\n    cert-file "/etc/bind/doh/denuoweb.crt";\n    key-file "/etc/bind/doh/denuoweb.key";\n};\n',
    '\ninclude "/etc/bind/named.conf.shakescape-tls";\n',
)
insert_once(
    "/etc/bind/named.conf.local",
    'include "/etc/bind/named.conf.shakescape-zone";',
    'zone "denuoweb" {\n    type master;\n    file "/etc/bind/zones/db.denuoweb.signed";\n};\n',
    '\ninclude "/etc/bind/named.conf.shakescape-zone";\n',
)
insert_once(
    "/etc/bind/named.conf.options",
    "listen-on port 9444 tls shakescape-hns-doh-tls",
    "    listen-on port 9443 tls denuoweb-hns-doh-tls http denuoweb-doh { 127.0.0.1; };\n",
    "    listen-on port 9444 tls shakescape-hns-doh-tls http denuoweb-doh { 127.0.0.1; };\n",
)
nginx_path = Path("/etc/nginx/nginx.conf")
nginx_text = nginx_path.read_text()
nginx_lines = [
    line for line in nginx_text.splitlines(keepends=True)
    if not (
        line.strip().startswith("shakescape ")
        or line.strip().startswith("shakescape. ")
    )
]
nginx_text = "".join(nginx_lines)
nginx_anchor = "        denuoweb.         127.0.0.1:9443;\n"
if nginx_text.count(nginx_anchor) != 1:
    raise SystemExit("expected exactly one denuoweb DoH map anchor")
nginx_path.write_text(
    nginx_text.replace(
        nginx_anchor,
        nginx_anchor
        + "        shakescape        127.0.0.1:9444;\n"
        + "        shakescape.       127.0.0.1:9444;\n",
        1,
    )
)
PY

cat >/etc/nginx/sites-available/shakescape-hns <<'EOF'
server {
    listen 80;
    server_name shakescape shakescape. www.shakescape www.shakescape.;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen 443 quic;
    http2 on;
    server_name shakescape shakescape. www.shakescape www.shakescape.;

    ssl_certificate     /etc/ssl/shakescape/shakescape.crt;
    ssl_certificate_key /etc/ssl/shakescape/shakescape.key;

    add_header Alt-Svc 'h3=":443"; ma=86400' always;
    add_header X-Shakescape-Transports 'h2,h3,websocket' always;
    add_header X-Content-Type-Options 'nosniff' always;
    add_header X-Frame-Options 'SAMEORIGIN' always;
    add_header Referrer-Policy 'strict-origin-when-cross-origin' always;
    add_header Permissions-Policy 'camera=(), microphone=(), geolocation=()' always;

    root /var/www/shakescape;
    index index.html;
    access_log /var/log/nginx/shakescape-hns.access.log;
    error_log /var/log/nginx/shakescape-hns.error.log;

    location = /transport.json {
        default_type application/json;
        add_header Cache-Control 'no-store' always;
        return 200 '{"site":"shakescape","protocol":"$server_protocol","server":"nginx","http3Advertised":true,"websocket":"/ws"}';
    }

    location /ws {
        proxy_pass http://127.0.0.1:8765;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $denuoweb_connection_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 120s;
    }

    location = /index.html {
        add_header Cache-Control 'no-cache';
        try_files $uri =404;
    }

    location ~* \.(?:css|js|png|jpe?g|gif|svg|webp|ico|woff2?|ttf)$ {
        expires 7d;
        add_header Cache-Control 'public, max-age=604800, immutable';
        try_files $uri =404;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
chown root:root /etc/nginx/sites-available/shakescape-hns
chmod 0644 /etc/nginx/sites-available/shakescape-hns
ln -sfn /etc/nginx/sites-available/shakescape-hns /etc/nginx/sites-enabled/shakescape-hns

cat >/usr/local/sbin/shakescape-dnssec-sign <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
readonly zone_name='shakescape.'
readonly zone_dir='/etc/bind/zones'
readonly unsigned_zone="${zone_dir}/db.shakescape"
readonly signed_zone="${zone_dir}/db.shakescape.signed"
readonly lock_file='/run/lock/shakescape-dnssec-sign.lock'

exec 9>"${lock_file}"
flock -n 9 || exit 0
work_dir="$(mktemp -d /var/tmp/shakescape-dnssec.XXXXXX)"
trap 'rm -rf -- "${work_dir}"' EXIT
candidate="${work_dir}/db.shakescape.signed"

dnssec-signzone -S -K "${zone_dir}" -o "${zone_name}" -N date -e +35d \
  -f "${candidate}" "${unsigned_zone}" >/dev/null
dnssec-verify -o "${zone_name}" "${candidate}"
named-checkzone -k fail -n fail "${zone_name}" "${candidate}" >/dev/null
backup="${signed_zone}.bak-$(date -u +%Y%m%dT%H%M%SZ)"
cp -p -- "${signed_zone}" "${backup}"
install -o root -g bind -m 0644 "${candidate}" "${signed_zone}.new"
mv -f -- "${signed_zone}.new" "${signed_zone}"
if ! rndc reload shakescape; then
  cp -p -- "${backup}" "${signed_zone}"
  rndc reload shakescape || true
  exit 1
fi
EOF
chmod 0755 /usr/local/sbin/shakescape-dnssec-sign

cat >/etc/systemd/system/shakescape-dnssec-sign.service <<'EOF'
[Unit]
Description=Renew and verify the shakescape DNSSEC-signed authoritative zone
After=named.service
Wants=named.service
ConditionPathExists=/etc/bind/zones/db.shakescape
ConditionPathExists=/etc/bind/zones/db.shakescape.signed

[Service]
Type=oneshot
UMask=0027
ExecStart=/usr/local/sbin/shakescape-dnssec-sign
EOF
cat >/etc/systemd/system/shakescape-dnssec-sign.timer <<'EOF'
[Unit]
Description=Weekly shakescape DNSSEC signature renewal

[Timer]
OnCalendar=weekly
Persistent=true
RandomizedDelaySec=30m
AccuracySec=1m
Unit=shakescape-dnssec-sign.service

[Install]
WantedBy=timers.target
EOF
chmod 0644 /etc/systemd/system/shakescape-dnssec-sign.service \
  /etc/systemd/system/shakescape-dnssec-sign.timer

named-checkconf
named-checkzone -k fail -n fail shakescape. "${signed_zone}" >/dev/null
nginx -t

systemctl daemon-reload
rndc reconfig
rndc reload shakescape
systemctl reload nginx
systemctl enable --now shakescape-dnssec-sign.timer

dig @127.0.0.1 shakescape. SOA +dnssec +short | grep -Fq 'ns1.shakescape.'
openssl s_client -connect 127.0.0.1:443 -servername shakescape </dev/null 2>/dev/null |
  openssl x509 -noout -ext subjectAltName | grep -Fq 'DNS:shakescape'
openssl s_client -connect "${internal_ipv4}:8443" -servername shakescape </dev/null 2>/dev/null |
  openssl x509 -noout -ext subjectAltName | grep -Fq 'DNS:shakescape'

ksk_files=()
while IFS= read -r key_file; do
  ksk_files+=("${key_file}")
done < <(grep -l -E 'DNSKEY[[:space:]]+257[[:space:]]+3[[:space:]]+13' \
  "${zone_dir}"/Kshakescape.+013+*.key)
if [[ ${#ksk_files[@]} -ne 1 ]]; then
  echo "unable to identify exactly one shakescape KSK" >&2
  exit 1
fi
read -r _ _ _ key_tag algorithm digest_type ds_digest < <(
  dnssec-dsfromkey -2 "${ksk_files[0]}"
)

printf 'SHAKESCAPE_DS_KEY_TAG=%s\n' "${key_tag}"
printf 'SHAKESCAPE_DS_ALGORITHM=%s\n' "${algorithm}"
printf 'SHAKESCAPE_DS_DIGEST_TYPE=%s\n' "${digest_type}"
printf 'SHAKESCAPE_DS_DIGEST=%s\n' "${ds_digest,,}"
printf 'SHAKESCAPE_SPKI_SHA256=%s\n' "${spki_sha256}"
printf 'SHAKESCAPE_HNSDNS=%s\n' \
  "hnsdns=1;ns=ns1.shakescape.;transport=doh;doh=https://shakescape:8443/dns-query;tlsa=3,1,1,${spki_sha256}"
printf 'SHAKESCAPE_BACKUP_DIR=%s\n' "${backup_dir}"
