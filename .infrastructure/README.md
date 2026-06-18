# Deploying Infrastructure with Terraform

This directory contains the Terraform configuration files to deploy the infrastructure for this template to AWS.

## Prerequisites

- Install Terraform [link](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- Install AWS CLI [link](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
- Configure AWS CLI [link](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

## Infrastructure

Each environment provisions the following AWS resources:

- **ECR Repository** — stores the backend Docker image
- **Lambda Function** — runs the Django-Ninja ASGI app via Mangum
- **API Gateway v2 (HTTP)** — routes HTTP traffic to Lambda, handles CORS
- **S3 Bucket** — hosts the built React frontend (private, versioned)
- **CloudFront Distribution** — CDN in front of S3 with SPA fallback (404 → index.html)
- **IAM Roles and Policies** — least-privilege execution role for Lambda
- **CloudWatch Log Group** — structured Lambda logs with configurable retention

## Deploying Environments

Currently, the Terraform code is set up to deploy the **demo**, **staging**, and **production** environments.  To deploy an environment, run the following commands:

```bash
cd .infrastructure
terraform init  # Initialize the Terraform configuration
terraform plan -var-file "environments/demo.tfvars" -var "django_secret_key=<secret>"
terraform apply -var-file "environments/demo.tfvars" -var "django_secret_key=<secret>"
```

`django_secret_key` is a sensitive variable and is never stored in `.tfvars` files. Pass it via `-var` or the `TF_VAR_django_secret_key` environment variable.

Terraform allows for reproducible infrastructure deployments by using the same configuration files to deploy the same infrastructure in different environments.  The `terraform apply` command will prompt you to confirm the deployment before proceeding, so any changes can be reviewed before applying.

Note: Additional environments can be added by creating a new `.tfvars` file in the `.infrastructure/environments` directory.

If you make changes to the Terraform configuration, run `terraform validate` to check for syntax errors.  Before applying the changes, you can run `terraform plan` to preview what will change.

## Cost Estimates

AWS Lambda, API Gateway, and CloudWatch Logs costs are based on usage. At low to moderate traffic, these services typically fall within the AWS free tier. CloudFront and S3 also have generous free tiers. Use the [AWS Pricing Calculator](https://calculator.aws) to estimate costs for your expected workload.
