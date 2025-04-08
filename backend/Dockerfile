FROM openjdk:11-jdk as build-stage
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew clean build -x test

FROM openjdk:11-jre
WORKDIR /app

COPY --from=build-stage /app/build/libs/backend-1.0-SNAPSHOT.jar app.jar

EXPOSE 8080 9010

CMD ["java", "-Dcom.sun.management.jmxremote", \
           "-Dcom.sun.management.jmxremote.port=9010", \
           "-Dcom.sun.management.jmxremote.rmi.port=9010", \
           "-Dcom.sun.management.jmxremote.authenticate=false", \
           "-Dcom.sun.management.jmxremote.ssl=false", \
           "-Djava.rmi.server.hostname=35.216.86.46", \
           "-jar", "app.jar"]