FROM python:3.9.7
# 프론트의 package.json을 먼저 복사한 것 처럼, 여기서도 레이어 마다 캐싱을 위해 requirements 먼저 복사
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
