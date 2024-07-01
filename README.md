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

## application.properties

Configura las propiedades de la aplicación en `src/main/resources/application.properties`:

```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.database=POSTGRESQL
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

security.jwt.secret=${JWT_SECRET}
security.jwt.issuer=${JWT_ISSUER}
security.jwt.ttlMillis=${JWT_TTL}
```

## Variables de entorno

Asegúrate de definir las siguientes variables de entorno en tu archivo .env o en tu entorno de despliegue:

```
DATABASE_URL=jdbc:postgresql://url_de_tu_base_de_datos:5432/nombre_de_tu_base_de_datos
DATABASE_USERNAME=username_de_tu_base_de_datos
DATABASE_PASSWORD=password_de_tu_base_de_datos
JWT_SECRET=tu_super_secret_key
JWT_ISSUER=tu_emisor_de_tokens
JWT_TTL=tu_tiempo_de_vida_del_token_en_milisegundos
```
---

## Uso

Para iniciar la aplicación, asegúrate de tener configurado el entorno y luego ejecuta:

```
docker-compose up

```
La aplicación estará disponible en `http://localhost:8080`.

---

## Tecnologías Utilizadas

<p align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML5" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" title="CSS3" alt="CSS3" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-plain.svg" title="Tailwind" alt="Tailwind" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sass/sass-original.svg" title="Sass" alt="Sass" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" title="Python" alt="Python" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="React" alt="React" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg" title="NodeJS" alt="NodeJS" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" title="Express" alt="Express" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" title="Postgres SQL" alt="Postgres SQL" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mysql/mysql-original-wordmark.svg" title="My SQL" alt="My SQL" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg" title="MongoDB" alt="MongoDB" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sequelize/sequelize-original.svg" title="Sequelize" alt="Sequelize" width="50" height="50"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/jest/jest-plain.svg" title="Jest" alt="Jest" width="50" height="50"/>&nbsp;
</p>
---

## Endpoints

Aquí hay una lista de los endpoints disponibles:

### Películas:

- GET /api/movies: Obtener todas las películas
- GET /api/movies/{id}: Obtener una película por ID
- POST /api/movies: Crear una nueva película
- PUT /api/movies/{id}: Actualizar una película existente
- DELETE /api/movies/{id}: Eliminar una película

### Directores:

- GET /api/directors: Obtener todos los directores
- GET /api/directors/{id}: Obtener un director por ID
- POST /api/directors: Crear un nuevo director
- PUT /api/directors/{id}: Actualizar un director existente
- DELETE /api/directors/{id}: Eliminar un director

### Autenticación:

- POST /api/auth/register: Registrar un nuevo usuario
- POST /api/auth/login: Iniciar sesión y obtener un token JWT

---

## Participantes

Fernando Rodriguez <br />
Hassan El Hadad <br />
Alexis Mendez <br />
Iván Di Monte <br />
Franco Fernandez

---

## Contacto
Para cualquier pregunta o comentario, puedes contactarnos en: <br />
<a href="mailto:ferchulobo2015@gmail.com" target="_blank" rel="noopener noreferrer">ferchulobo2015@gmail.com</a><br />
<a href="mailto:Hassandc0110@gmail.com" target="_blank" rel="noopener noreferrer">Hassandc0110@gmail.com</a><br />
<a href="mailto:aleemm19922@gmail.com" target="_blank" rel="noopener noreferrer">aleemm19922@gmail.com</a><br />
<a href="mailto:ivansdmonte@hotmail.com" target="_blank" rel="noopener noreferrer">ivansdmonte@hotmail.com</a><br />
<a href="mailto:franco21f@gmail.com" target="_blank" rel="noopener noreferrer">franco21f@gmail.com</a>

---

## Contribución
¡Contribuciones son bienvenidas! Si tienes alguna idea para mejorar esta aplicación, por favor abre un issue o envía un pull request.
