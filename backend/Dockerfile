# 이미지 태그 설정
FROM openjdk:11 as build-stage
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew build
RUN cp /homepage/build/libs/*.jar /homepage/
EXPOSE 8080
CMD java -jar backend-1.0-SNAPSHOT.jar
