// VALIDACIONES
// name > 3
// correo con expresiones regulares
// poner id para todos los metodos incluyendo el get y el post que ya se encuentra resuelto


// Valida que el nombre tenga mas de 3 caracteres
function validarNombre(nombre) {
  if (!nombre || typeof nombre !== "string" || nombre.trim().length <= 3) {
    return { valido: false, mensaje: "El nombre debe tener mas de 3 caracteres" }
  }
  return { valido: true }
}

// Valida el correo con una expresion regular
function validarCorreo(correo) {
  const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!correo || !expresionCorreo.test(correo)) {
    return { valido: false, mensaje: "El correo no tiene un formato valido" }
  }
  return { valido: true }
}

// Valida que la edad sea un numero valido mayor a 0
function validarEdad(edad) {
  const edadNumero = Number(edad)
  if (edad === undefined || edad === "" || isNaN(edadNumero) || edadNumero <= 0) {
    return { valido: false, mensaje: "La edad debe ser un numero valido mayor a 0" }
  }
  return { valido: true }
}

// Valida que el id (params) sea un numero entero valido
function validarId(id) {
  const idNumero = Number(id)
  if (id === undefined || isNaN(idNumero) || !Number.isInteger(idNumero) || idNumero <= 0) {
    return { valido: false, mensaje: "El id debe ser un numero entero valido" }
  }
  return { valido: true }
}

// Junta todas las validaciones de un aprendiz (usada en POST y PUT)
// Devuelve un arreglo de mensajes de error, vacio si todo esta bien
function validarAprendiz(datosAprendiz) {
  const errores = []

  const nombreValido = validarNombre(datosAprendiz.nombre)
  if (!nombreValido.valido) errores.push(nombreValido.mensaje)

  const correoValido = validarCorreo(datosAprendiz.correo)
  if (!correoValido.valido) errores.push(correoValido.mensaje)

  const edadValida = validarEdad(datosAprendiz.edad)
  if (!edadValida.valido) errores.push(edadValida.mensaje)

  return errores
}

module.exports = {
  validarNombre,
  validarCorreo,
  validarEdad,
  validarId,
  validarAprendiz
}
