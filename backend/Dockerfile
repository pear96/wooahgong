# 이미지 태그 설정
FROM openjdk:11 as build-stage
# /homepage로 이동. 근데 왜 디렉토리 안만들어짐?
WORKDIR /homepage
RUN pwd
# /homepage에 /var/jenkins_home/workspace/wooahgong/backend에 있는 파일을 컨테이너에 복사
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew build
RUN pwd
RUN ls
# COPY ./build/libs/backend-1.0-SNAPSHOT.jar backend-1.0-SNAPSHOT.jar
CMD java -jar backend-1.0-SNAPSHOT.jar
# FROM nginx:stable-alpine as production-stage
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
# COPY --from=build-stage ./homepage/build /usr/share/nginx/html/homepage
EXPOSE 8080

# CMD ["nginx", "-g", "daemon off;"]
