<h1 align="center">🎬🎬🎬 Movie-App-Backend 🎬🎬🎬</h1>

<p align="center">
  <img src="https://res.cloudinary.com/dpvzlh1zv/image/upload/v1716750076/Movie%20App/x4xqfcvoznkaun0wazgq.png" alt="Movie App" width="400"/>
</p>

---

## Descripción
Este es un proyecto final del programa "Codo a Codo", realizado por el equipo de desarrollo Número 11. Se trata de una aplicación web elaborada desde el lado del servidor, la cual contiene una tematica de películas que permite a los usuarios explorar información sobre películas, como detalles de la trama, tráiler, y más.

---

## Características
- Exploración de información sobre películas.
- Detalles de la trama, director, presupuesto, ganancias del film.
- Interfaz de usuario intuitiva y fácil de usar.
  
---

## Capturas de Pantalla

<div style="display: inline-block; margin: 0 auto;">
  <img src="https://res.cloudinary.com/dpvzlh1zv/image/upload/v1716750076/Movie%20App/x4xqfcvoznkaun0wazgq.png" alt="Captura de pantalla" width="400"/>
  <img src="https://res.cloudinary.com/dpvzlh1zv/image/upload/v1716750085/Movie%20App/z1xnxcrii5m12s8lzkdr.png" alt="Captura de pantalla" width="400"/>
  <img src="https://res.cloudinary.com/dpvzlh1zv/image/upload/v1716750093/Movie%20App/j3hcv0jwo6cm60tr7fkk.png" width="400"/>
  <img src="https://res.cloudinary.com/dpvzlh1zv/image/upload/v1716750052/Movie%20App/unfnrfh4zt0se86dlfok.png" width="400"/>
  <img src="https://res.cloudinary.com/dpvzlh1zv/image/upload/v1716750083/Movie%20App/ikjlnlr5nukpc7apjszy.png" width="400"/>
  <img src="https://res.cloudinary.com/dpvzlh1zv/image/upload/v1716750076/Movie%20App/fsrfrekdaw1h0bcmixx3.png" width="400"/>
</div>

---

## Instalación

Para instalar y ejecutar esta aplicación localmente, sigue los siguientes pasos:

1. **Clona el repositorio:**
    ```sh
    git clone https://github.com/tuusuario/Movie-App.git
    cd Movie-App
    ```

2. **Configura el entorno:**
    - Crea un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias para PostgreSQL y JWT.
    - Asegúrate de tener Docker y Docker Compose instalados.

3. **Construye y levanta los contenedores:**
    ```sh
    docker-compose up --build
    ```
## Configuración

### application.properties

Configura las propiedades de la aplicación en `src/main/resources/application.properties`:

```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

security.jwt.secret=${JWT_SECRET}
security.jwt.issuer=${JWT_ISSUER}
security.jwt.ttlMillis=${JWT_TTL}
