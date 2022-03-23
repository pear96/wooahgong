# 이미지 태그 설정
FROM openjdk:11 as build-stage
# /homepage로 이동. 근데 왜 디렉토리 안만들어짐?
WORKDIR /homepage
RUN pwd
RUN chmod +x ./gradlew
RUN ./gradlew build
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
# /homepage에 /var/jenkins_home/workspace/wooahgong/backend에 있는 파일을 컨테이너에 복사
# COPY . .
ENTRYPOINT ["java","-jar","/app.jar"]
# CMD java -jar backend-1.0-SNAPSHOT.jar
EXPOSE 8080

# CMD ["nginx", "-g", "daemon off;"]
