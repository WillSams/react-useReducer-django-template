resource "aws_ecr_repository" "this" {
  name                 = var.function_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_lambda_function" "this" {
  function_name = "${var.environment}-${var.function_name}"
  timeout       = var.function_timeout
  memory_size   = var.lambda_memory_size
  image_uri     = "${aws_ecr_repository.this.repository_url}:latest"
  package_type  = "Image"

  role = aws_iam_role.lambda_function_role.arn

  environment {
    variables = {
      ENVIRONMENT            = var.environment
      DJANGO_SETTINGS_MODULE = "app.settings"
      DJANGO_SECRET_KEY      = var.django_secret_key
      DEBUG                  = "False"
      ALLOWED_HOSTS          = var.allowed_hosts
      CORS_ALLOWED_ORIGINS   = join(",", var.allowed_origins)
      ABOUT_MESSAGE          = var.about_message
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
    aws_cloudwatch_log_group.lambda,
  ]
}
