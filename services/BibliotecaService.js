// Responsabilidad: contener la lógica de negocio de la biblioteca
const repo = require("../repositories/LibroRepository");
const { nombreEsValido } = require("../utils/validaciones");

function listar() {
    console.log("---------- BIBLIOTECA ----------");
    repo.obtenerTodos().forEach(libro => {
        console.log(`${libro.id} | ${libro.titulo} | ${libro.autor} | ${libro.estado}`);
    });
    console.log("--------------------------------");
}

function buscar(criterioBusqueda) {
    const termino = criterioBusqueda.toLowerCase();
    const encontrados = repo.obtenerTodos().filter(libro =>
        libro.titulo.toLowerCase().includes(termino) ||
        libro.autor.toLowerCase().includes(termino)
    );

    if (encontrados.length === 0) {
        console.log("No se encontraron libros");
        return;
    }

    encontrados.forEach(libro => {
        const estadoTexto = libro.estado === "D" ? "Disponible" : "Prestado";
        console.log(`${libro.id} - ${libro.titulo} - ${libro.autor}`);
        console.log(estadoTexto);
    });
}

function disponibilidad(id) {
    const libro = repo.buscarPorId(id);

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

// SRP: función que solo valida si el préstamo puede realizarse
function validarPrestamo(libro, nombreUsuario) {
    if (!libro) return "Libro no encontrado";
    if (!nombreEsValido(nombreUsuario)) return "Debe ingresar el nombre del usuario";
    if (libro.estado !== "D") return "No se puede prestar el libro porque ya está prestado";
    return null;
}

// SRP: función que solo registra el cambio de estado
function registrarPrestamo(libro, nombreUsuario) {
    libro.estado = "P";
    libro.usuario = nombreUsuario;
}

// rentar actúa como coordinador: delega validación y registro
function rentar(id, nombreUsuario) {
    const libro = repo.buscarPorId(id);
    const error = validarPrestamo(libro, nombreUsuario);

    if (error) {
        console.log(error);
        return;
    }

    registrarPrestamo(libro, nombreUsuario);
    console.log(`El libro ${libro.titulo} fue prestado correctamente a ${nombreUsuario}`);
}

function devolver(id) {
    const libro = repo.buscarPorId(id);

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

module.exports = { listar, buscar, disponibilidad, rentar, devolver };