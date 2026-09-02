// Punto de entrada de la aplicación
const biblioteca = require("./services/BibliotecaService");

biblioteca.listar();

console.log("\nBUSCAR:");
biblioteca.buscar("Clean");

console.log("\nDISPONIBILIDAD:");
biblioteca.disponibilidad(1);

console.log("\nPRESTAR:");
biblioteca.rentar(1, "Carlos");

console.log("\nDISPONIBILIDAD DESPUÉS DEL PRÉSTAMO:");
biblioteca.disponibilidad(1);

console.log("\nDEVOLVER:");
biblioteca.devolver(1);

console.log("\nESTADO FINAL:");
biblioteca.disponibilidad(1);