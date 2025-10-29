describe("RegistroLogic", function () {

  // ---- validarRUT ----
  it("debe validar correctamente un RUT válido", function () {
    const resultado = window.RegistroLogic.validarRUT("12345678-K");
    expect(resultado).toBeTrue();
  });

  it("debe retornar false si el RUT es nulo o vacío", function () {
    const resultado = window.RegistroLogic.validarRUT("");
    expect(resultado).toBeFalse();
  });

  it("debe retornar false si el RUT tiene formato inválido", function () {
    const resultado = window.RegistroLogic.validarRUT("ABC123");
    expect(resultado).toBeFalse();
  });

  // ---- calcularEdad ----
  it("debe calcular correctamente la edad", function () {
    const fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() - 25);
    const resultado = window.RegistroLogic.calcularEdad(fecha.toISOString());
    expect(resultado).toBe(25);
  });

  it("debe retornar 0 si la fecha es nula", function () {
    const resultado = window.RegistroLogic.calcularEdad("");
    expect(resultado).toBe(0);
  });

  it("debe manejar correctamente caso borde de cumpleaños hoy", function () {
    const hoy = new Date();
    const resultado = window.RegistroLogic.calcularEdad(hoy.toISOString());
    expect(resultado).toBe(0);
  });

  // ---- validarFormulario ----
  it("debe rechazar si falta el RUT", function () {
    const form = { rut: "", email: "test@gmail.com" };
    const resultado = window.RegistroLogic.validarFormulario(form);
    expect(resultado.ok).toBeFalse();
  });

  it("debe aceptar un formulario válido", function () {
    const fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() - 30);
    const form = {
      rut: "12345678-K",
      email: "test@gmail.com",
      nombre: "Juan",
      apellidos: "Pérez",
      fechaNac: fecha.toISOString(),
      direccion: "Av. Siempreviva 123",
      region: "RM",
      comuna: "Santiago",
      contraseña: "abcd1",
      contraseñaCon: "abcd1",
      codigo: "FELICES8"
    };
    const resultado = window.RegistroLogic.validarFormulario(form);
    expect(resultado.ok).toBeTrue();
  });

  it("debe detectar contraseñas no coincidentes", function () {
    const fecha = new Date();
    fecha.setFullYear(fecha.getFullYear() - 25);
    const form = {
      rut: "12345678-K",
      email: "test@gmail.com",
      nombre: "Juan",
      apellidos: "Pérez",
      fechaNac: fecha.toISOString(),
      direccion: "Av. Siempreviva 123",
      region: "RM",
      comuna: "Santiago",
      contraseña: "abcd1",
      contraseñaCon: "xyz",
      codigo: ""
    };
    const resultado = window.RegistroLogic.validarFormulario(form);
    expect(resultado.ok).toBeFalse();
  });
});
