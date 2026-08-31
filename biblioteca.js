// biblioteca.js

var libros = [
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


// BUSCAR LIBRO
function buscar(x) {

    var encontrado = false;

    for (var i = 0; i < libros.length; i++) {

        if (
            libros[i].titulo.toLowerCase().includes(x.toLowerCase()) ||
            libros[i].autor.toLowerCase().includes(x.toLowerCase())
        ) {

            console.log(
                libros[i].id +
                " - " +
                libros[i].titulo +
                " - " +
                libros[i].autor
            );

            if (libros[i].estado == "D") {
                console.log("Disponible");
            } else {
                console.log("Prestado");
            }

            encontrado = true;
        }
    }

    if (encontrado == false) {
        console.log("No se encontraron libros");
    }
}


// VER DISPONIBILIDAD
function disponibilidad(id) {

    var x = null;

    for (var i = 0; i < libros.length; i++) {

        if (libros[i].id == id) {
            x = libros[i];
        }
    }

    if (x == null) {

        console.log("Libro no encontrado");

    } else {

        if (x.estado == "D") {

            console.log(
                "El libro " +
                x.titulo +
                " está disponible"
            );

        } else {

            console.log(
                "El libro " +
                x.titulo +
                " está prestado a " +
                x.usuario
            );
        }
    }
}


// RENTAR / PRESTAR LIBRO
function rentar(id, nombre) {

    var libro = null;

    for (var i = 0; i < libros.length; i++) {

        if (libros[i].id == id) {
            libro = libros[i];
        }
    }

    if (libro == null) {

        console.log("Libro no encontrado");

    } else {

        if (nombre == null || nombre == "") {

            console.log("Debe ingresar el nombre del usuario");

        } else {

            if (libro.estado == "D") {

                libro.estado = "P";
                libro.usuario = nombre;

                console.log(
                    "El libro " +
                    libro.titulo +
                    " fue prestado correctamente a " +
                    nombre
                );

            } else {

                console.log(
                    "No se puede prestar el libro porque ya está prestado"
                );
            }
        }
    }
}


// DEVOLVER LIBRO
function devolver(id) {

    var libro = null;

    for (var i = 0; i < libros.length; i++) {

        if (libros[i].id == id) {
            libro = libros[i];
        }
    }

    if (libro == null) {

        console.log("Libro no encontrado");

    } else {

        if (libro.estado == "P") {

            console.log(
                "Devolución realizada. Libro: " +
                libro.titulo +
                ". Usuario anterior: " +
                libro.usuario
            );

            libro.estado = "D";
            libro.usuario = "";

        } else {

            console.log(
                "El libro no puede devolverse porque ya está disponible"
            );
        }
    }
}


// LISTAR TODOS LOS LIBROS
function listar() {

    console.log("---------- BIBLIOTECA ----------");

    for (var i = 0; i < libros.length; i++) {

        console.log(
            libros[i].id +
            " | " +
            libros[i].titulo +
            " | " +
            libros[i].autor +
            " | " +
            libros[i].estado
        );
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