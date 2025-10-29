if (!window.FormularioContactoLogic) {
  window.FormularioContactoLogic = {};
}


window.FormularioContactoLogic.validarFormulario = function (nombre, correo, contenido) {
  const errores = {
    errorNombre: '',
    errorCorreo: '',
    errorContenido: '',
    valido: true
  };

  // Validación de Nombre
  if (!nombre || nombre.trim() === '' || nombre.length > 100) {
    errores.errorNombre = 'El nombre es requerido (máx. 100 caracteres).';
    errores.valido = false;
  }

  // Validación de Correo
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!correo || !regexCorreo.test(correo) || correo.length > 100) {
    errores.errorCorreo = 'Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).';
    errores.valido = false;
  }

  // Validación de Contenido
  if (!contenido || contenido.trim() === '' || contenido.length > 500) {
    errores.errorContenido = 'El comentario es requerido (máx. 500 caracteres).';
    errores.valido = false;
  }

  return errores;
};


window.FormularioContactoLogic.enviarFormulario = function (nombre, correo, contenido) {
  const validacion = window.FormularioContactoLogic.validarFormulario(nombre, correo, contenido);

  if (!validacion.valido) {
    return { exito: false, mensaje: 'Error: el formulario contiene errores.', errores: validacion };
  }

  console.log('Formulario enviado:', { nombre, correo, contenido });

  return { exito: true, mensaje: '¡Mensaje enviado con éxito!' };
};
