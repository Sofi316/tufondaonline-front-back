if (!window.FormularioLoginLogic) {
  window.FormularioLoginLogic = {};
}

window.FormularioLoginLogic.validarCredenciales = function (email, password) {
  const resultado = {
    valido: true,
    mensajeError: ''
  };

  const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  if (!email || !regexCorreo.test(email)) {
    resultado.valido = false;
    resultado.mensajeError = 'Correo inválido (@duoc.cl, @profesor.duoc.cl o @gmail.com).';
  } else if (!password || password.length < 4 || password.length > 10) {
    resultado.valido = false;
    resultado.mensajeError = 'Contraseña inválida (mín. 4 y máx. 10 caracteres).';
  }

  return resultado;
};

window.FormularioLoginLogic.procesarLogin = function (email, password, iniciarSesion) {
  const validacion = window.FormularioLoginLogic.validarCredenciales(email, password);

  if (!validacion.valido) {
    return { exito: false, mensaje: validacion.mensajeError };
  }

  if (typeof iniciarSesion !== "function") {
    return { exito: false, mensaje: "Error interno: iniciarSesion no es una función." };
  }

  const loggedInUser = iniciarSesion(email, password);

  if (loggedInUser) {
    return {
      exito: true,
      mensaje: "Inicio de sesión exitoso.",
      usuario: loggedInUser
    };
  } else {
    return { exito: false, mensaje: "Correo o contraseña incorrectos." };
  }
};
