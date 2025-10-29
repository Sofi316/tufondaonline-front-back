describe("FormularioLoginLogic.validarCredenciales", function () {
  it("debería validar correctamente credenciales válidas", function () {
    const result = window.FormularioLoginLogic.validarCredenciales("usuario@duoc.cl", "12345");
    expect(result.valido).toBeTrue();
    expect(result.mensajeError).toBe('');
  });

  it("debería rechazar correos con dominio no permitido", function () {
    const result = window.FormularioLoginLogic.validarCredenciales("usuario@otro.com", "12345");
    expect(result.valido).toBeFalse();
    expect(result.mensajeError).toContain("Correo inválido");
  });

  it("debería rechazar contraseñas demasiado cortas", function () {
    const result = window.FormularioLoginLogic.validarCredenciales("usuario@duoc.cl", "123");
    expect(result.valido).toBeFalse();
    expect(result.mensajeError).toContain("Contraseña inválida");
  });

  it("debería rechazar contraseñas demasiado largas", function () {
    const result = window.FormularioLoginLogic.validarCredenciales("usuario@duoc.cl", "12345678910");
    expect(result.valido).toBeFalse();
    expect(result.mensajeError).toContain("Contraseña inválida");
  });
});

describe("FormularioLoginLogic.procesarLogin", function () {
  it("debería retornar éxito si iniciarSesion devuelve un usuario", function () {
    const mockAuth = function (email, password) {
      return { email: email, role: "usuario" };
    };
    const result = window.FormularioLoginLogic.procesarLogin("user@gmail.com", "12345", mockAuth);
    expect(result.exito).toBeTrue();
    expect(result.mensaje).toContain("exitoso");
  });

  it("debería fallar si iniciarSesion devuelve null", function () {
    const mockAuth = function () { return null; };
    const result = window.FormularioLoginLogic.procesarLogin("user@gmail.com", "12345", mockAuth);
    expect(result.exito).toBeFalse();
    expect(result.mensaje).toContain("incorrectos");
  });

  it("debería fallar si iniciarSesion no es una función", function () {
    const result = window.FormularioLoginLogic.procesarLogin("user@gmail.com", "12345", null);
    expect(result.exito).toBeFalse();
    expect(result.mensaje).toContain("no es una función");
  });

  it("debería devolver error de validación si el correo es inválido", function () {
    const mockAuth = function () { return { role: "usuario" }; };
    const result = window.FormularioLoginLogic.procesarLogin("malcorreo", "12345", mockAuth);
    expect(result.exito).toBeFalse();
    expect(result.mensaje).toContain("Correo inválido");
  });
});
