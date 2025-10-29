describe("FormularioContactoLogic.validarFormulario", function () {
  it("debería validar correctamente un formulario válido", function () {
    const result = window.FormularioContactoLogic.validarFormulario(
      "Sofía",
      "test@duoc.cl",
      "Este es un mensaje válido"
    );
    expect(result.valido).toBeTrue();
    expect(result.errorNombre).toBe('');
    expect(result.errorCorreo).toBe('');
    expect(result.errorContenido).toBe('');
  });

  it("debería devolver error si el nombre está vacío", function () {
    const result = window.FormularioContactoLogic.validarFormulario("", "test@duoc.cl", "Mensaje");
    expect(result.valido).toBeFalse();
    expect(result.errorNombre).toContain("nombre");
  });

  it("debería devolver error si el correo no es válido", function () {
    const result = window.FormularioContactoLogic.validarFormulario("Sofía", "correo@invalid.com", "Mensaje");
    expect(result.valido).toBeFalse();
    expect(result.errorCorreo).toContain("correo válido");
  });

  it("debería devolver error si el contenido está vacío", function () {
    const result = window.FormularioContactoLogic.validarFormulario("Sofía", "test@duoc.cl", "");
    expect(result.valido).toBeFalse();
    expect(result.errorContenido).toContain("comentario");
  });
});

describe("FormularioContactoLogic.enviarFormulario", function () {
  it("debería enviar correctamente si los datos son válidos", function () {
    const result = window.FormularioContactoLogic.enviarFormulario(
      "Sofía",
      "test@gmail.com",
      "Hola, esto es un mensaje."
    );
    expect(result.exito).toBeTrue();
    expect(result.mensaje).toContain("éxito");
  });

  it("debería fallar si los datos no son válidos", function () {
    const result = window.FormularioContactoLogic.enviarFormulario("", "test@gmail.com", "");
    expect(result.exito).toBeFalse();
    expect(result.mensaje).toContain("Error");
  });

  it("debería devolver los errores dentro del resultado si hay fallo", function () {
    const result = window.FormularioContactoLogic.enviarFormulario("", "malcorreo", "");
    expect(result.errores).toBeDefined();
    expect(result.errores.valido).toBeFalse();
  });
});
