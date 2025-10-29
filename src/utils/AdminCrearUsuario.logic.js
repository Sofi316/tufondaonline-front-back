window.AdminCrearUsuarioLogic = (() => {

  function validarRUT(rut) {
    rut = rut.replace(/[.-]/g, '').toUpperCase();
    return /^[0-9]{7,8}[0-9K]$/.test(rut);
  }

  function handleChange(e, setFormData, setMensaje) {
    setMensaje("");
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e, formData, createUsuario, initialState) {
    e.preventDefault();

    const { rut, email, nombre, apellidos, fechaNac, direccion, contraseña, contraseñaCon } = formData;

    if (!rut || !validarRUT(rut)) {
      return { tipoMensaje: "danger", mensaje: "El RUT es requerido y debe ser válido (ej: 12345678-K)" };
    }

    if (!email || !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email)) {
      return { tipoMensaje: "danger", mensaje: "Correo requerido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com" };
    }

    if (!nombre || nombre.length > 50) {
      return { tipoMensaje: "danger", mensaje: "Nombre requerido (máx. 50 caracteres)" };
    }

    if (!apellidos || apellidos.length > 100) {
      return { tipoMensaje: "danger", mensaje: "Apellidos requeridos (máx. 100 caracteres)" };
    }

    if (!fechaNac) {
      return { tipoMensaje: "danger", mensaje: "Fecha de nacimiento requerida" };
    }

    if (!direccion || direccion.length > 300) {
      return { tipoMensaje: "danger", mensaje: "Dirección requerida (máx. 300 caracteres)" };
    }

    if (!contraseña || contraseña.length < 4 || contraseña.length > 10) {
      return { tipoMensaje: "danger", mensaje: "Contraseña requerida (debe tener entre 4 y 10 caracteres)" };
    }

    if (contraseña !== contraseñaCon) {
      return { tipoMensaje: "danger", mensaje: "Error: Las contraseñas no coinciden." };
    }

    try {
      createUsuario(formData);
      return { tipoMensaje: "success", mensaje: "¡Usuario creado exitosamente!", reset: true };
    } catch (error) {
      return { tipoMensaje: "danger", mensaje: "Error al crear el usuario: " + error.message };
    }
  }

  return { validarRUT, handleChange, handleSubmit };
})();
