terraform {
  required_version = ">= 1.6"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.11"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.11"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.2"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

provider "github" {
  owner = var.github_owner
}
