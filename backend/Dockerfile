# 이미지 태그 설정
FROM openjdk:11 as build-stage
WORKDIR /homepage
RUN pwd
# /homepage에 /var/jenkins_home/workspace/wooahgong/backend에 있는 파일을 컨테이너에 복사
COPY . .
RUN ls
RUN cp /homepage/properties/*.properties /homepage/src/main/resources/
RUN cp /homepage/properties/keystore.p12 /homepage/src/main/resources/
RUN chmod +x ./gradlew
RUN ./gradlew build
RUN cp /homepage/build/libs/*.jar /homepage/
EXPOSE 8080
CMD java -jar backend-1.0-SNAPSHOT.jar
