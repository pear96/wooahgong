FROM python:3.9
WORKDIR /homepage
COPY ./requirements.txt /hompage/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app /hompage/app
COPY ./secret/secret.json /hompage/
CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]