describe("AdminCrearUsuarioLogic", function () {

  it("debe validar correctamente un RUT válido", function () {
    const valido = window.AdminCrearUsuarioLogic.validarRUT("12345678-K");
    expect(valido).toBeTrue();
  });

  it("debe rechazar un RUT inválido", function () {
    const invalido = window.AdminCrearUsuarioLogic.validarRUT("12.345.678-99");
    expect(invalido).toBeFalse();
  });

  it("debe actualizar correctamente un campo con handleChange", function () {
    let form = { nombre: "" };
    const setFormData = (fn) => { form = fn(form); };
    const e = { target: { name: "nombre", value: "Pedro" } };
    window.AdminCrearUsuarioLogic.handleChange(e, setFormData, () => {});
    expect(form.nombre).toBe("Pedro");
  });

  it("debe devolver error si faltan campos obligatorios", function () {
    const result = window.AdminCrearUsuarioLogic.handleSubmit(
      { preventDefault: () => {} },
      { rut: "", email: "", nombre: "", apellidos: "" },
      () => {},
      {}
    );
    expect(result.tipoMensaje).toBe("danger");
  });

  it("debe devolver error si las contraseñas no coinciden", function () {
    const result = window.AdminCrearUsuarioLogic.handleSubmit(
      { preventDefault: () => {} },
      {
        rut: "12345678-K",
        email: "test@duoc.cl",
        nombre: "Juan",
        apellidos: "Pérez",
        fechaNac: "2000-01-01",
        direccion: "Av. Siempre Viva",
        contraseña: "1234",
        contraseñaCon: "0000"
      },
      () => {},
      {}
    );
    expect(result.mensaje).toContain("no coinciden");
  });

  it("debe crear usuario correctamente si los datos son válidos", function () {
    const mockCreate = jasmine.createSpy("createUsuario");
    const result = window.AdminCrearUsuarioLogic.handleSubmit(
      { preventDefault: () => {} },
      {
        rut: "12345678-K",
        email: "test@duoc.cl",
        nombre: "Juan",
        apellidos: "Pérez",
        fechaNac: "2000-01-01",
        direccion: "Av. Siempre Viva",
        contraseña: "1234",
        contraseñaCon: "1234"
      },
      mockCreate,
      {}
    );
    expect(result.tipoMensaje).toBe("success");
    expect(mockCreate).toHaveBeenCalled();
  });
});
