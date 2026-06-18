FROM public.ecr.aws/lambda/python:3.12 AS builder
WORKDIR /buildroot
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt --target /buildroot/deps

FROM public.ecr.aws/lambda/python:3.12
COPY --from=builder /buildroot/deps ${LAMBDA_TASK_ROOT}
COPY app/ ${LAMBDA_TASK_ROOT}/app/
COPY handler.py ${LAMBDA_TASK_ROOT}/

CMD ["handler.handler"]
