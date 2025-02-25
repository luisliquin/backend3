# 📌 Proyecto Adoptame

Este proyecto está diseñado para facilitar la adopción de mascotas a través de una API bien documentada, testeada y optimizada para su despliegue con Docker.

# DockerHub
https://hub.docker.com/repository/docker/melqui22/proyectofinal/general

---

## 🎯 Objetivos Generales

- Implementar las últimas mejoras en nuestro proyecto y Dockerizarlo.

## 🔹 Objetivos Específicos

- Documentar las rutas restantes de nuestro proyecto.
- Añadir los últimos tests.
- Crear una imagen de Docker.

---

## 📌 Se debe entregar

### 1️⃣ **Documentación con Swagger**
- Se ha documentado el módulo de "Users" utilizando Swagger UI.
- Puedes acceder a la documentación en:  
  **`http://localhost:3001/apidocs`** (cuando el servidor está en ejecución).

### 2️⃣ **Tests funcionales**
- Se han desarrollado **tests funcionales** para todos los endpoints del router `adoption.router.js`.
- Todos los endpoints están **cubiertos por pruebas**, incluyendo casos de éxito y error.
- Los tests garantizan el correcto funcionamiento de cada ruta.

### 3️⃣ **Dockerización del Proyecto**
- Se ha creado un `Dockerfile` optimizado para generar una imagen del proyecto de manera **reproducible**.
- El `Dockerfile` incluye todos los pasos necesarios para:
  - **Instalar las dependencias**.
  - **Copiar los archivos del proyecto**.
  - **Configurar el entorno de ejecución**.
- La imagen generada ha sido **subida a DockerHub** y está disponible en:  
  **[🔗 Enlace a DockerHub](TU_ENLACE_AQUI)**.
- Se ha añadido este `README.md` con las instrucciones y el enlace a la imagen.

### 4️⃣ **Módulo de Mocking**
- Se ha desarrollado un **módulo de Mocking** para la generación de usuarios.
- Permite generar usuarios con los siguientes atributos:
  - Contraseñas **encriptadas**.
  - Roles **variados**.
  - Arrays de **pets vacíos**.
- Los usuarios generados cumplen con el **formato esperado en MongoDB**.

---

## 🛠️ **Formato de Entrega**
- Link al repositorio de **GitHub** con el proyecto (**sin** incluir `node_modules`).
- Archivo `.env` necesario para poder correr el proyecto.

## 🔹 **Sugerencias**
- Para repasar Docker, se recomienda revisar la clase 5: **Clusters & Escalabilidad**.

---

## 🚀 **Cómo ejecutar el proyecto con Docker**
### 1️⃣ Construcción de la imagen
Ejecutar el siguiente comando en la raíz del proyecto:
```bash
docker build -t adoptame-api .
```

2️⃣ Ejecutar el contenedor
bash
Copiar
Editar
docker run -p 3001:3001 adoptame-api
Esto ejecutará el servidor y se podrá acceder a la API en:
http://localhost:3001

3️⃣ Acceder a la documentación
Una vez que el contenedor esté corriendo, abre en el navegador:
http://localhost:3001/apidocs

✅ Contacto
Si tienes dudas o sugerencias, puedes abrir un issue en el repositorio o contribuir con un pull request.

🦴🐶 ¡Gracias por contribuir a mejorar la adopción de mascotas! 🐾