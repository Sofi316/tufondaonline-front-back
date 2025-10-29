window.RegistroLogic = {

  //Validar formato de RUT chileno (sin puntos, con guion o K)
  validarRUT: function (rut) {
    if (!rut) return false;
    rut = rut.replace(/[.-]/g, '').toUpperCase();
    return /^[0-9]{7,8}[0-9K]$/.test(rut);
  },

  //Calcular edad exacta en años según fecha de nacimiento
  calcularEdad: function (fechaNac) {
    if (!fechaNac) return 0;
    const nacimiento = new Date(fechaNac);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  },

  //Manejador genérico de cambio de input
  handleChange: function (formData, e) {
    const { name, value } = e.target;
    return { ...formData, [name]: value };
  },

  // Validación principal del formulario de registro
  validarFormulario: function (formData) {
    const { rut, email, nombre, apellidos, fechaNac, direccion, contraseña, contraseñaCon, region, comuna, codigo } = formData;
    let descuentos = [];

    if (!rut || !window.RegistroLogic.validarRUT(rut)) {
      return { ok: false, tipo: "danger", mensaje: "El RUT es requerido y debe ser válido (ej: 12345678-K)" };
    }

    if (!email || !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email)) {
      return { ok: false, tipo: "danger", mensaje: "Correo requerido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com" };
    }

    if (email.endsWith('@duoc.cl')) {
      descuentos.push("¡Choripan gratis en tu cumpleaños por ser estudiante Duoc!");
    }

    if (!nombre || nombre.length > 50) {
      return { ok: false, tipo: "danger", mensaje: "Nombre requerido (máx. 50 caracteres)" };
    }

    if (!apellidos || apellidos.length > 100) {
      return { ok: false, tipo: "danger", mensaje: "Apellidos requeridos (máx. 100 caracteres)" };
    }

    if (!fechaNac) {
      return { ok: false, tipo: "danger", mensaje: "Fecha de nacimiento requerida" };
    }

    const edad = window.RegistroLogic.calcularEdad(fechaNac);
    if (edad < 18) {
      return { ok: false, tipo: "danger", mensaje: "Debes ser mayor de 18 años para registrarte." };
    }
    if (edad >= 50) {
      descuentos.push("¡Tienes 50% de descuento por ser mayor de 50 años!");
    }

    if (!direccion || direccion.length > 300) {
      return { ok: false, tipo: "danger", mensaje: "Dirección requerida (máx. 300 caracteres)" };
    }

    if (!region || !comuna) {
      return { ok: false, tipo: "danger", mensaje: "Debes seleccionar una Región y Comuna" };
    }

    if (!contraseña || contraseña.length < 4 || contraseña.length > 10) {
      return { ok: false, tipo: "danger", mensaje: "Contraseña requerida (debe tener entre 4 y 10 caracteres)" };
    }

    if (contraseña !== contraseñaCon) {
      return { ok: false, tipo: "danger", mensaje: "Error: Las contraseñas no coinciden." };
    }

    if (codigo === "FELICES8") {
      descuentos.push("¡Tienes 10% de descuento por usar el código FELICES18!");
    }

    return {
      ok: true,
      tipo: "success",
      mensaje: "¡Registro válido!",
      descuentos
    };
  }
};
