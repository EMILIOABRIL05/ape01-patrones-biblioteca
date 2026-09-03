# Sistema de Gestión de Biblioteca - Refactorización

## Descripción

Este proyecto consiste en una aplicación de consola diseñada para administrar una biblioteca. El sistema facilita tareas como listar, buscar, verificar la disponibilidad, prestar y devolver libros. El propósito central de este repositorio es exhibir la refactorización de una base de código que, si bien es funcional, presenta deficiencias en su calidad (conocido como "código sucio"), para transformarla en una solución más depurada, fácil de mantener y mejor estructurada, aplicando los principios de la programación limpia y las mejores prácticas en el desarrollo de software.

El desarrollo de este proyecto se realizó en el marco de la materia **Patrones de Software**, correspondiente a la Carrera de Software de la Universidad Técnica de Ambato.

---

## Integrantes

- Arcos Guzman Juan Carlos
- Abril Lara Emilio Alexander
- Cusme Vélez Manuel Steven
- Herrera Lescano Mateo Renato

---

## Requisitos

Para ejecutar este proyecto, necesitas tener instalado lo siguiente:

- **Node.js** (versión 14 o superior).
- **npm** (normalmente incluido con Node.js).
- **Git** (opcional, para clonar el repositorio).

---

## Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1. **Clonar el repositorio** (o descargar el código fuente):
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd biblioteca-refactorizada
   ```

2. **Ejecutar la aplicación:**  
   El punto de entrada de la aplicación es `app.js`. Para ejecutarlo, usa el siguiente comando en la terminal:
   ```bash
   node app.js
   ```
   Al ejecutarlo, se mostrarán en la consola los resultados de las pruebas de funcionamiento para cada una de las operaciones del sistema.

---

## Estructura del Proyecto

La estructura del proyecto ha sido organizada siguiendo principios de modularidad y separación de responsabilidades para mejorar la mantenibilidad.

```text
biblioteca/
├── models/
│   └── Libro.js                # Define la estructura de datos de un libro
├── repositories/
│   └── LibroRepository.js      # Gestiona el almacenamiento y acceso a los datos
├── services/
│   └── BibliotecaService.js    # Contiene la lógica de negocio principal
├── utils/
│   └── validaciones.js         # Funciones de validación reutilizables
├── app.js                      # Punto de entrada de la aplicación
├── package.json                # Metadatos del proyecto (si se usa npm)
└── README.md                   # Este archivo
```

### Responsabilidades de cada capa:

- **`models/Libro.js`**: Funciona como un modelo para los datos. Establece la estructura que debe seguir un objeto libro (con `id`, `título`, `autor`, `estado`, `usuario`). No incluye ninguna lógica de negocio.

- **`repositories/LibroRepository.js`**: Representa la capa de acceso a los datos. Es el único módulo que interactúa directamente con el origen de los datos (en este caso, un array almacenado en memoria). Concentra operaciones como la búsqueda de un libro por su ID o la listado de todos los libros.

- **`services/BibliotecaService.js`**: Constituye el núcleo de la lógica de negocio. Coordina las operaciones de la biblioteca, tales como prestar, devolver y buscar, interactuando con el repositorio para obtener la información y aplicando las reglas del sistema.

- **`utils/validaciones.js`**: Contiene funciones de validación generales y que se pueden reutilizar, como la comprobación de un nombre de usuario, manteniendo esta lógica separada de los servicios.

- **`app.js`**: Actúa como el controlador o el punto de partida. Su única función es iniciar el servicio y ejecutar las pruebas para mostrar cómo funciona el sistema.


---

## Funcionalidades

El sistema permite realizar las siguientes operaciones sobre el catálogo de libros:

1. **`listar()`**: Muestra en consola el listado completo de todos los libros con su ID, título, autor y estado de disponibilidad.

2. **`buscar(criterioBusqueda)`**: Busca libros cuyo título o autor contengan el texto proporcionado (sin distinción de mayúsculas/minúsculas) y muestra los resultados.

3. **`disponibilidad(id)`**: Consulta el estado de un libro específico por su ID e informa si está disponible o, en caso contrario, a qué usuario fue prestado.

4. **`prestar(id, nombreUsuario)`**: Registra el préstamo de un libro. Valida que el libro exista, esté disponible y que el nombre del usuario sea válido. Si todo es correcto, cambia el estado del libro a "Prestado" y asigna el nombre del usuario.

5. **`devolver(id)`**: Procesa la devolución de un libro. Valida que el libro exista y esté en estado "Prestado". Si es así, cambia su estado a "Disponible" y elimina el nombre del usuario asociado.

---

## Principios Aplicados

Durante el proceso de refactorización, se aplicaron los siguientes principios y buenas prácticas:

- **Clean Code**: Se ha mejorado la legibilidad del código implementando nombres de variables y funciones más descriptivos, utilizando sintaxis moderna de JavaScript y suprimiendo comentarios que no aportaban valor.

- **KISS (Keep It Simple, Stupid)**: Se han simplificado las estructuras lógicas complejas y anidadas, sustituyéndolas por cláusulas de guarda que permiten que el flujo del código sea más lineal y comprensible.

- **DRY (Don't Repeat Yourself)**: Se ha eliminado la duplicación de código, particularmente en los bucles destinados a buscar libros, centralizando esta lógica en una función que puede ser reutilizada desde el repositorio.

- **YAGNI (You Ain't Gonna Need It)**: Se han suprimido variables y lógica auxiliar que no eran necesarias, como indicadores de control, dado que no aportaban valor a los requisitos vigentes.

- **SRP (Single Responsibility Principle)**: Como primer paso hacia SOLID, se ha garantizado que cada módulo, clase y función asuma una única responsabilidad bien definida. Por ejemplo, la función de préstamo se ha dividido en funciones más pequeñas para tareas de validación y registro.

- **Modularidad**: El sistema se ha estructurado en módulos o capas independientes (modelos, repositorios, servicios, utilidades), lo que disminuye el acoplamiento y facilita tanto el mantenimiento como las pruebas.

---

## Pruebas Realizadas

Para asegurar que la refactorización no alteró el comportamiento funcional del sistema, se ejecutaron los siguientes casos de prueba. Los resultados fueron los esperados en todos los casos:

| N.º | Caso de prueba | Entrada utilizada | Resultado esperado | Resultado obtenido |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Buscar un libro existente | `biblioteca.buscar("Clean")` | Mostrar información del libro, ID, autor y estado de disponibilidad. | `1 - Clean Code - Robert C. Martin Disponible` |
| **2** | Buscar un libro inexistente | `biblioteca.buscar("Harry Potter")` | Informar que no existe ningún registro coincidente. | `No se encontraron libros` |
| **3** | Prestar un libro disponible | `biblioteca.prestar(1, "Carlos")` | Cambiar estado a "Prestado" y asignar el usuario "Carlos". | `El libro Clean Code fue prestado correctamente a Carlos` |
| **4** | Prestar un libro ya prestado | `biblioteca.prestar(3, "Mateo")` | Rechazar la operación indicando que el libro no está disponible. | `No se puede prestar el libro porque ya está prestado` |
| **5** | Devolver un libro prestado | `biblioteca.devolver(1)` | Cambiar estado a "Disponible", limpiar usuario e informar la devolución. | `Devolución realizada. Libro: Clean Code. Usuario anterior: Carlos` |
| **6** | Devolver un libro disponible | `biblioteca.devolver(2)` | Rechazar la operación informando que el libro ya está disponible. | `El libro no puede devolverse porque ya está disponible` |

---

## Conclusiones Técnicas

- Refactorizar el código aplicando principios como **Clean Code, KISS y DRY** ha probado ser una buena manera de mejorar la calidad interna del software. El código que queda es más fácil de leer, más simple y tiene menos probabilidades de contener errores, lo cual ayuda a entenderlo y a mantenerlo.

- La **separación de responsabilidades** y la aplicación del **principio SRP** han sido clave para desacoplar el sistema. Ahora, la lógica de negocio, el acceso a los datos y las validaciones están en capas separadas, lo que permite modificar una sin que afecte a las otras.

- Usar un sistema de control de versiones como **Git**, con *commits* pequeños y mensajes claros, ha hecho posible documentar cómo ha ido evolucionando el código y facilita tanto el trabajo en equipo como saber qué ha cambiado.

- Hacer **pruebas de funcionamiento** (ya sean manuales o automáticas) es esencial para asegurarnos de que al refactorizar no se rompa nada que antes funcionaba y que el comportamiento del sistema siga siendo el mismo.

- Invertir en mejorar la estructura y la claridad del código desde el principio es una práctica que baja considerablemente la **deuda técnica** y los gastos de mantenimiento a futuro.
