FROM python:3.9.7-alpine
WORKDIR /homepage
COPY ./requirements.txt /hompage/
RUN pip install --no-cache-dir --upgrade -r /hompage/requirements.txt
COPY . .
COPY ./secret/secret.json /hompage/
CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]