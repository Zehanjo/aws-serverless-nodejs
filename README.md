# AWS Serverless API

Este proyecto implementa una API serverless utilizando AWS Lambda, DynamoDB, y el framework Serverless. La API consume datos de la [API de Star Wars](https://swapi.py4e.com/documentation) y los almacena en DynamoDB. La arquitectura sigue la metodología de Hexagonal Architecture para asegurar la separación de responsabilidades y facilidad de mantenimiento.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Despliegue](#despliegue)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuir](#contribuir)

## Descripción

Esta API serverless está diseñada para interactuar con los datos de la API de Star Wars y almacenarlos en DynamoDB. Se ha implementado utilizando el framework Serverless y sigue una arquitectura hexagonal para una clara separación de responsabilidades.

## Instalación

Primero, clona este repositorio e instala las dependencias necesarias utilizando npm:

```bash
npm install
```

## Uso

### Ejecución Local

Para ejecutar la API localmente, utiliza el siguiente comando:

```bash
serverless offline
```

Esto iniciará un servidor local en `http://localhost:3000`.

### Despliegue en AWS

Para desplegar la API en AWS, utiliza el siguiente comando:

```bash
serverless deploy
```

Esto desplegará la API en AWS y estará disponible en la URL generada por el servicio.

## Endpoints

Los siguientes endpoints están disponibles para interactuar con la API en tu entorno local:

#### Film

- **POST**: Añadir un nuevo film.
  - URL: `http://localhost:3000/api/film/add`
- **GET**: Obtener todos los films.
  - URL: `http://localhost:3000/api/film/`

#### People

- **POST**: Añadir una nueva persona.
  - URL: `http://localhost:3000/api/people/add`
- **GET**: Obtener todas las personas.
  - URL: `http://localhost:3000/api/people/`

#### Planet

- **POST**: Añadir un nuevo planeta.
  - URL: `http://localhost:3000/api/planet/add`
- **GET**: Obtener todos los planetas.
  - URL: `http://localhost:3000/api/planet/`

## Despliegue

Para desplegar la API en AWS, utiliza el siguiente comando:

```bash
serverless deploy
```

Esto empaquetará la aplicación y la desplegará en AWS, donde estará disponible públicamente.

## Estructura del Proyecto

El proyecto sigue la metodología de arquitectura hexagonal, organizado en módulos para cada entidad consumida desde la API de Star Wars. A continuación se describe la estructura del proyecto:

```bash
src/
│
├── module/
│   ├── film/
│   │   ├── application/
│   │   │   └── Film.service.js
│   │   ├── domain/
│   │   │   ├── interface/
│   │   │   │   └── Film.interface.js
│   │   │   └── model/
│   │   │       └── Film.js
│   │   └── infraestructure/
│   │       ├── Film.repository.js
│   │       └── controller/
│   │           └── Film.js
│   │
│   ├── people/
│   │   ├── application/
│   │   │   └── People.service.js
│   │   ├── domain/
│   │   │   ├── interface/
│   │   │   │   └── People.interface.js
│   │   │   └── model/
│   │   │       └── People.js
│   │   └── infraestructure/
│   │       ├── People.repository.js
│   │       └── controller/
│   │           └── People.js
│   │
│   └── planet/
│       ├── application/
│       │   └── Planet.service.js
│       ├── domain/
│       │   ├── interface/
│       │   │   └── Planet.interface.js
│       │   └── model/
│       │       └── Planet.js
│       └── infraestructure/
│           ├── Planet.repository.js
│           └── controller/
│               └── Planet.js
│
├── handler.js
└── routes/
    └── routes.js
```

## Contribuir

Las contribuciones son bienvenidas. Para contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.

Autor: Johan Mamani
