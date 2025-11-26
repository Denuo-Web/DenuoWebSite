#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const useEmulators = process.env.VITE_USE_FIREBASE_EMULATORS === 'true'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const webDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(webDir, '..')

const children = []

const onExit = (code = 0) => {
  children.forEach((child) => {
    if (child && !child.killed) child.kill('SIGINT')
  })
  process.exit(code)
}

process.on('SIGINT', () => onExit(0))
process.on('SIGTERM', () => onExit(0))

const spawnProc = (cmd, args, opts) => {
  const child = spawn(cmd, args, { stdio: 'inherit', shell: false, ...opts })
  children.push(child)
  child.on('error', (err) => {
    console.error(`${cmd} failed:`, err)
    onExit(1)
  })
  return child
}

if (useEmulators) {
  console.log('Starting Firebase emulators (firestore, auth) and Vite dev server...')
  const emulators = spawnProc('firebase', ['emulators:start', '--only', 'firestore,auth'], {
    cwd: repoRoot,
  })
  const vite = spawnProc('npm', ['run', 'dev:vite'], {
    cwd: webDir,
    env: { ...process.env, VITE_USE_FIREBASE_EMULATORS: 'true' },
  })

  emulators.on('exit', (code) => {
    if (!vite.killed) vite.kill('SIGINT')
    onExit(code ?? 0)
  })

  vite.on('exit', (code) => {
    if (!emulators.killed) emulators.kill('SIGINT')
    onExit(code ?? 0)
  })
} else {
  console.log('VITE_USE_FIREBASE_EMULATORS is not true. Starting Vite only...')
  const vite = spawnProc('npm', ['run', 'dev:vite'], {
    cwd: webDir,
    env: { ...process.env, VITE_USE_FIREBASE_EMULATORS: 'false' },
  })
  vite.on('exit', (code) => onExit(code ?? 0))
}
