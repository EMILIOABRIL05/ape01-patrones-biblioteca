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

// BUSCAR LIBRO (Refactorizado con KISS y YAGNI)
function buscar(criterioBusqueda) {
    const termino = criterioBusqueda.toLowerCase();
    const librosEncontrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(termino) ||
        libro.autor.toLowerCase().includes(termino)
    );

    if (librosEncontrados.length === 0) {
        console.log("No se encontraron libros");
        return;
    }

    librosEncontrados.forEach(libro => {
        const estadoTexto = libro.estado === "D" ? "Disponible" : "Prestado";
        console.log(`${libro.id} - ${libro.titulo} - ${libro.autor}`);
        console.log(estadoTexto);
    });
}

// VER DISPONIBILIDAD (Refactorizado con KISS - Guard Clauses)
function disponibilidad(id) {
    const libro = buscarLibroPorId(id);

    if (!libro) {
        console.log("Libro no encontrado");
        return;
    }

    if (libro.estado === "D") {
        console.log(`El libro ${libro.titulo} está disponible`);
    } else {
        console.log(`El libro ${libro.titulo} está prestado a ${libro.usuario}`);
    }
}

// RENTAR / PRESTAR LIBRO (Refactorizado con KISS - Guard Clauses)
function rentar(id, nombreUsuario) {
    const libro = buscarLibroPorId(id);

    if (!libro) {
        console.log("Libro no encontrado");
        return;
    }

    if (!nombreUsuario || nombreUsuario.trim() === "") {
        console.log("Debe ingresar el nombre del usuario");
        return;
    }

    if (libro.estado !== "D") {
        console.log("No se puede prestar el libro porque ya está prestado");
        return;
    }

    libro.estado = "P";
    libro.usuario = nombreUsuario;
    console.log(`El libro ${libro.titulo} fue prestado correctamente a ${nombreUsuario}`);
}

// DEVOLVER LIBRO (Refactorizado con KISS - Guard Clauses)
function devolver(id) {
    const libro = buscarLibroPorId(id);

    if (!libro) {
        console.log("Libro no encontrado");
        return;
    }

    if (libro.estado !== "P") {
        console.log("El libro no puede devolverse porque ya está disponible");
        return;
    }

    console.log(`Devolución realizada. Libro: ${libro.titulo}. Usuario anterior: ${libro.usuario}`);
    libro.estado = "D";
    libro.usuario = "";
}

// LISTAR TODOS LOS LIBROS (Refactorizado)
function listar() {
    console.log("---------- BIBLIOTECA ----------");
    libros.forEach(libro => {
        console.log(`${libro.id} | ${libro.titulo} | ${libro.autor} | ${libro.estado}`);
    });
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