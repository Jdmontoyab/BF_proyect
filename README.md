# DATA WAREHOUSE

Herramienta que permite administrar todos los contactos de clientes de una compañia de marketing para sus campañas.

## Clonar y usar repositorio de Git

Para descargar el repositorio de GitHub, sigue el link del repositorio, click en el botón "Clonar" ("Clone"), dirigete a la terminal y escribe el comando "git clone seguido del link del repositorio clonado".

```bash
git clone
```

## Instalar Dependencias

Para instalar las dependencias, debes ejecutar en la terminal el comando:

```bash
npm install
```

## Conectarse a la base de datos

Debes iniciar sección en MySQL Workbench con tu usuario y contraseña. Estos parámetros de entrada se deben configurar en el archivo index.js que se encuentra en la ruta:

```bash
..\BF_proyect\js\database\index.js
```
Especificamente en la linea 5, dónde se configuran los parámetros de conexión a la base de datos y que por defecto tienen como usuario "root" y como contraseña "CONFIG_PASSWORD"

## Crear base de datos y sus tablas

Dirígete al archivo "datawarehouse.sql" que se encuentra en la ruta:

```bash
..\BF_proyect\js\database\file\datawarehouse.sql
```
Copia todo su contenido, pégalo en un nuevo SQL tab y ejecutalo.

## Iniciar la aplicación

Dirígete a la carpeta "js", abre la terminal y ejecuta el comando:

```bash
node index.js
```

