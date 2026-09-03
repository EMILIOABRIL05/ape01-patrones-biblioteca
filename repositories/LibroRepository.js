// Responsabilidad: almacenar y recuperar los datos de los libros
const Libro = require("../models/Libro");

const libros = [
    new Libro(1, "Clean Code", "Robert C. Martin"),
    new Libro(2, "Design Patterns", "Erich Gamma"),
    new Libro(3, "Refactoring", "Martin Fowler"),
];

libros[2].estado = "P";
libros[2].usuario = "Juan";

function buscarPorId(id) {
    return libros.find(libro => libro.id === id);
}

function obtenerTodos() {
    return libros;
}

module.exports = { buscarPorId, obtenerTodos };