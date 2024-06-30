FROM openjdk:17-jdk-slim
ARG JAR_FILE=Movie-App/Movie-App/target/Movie-App-0.0.1.jar
COPY ${JAR_FILE} app_movie.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app_movie.jar"]