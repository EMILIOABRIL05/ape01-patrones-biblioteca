// biblioteca.js

const libros = [
    {
        id: 1,
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        estado: "D",
        usuario: ""
    },
    {
        id: 2,
        titulo: "Design Patterns",
        autor: "Erich Gamma",
        estado: "D",
        usuario: ""
    },
    {
        id: 3,
        titulo: "Refactoring",
        autor: "Martin Fowler",
        estado: "P",
        usuario: "Juan"
    }
];

// Función auxiliar reutilizable (DRY)
function buscarLibroPorId(id) {
    return libros.find(libro => libro.id === id);
}

// BUSCAR LIBRO (Refactorizado con Clean Code)
function buscar(criterioBusqueda) {
    let encontrado = false;
    const termino = criterioBusqueda.toLowerCase();

    for (let i = 0; i < libros.length; i++) {
        const titulo = libros[i].titulo.toLowerCase();
        const autor = libros[i].autor.toLowerCase();

        if (titulo.includes(termino) || autor.includes(termino)) {
            console.log(`${libros[i].id} - ${libros[i].titulo} - ${libros[i].autor}`);
            
            if (libros[i].estado === "D") {
                console.log("Disponible");
            } else {
                console.log("Prestado");
            }
            encontrado = true;
        }
    }

    if (!encontrado) {
        console.log("No se encontraron libros");
    }
}

// VER DISPONIBILIDAD (Refactorizado con Clean Code)
function disponibilidad(id) {
    const libroEncontrado = buscarLibroPorId(id);

    if (libroEncontrado === undefined) {
        console.log("Libro no encontrado");
    } else {
        if (libroEncontrado.estado === "D") {
            console.log(`El libro ${libroEncontrado.titulo} está disponible`);
        } else {
            console.log(`El libro ${libroEncontrado.titulo} está prestado a ${libroEncontrado.usuario}`);
        }
    }
}

// RENTAR / PRESTAR LIBRO (Refactorizado con Clean Code)
function rentar(id, nombreUsuario) {
    const libro = buscarLibroPorId(id);

    if (libro === undefined) {
        console.log("Libro no encontrado");
    } else {
        if (nombreUsuario === null || nombreUsuario === "") {
            console.log("Debe ingresar el nombre del usuario");
        } else {
            if (libro.estado === "D") {
                libro.estado = "P";
                libro.usuario = nombreUsuario;
                console.log(`El libro ${libro.titulo} fue prestado correctamente a ${nombreUsuario}`);
            } else {
                console.log("No se puede prestar el libro porque ya está prestado");
            }
        }
    }
}

// DEVOLVER LIBRO (Refactorizado con Clean Code)
function devolver(id) {
    const libro = buscarLibroPorId(id);

    if (libro === undefined) {
        console.log("Libro no encontrado");
    } else {
        if (libro.estado === "P") {
            console.log(`Devolución realizada. Libro: ${libro.titulo}. Usuario anterior: ${libro.usuario}`);
            libro.estado = "D";
            libro.usuario = "";
        } else {
            console.log("El libro no puede devolverse porque ya está disponible");
        }
    }
}

// LISTAR TODOS LOS LIBROS (Refactorizado con Clean Code)
function listar() {
    console.log("---------- BIBLIOTECA ----------");
    for (let i = 0; i < libros.length; i++) {
        console.log(`${libros[i].id} | ${libros[i].titulo} | ${libros[i].autor} | ${libros[i].estado}`);
    }
    console.log("-------------------------------");
}

// PRUEBAS MANUALES
listar();
console.log("\nBUSCAR:");
buscar("Clean");
console.log("\nDISPONIBILIDAD:");
disponibilidad(1);
console.log("\nPRESTAR:");
rentar(1, "Carlos");
console.log("\nDISPONIBILIDAD DESPUÉS DEL PRÉSTAMO:");
disponibilidad(1);
console.log("\nDEVOLVER:");
devolver(1);
console.log("\nESTADO FINAL:");
disponibilidad(1);