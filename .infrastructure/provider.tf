terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.48"
    }
  }

  # Uncomment and configure for shared/remote state (recommended for team use and CI/CD)
  # backend "s3" {
  #   bucket         = "my-terraform-state-bucket"
  #   key            = "django-template/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "terraform-state-lock"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.region
}
