# ATOM FE CHALLENGE TEMPLATE - ANGULAR
Este proyecto es una plantilla con lo necesario para comenzar a desarrollar el front-end de la aplicación de la prueba técnica de Atom. Se base en Angular con la versión 17.3.6.
Se ha realizado la instalación y configuración de varias dependencias necesarias para el desarrollo de la aplicación, como por ejemplo: Angular Material.

## Instrucciones

Siéntete libre de clonar este repositorio y utilizarlo como base para el desarrollo de la aplicación. Sigue las indicates de la prueba técnica para completar la aplicación y desarrolla como más te sientas cómodo.

De igual manera puedes documentar dentro de este archivo todo lo que deseas contar sobre tu desarrollo, como por ejemplo, decisiones de diseño, problemas encontrados, etc.

## Comentarios sobre el desarrollo

# **Frontend para Gestión de Tareas**

## **Descripción del Proyecto**

Este proyecto es una aplicación web para la gestión de tareas. Los usuarios pueden registrarse, iniciar sesión con correo electrónico o autenticarse a través de Google. Cada usuario puede crear, editar, completar o eliminar sus propias tareas. La aplicación está implementada con **Angular v17** en el frontend y conectada a una API construida con **Node.js/Express** hospedada en Firebase Cloud Functions, utilizando Firestore como base de datos.

---

## **Tecnologías Utilizadas**

### **Frontend**

1. **Angular 17 (Standalone Components)**:

   - **¿Por qué?:** Angular es un framework robusto y ampliamente utilizado que facilita la creación de aplicaciones escalables. Se usaron **Standalone Components** para simplificar la estructura y eliminar la dependencia de módulos tradicionales.
   - **Características principales utilizadas:**
     - Angular Material: Para un diseño atractivo y responsivo.
     - NgRx Forms: Para manejar formularios y validaciones.
     - HttpClient: Para consumir la API del backend.

2. **Angular Material**:

   - **¿Por qué?:** Proporciona componentes predefinidos y estilos consistentes, permitiendo crear una interfaz moderna y amigable para el usuario.

3. **Firebase Authentication**:
   - **¿Por qué?:** Para gestionar el registro y autenticación de usuarios, ofreciendo soporte para correo/contraseña, Google.

### **Backend**

1. **Node.js y Express**:

   - **¿Por qué?:** Es rápido, ligero y permite construir APIs RESTful de manera eficiente.
   - **Características principales utilizadas:**
     - Firebase Admin SDK para interacción con Firestore y Firebase Authentication.

2. **Firebase Cloud Functions**:

   - **¿Por qué?:** Simplifica el despliegue de funciones backend serverless y escala automáticamente según la demanda.
   - **Endpoints implementados:**
     - **GET /todolist**: Obtener tareas de un usuario.
     - **POST /todolist**: Crear una nueva tarea.
     - **PUT /todolist/:taskId**: Actualizar una tarea.
     - **DELETE /todolist/:taskId**: Eliminar una tarea.
     - **POST /login**: Iniciar sesión con correo/contraseña.
     - **POST /social-login**: Iniciar sesión con Google.

3. **Firestore (NoSQL)**:
   - **¿Por qué?:** Ofrece una base de datos en tiempo real con escalabilidad automática, ideal para aplicaciones modernas.
   - **Uso en el proyecto:**
     - Almacenar las tareas de cada usuario.
     - Asociar tareas a usuarios mediante `userId`.

---

## **Cómo Funciona**

Ingresa al siguiente enlace `https://challenge-atom-447118.web.app`, crea su usuario si no tiene, solo pide correo electrónico o autenticarse con Google.
Una vez en la aplicación, le sale el listado de sus tareas, puede crear mas, eliminar, editar o marcar como completadas.

## **Estructura del Proyecto**

### **Frontend**

src/ ├── app/ │ ├── components/ │ │ ├── login/ │ │ ├── home/ │ │ ├── shared/ # Componentes reutilizables como Header y Footer │ ├── services/ # Servicios como AuthService y TaskService │ ├── models/ # Modelos como Task │ └── environments/ # Configuración de entorno para desarrollo y producción

### **Backend (Cloud Functions)**

functions/ ├── index.js # Configuración principal de Firebase Functions ├── routes/ # Rutas como /todolist y /login └── services/ # Interacción con Firestore y Firebase Auth

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
