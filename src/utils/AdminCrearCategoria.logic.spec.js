describe("AdminCrearCategoriaLogic", function () {

  // --- handleChange ---
  it("debe actualizar el nombre de la categoría correctamente", function () {
    let nombre = "";
    const setNombreCategoria = (val) => nombre = val;
    const setMensaje = jasmine.createSpy("setMensaje");
    const e = { target: { value: "Postres" } };

    window.AdminCrearCategoriaLogic.handleChange(e, setNombreCategoria, setMensaje);
    expect(nombre).toBe("Postres");
    expect(setMensaje).toHaveBeenCalledWith("");
  });

  it("debe limpiar mensaje previo al cambiar texto", function () {
    let mensaje = "Error anterior";
    const setMensaje = (val) => mensaje = val;
    window.AdminCrearCategoriaLogic.handleChange({ target: { value: "Nueva" } }, () => {}, setMensaje);
    expect(mensaje).toBe("");
  });

  // --- handleSubmit ---
  it("debe mostrar error si el nombre está vacío", function () {
    const mockSetMensaje = jasmine.createSpy("setMensaje");
    const mockSetTipo = jasmine.createSpy("setTipoMensaje");
    const result = window.AdminCrearCategoriaLogic.handleSubmit(
      { preventDefault: () => {} },
      " ",
      mockSetMensaje,
      mockSetTipo,
      () => {},
      () => {}
    );
    expect(result.tipoMensaje).toBe("danger");
    expect(mockSetMensaje).toHaveBeenCalledWith("Error: El nombre de la categoría no puede estar vacío.");
  });

  it("debe crear categoría correctamente con nombre válido", function () {
    const mockSetMensaje = jasmine.createSpy("setMensaje");
    const mockSetTipo = jasmine.createSpy("setTipoMensaje");
    const mockSetNombre = jasmine.createSpy("setNombreCategoria");
    const mockNavigate = jasmine.createSpy("navigate");

    const result = window.AdminCrearCategoriaLogic.handleSubmit(
      { preventDefault: () => {} },
      "Bebidas",
      mockSetMensaje,
      mockSetTipo,
      mockSetNombre,
      mockNavigate
    );

    expect(result.tipoMensaje).toBe("success");
    expect(mockSetTipo).toHaveBeenCalledWith("success");
    expect(mockSetMensaje).toHaveBeenCalled();
    expect(mockSetNombre).toHaveBeenCalledWith("");
  });

  it("debe retornar objeto de éxito con reset true", function () {
    const result = window.AdminCrearCategoriaLogic.handleSubmit(
      { preventDefault: () => {} },
      "Helados",
      () => {},
      () => {},
      () => {},
      () => {}
    );
    expect(result.reset).toBeTrue();
  });

});
