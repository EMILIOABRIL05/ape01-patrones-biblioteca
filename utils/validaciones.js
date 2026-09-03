// Responsabilidad: centralizar las validaciones del sistema
function nombreEsValido(nombre) {
    return nombre && nombre.trim() !== "";
}

module.exports = { nombreEsValido };