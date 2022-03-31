FROM python:3.9.7-alpine
RUN apk update && apk add gcc libc-dev make git libffi-dev openssl-dev python3-dev libxml2-dev libxslt-dev
WORKDIR /homepage
COPY ./requirements.txt /homepage/
RUN pip install --no-cache-dir --upgrade -r /homepage/requirements.txt
COPY . .
COPY ./secret/secret.json /homepage/
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]