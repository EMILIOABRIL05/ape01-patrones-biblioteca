// Representa la estructura de datos de un libro
class Libro {
    constructor(id, titulo, autor) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.estado = "D";
        this.usuario = "";
    }
}

module.exports = Libro;