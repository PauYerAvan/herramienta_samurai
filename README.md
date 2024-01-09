# Prueba Técnica Adsmurai

El objetivo es desarrollar una herramienta que lea las conversiones offline de un archivo CSV alojado en una url, las formatee para cumplir los requisitos de Facebook y las suba a su píxel de Facebook. Por lo tanto, se espera de esta prueba una herramienta que:

1. Lea el archivo desde una URL.

2. Formatee los datos y aplique hash a los campos obligatorios del archivo.

3. Lo suba a Facebook, obteniendo una respuesta 200.


## Estructura del proyecto

La estructura del proyecto consiste en los siguientes archivos:

- main.js:

    Archivo principal donde se aloja el código necesario para realizar la llamada que lee el archivo y la segunda llamada que envía los eventos a Facebook.

- hashFunctions.js: 

    Archivo secundario donde se desarrollan las funciones adicionales necesarias para el formateo y la aplicación de hash en cada parámetro.

## Configuración

1. Clona este repositorio:

    ```git clone https://github.com/PauYerAvan/herramienta_samurai.git```

2. Instala las dependencias:

    ```cd herramienta_samurai```

    ```npm install```

## Requisitos Previos

Para poder ejecutar la herramienta se ha de tener instalado [Node.js](https://nodejs.org/).

Para su realización se han usado las siguientes dependencias: 

    "axios": "^1.6.3",
    "crypto-js": "^4.2.0",
    "debug": "~2.6.9",
    "dotenv": "^16.3.1",
    "express": "^4.18.2" 


## Uso

Para poder ejecutar el proyecto en node.js se ha de ingresar el siguiente comando:

```npm start```









