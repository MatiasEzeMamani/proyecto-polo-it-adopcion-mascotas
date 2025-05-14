# 🚀 Guía de instalación del proyecto

Este repositorio contiene un proyecto que utiliza Spring Boot para el backend y React para el frontend. A continuación se detallan los pasos necesarios para configurar el entorno y comenzar a trabajar con el proyecto.

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu computadora:

- ☕ [JDK 21](https://www.oracle.com/java/technologies/downloads/#java21) (para ejecutar el backend en Spring Boot)
- 🛠️ [Spring Tool Suite](https://spring.io/tools) (para trabajar con el proyecto Spring Boot)
- 🟢 [Node.js y npm](https://nodejs.org/) (para instalar dependencias y ejecutar el frontend en React)

## 🔧 Paso 1: Instalar JDK (Java Development Kit)

1. Dirígete a la página oficial de Oracle y descarga la versión más reciente de JDK 21:
   - Descargar directamente desde este [enlace](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.exe) (SHA256).
   
2. Instala el JDK siguiendo las instrucciones del instalador.

3. Configura el entorno de desarrollo:
   - Agrega el JDK al `PATH` de tu sistema:
     - **Windows**: Ve a **Configuración avanzada del sistema** -> **Variables de entorno** -> **Variables del sistema** -> **Path** -> **Editar** y agrega la siguiente ruta:
       ```
       C:\Program Files\Java\jdk-21\bin
       ```
   - Configura la variable de entorno `JAVA_HOME`:
     - **Windows**: En las **Variables del sistema**, crea una nueva variable llamada `JAVA_HOME` y asígnale el siguiente valor:
       ```
       C:\Program Files\Java\jdk-21
       ```

  📺 Para una guía más detallada, puedes seguir este [video tutorial](https://www.youtube.com/watch?v=InNwveLOULg).

## 💻 Paso 2: Instalar Spring Tool Suite (STS)

1. Dirígete a la página oficial de Spring Tool Suite y descarga el instalador:
   - [Descargar Spring Tool Suite](https://spring.io/tools)
   
2. Descomprime el archivo descargado en una carpeta de tu elección.

## 🌱 Paso 3: Clonar el Repositorio

1. Abre una terminal o línea de comandos en tu computadora.

2. Navega a la carpeta donde deseas clonar el repositorio.

3. Ejecuta el siguiente comando para clonar el repositorio:
   ```bash
   git clone <https://github.com/MatiasEzeMamani/proyecto-polo-it-adopcion-mascotas.git>

4. Una vez clonado, tu estructura de carpetas debería tener al menos dos subcarpetas principales (por ejemplo: backend/ y frontend/).
   
## 📦 Paso 4: Importar el Proyecto Backend en STS

1. Si ya tienes el código del backend en tu máquina (desde el repositorio clonado), impórtalo en STS:
   - En STS, ve a **File** -> **Import** -> **Existing Maven Projects**.
   - Haz clic en Browse y selecciona la carpeta backend dentro del proyecto que acabás de clonar (no selecciones la carpeta raíz, sino directamente la que contiene el pom.xml).
   - Haz clic en **Finish** y espera a que Maven descargue las dependencias necesarias.
   - Una vez importado, ejecutá el proyecto desde STS como una aplicación Spring Boot:
   - Clic derecho sobre el proyecto -> **Run As** -> **Spring Boot App**

## 🌐 Paso 5: Instalar dependencias y ejecutar el frontend (React)

- Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu computadora. Podés verificarlo ejecutando en la terminal:

  ```
  node -v
  npm -v
  ```

- Abre la carpeta `frontend` del proyecto con Visual Studio Code u otro editor de tu preferencia.

- Abre una terminal en esa carpeta (podés hacerlo desde el menú Terminal de VS Code o con clic derecho → "Abrir en terminal").

- Instala todas las dependencias necesarias ejecutando:

  ```
  npm install
  ```

- Si es necesario, también podés instalar estas dependencias específicas (por si no están incluidas en `package.json`):

  ```
  npm install axios react-router-dom
  ```

- Inicia la aplicación React con el siguiente comando:

  ```
  npm run dev
  ```

- Una vez iniciado, abrí tu navegador y accedé a:

  [http://localhost:5173](http://localhost:5173)

> ⚠️ Asegúrate de que el backend también esté corriendo para que el frontend pueda comunicarse correctamente con la API.

## ✅ Paso 6: Verificar la instalación

### 🖥️ Frontend:

1. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.
2. Asegúrate de que la aplicación React funcione correctamente y se comunique con el backend.

### 🔌 Backend:

El backend no tiene una interfaz gráfica directa. Puedes probarlo de las siguientes maneras:

- Usando **Postman** para hacer solicitudes a los endpoints del backend.
- Verificando que el frontend se esté comunicando correctamente con el backend.

Ejemplo:
- Accede a [http://localhost:4040/api/usuarios/register](http://localhost:8080/api/usuarios/register) desde Postman o el navegador (dependiendo del endpoint disponible en el backend).

## 📌 Notas finales

- Asegúrate de que tanto el backend como el frontend estén corriendo al mismo tiempo.
