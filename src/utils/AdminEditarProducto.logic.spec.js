describe("AdminEditarProductoLogic", function () {

  it("debe actualizar correctamente el valor numérico en handleChange", function () {
    let data = { precio: "" };
    const setFormData = (fn) => { data = fn(data); };
    const setMensaje = jasmine.createSpy("setMensaje");
    const e = { target: { name: "precio", value: "500", type: "number" } };
    window.AdminEditarProductoLogic.handleChange(e, setFormData, setMensaje);
    expect(data.precio).toBe(500);
  });

  it("debe marcar checkbox correctamente en handleChange", function () {
    let data = { enOferta: false };
    const setFormData = (fn) => { data = fn(data); };
    const e = { target: { name: "enOferta", checked: true, type: "checkbox" } };
    window.AdminEditarProductoLogic.handleChange(e, setFormData, () => {});
    expect(data.enOferta).toBeTrue();
  });

  it("debe devolver error cuando faltan campos obligatorios en handleSubmit", function () {
    const result = window.AdminEditarProductoLogic.handleSubmit(
      { preventDefault: () => {} },
      { nombre: "", precio: "", categoria: "", stock: "" },
      "1",
      () => {},
      () => {}
    );
    expect(result.tipoMensaje).toBe("danger");
    expect(result.mensaje).toContain("obligatorios");
  });

  it("debe devolver advertencia cuando el precio oferta >= precio normal", function () {
    const result = window.AdminEditarProductoLogic.handleSubmit(
      { preventDefault: () => {} },
      { nombre: "X", precio: 1000, categoria: "A", stock: 5, enOferta: true, precioOferta: 1500 },
      "1",
      () => {},
      () => {}
    );
    expect(result.tipoMensaje).toBe("warning");
  });

  it("debe devolver éxito cuando los datos son válidos", function () {
    const mockActualizar = jasmine.createSpy("actualizarProducto");
    const mockNavigate = jasmine.createSpy("navigate");
    const result = window.AdminEditarProductoLogic.handleSubmit(
      { preventDefault: () => {} },
      { nombre: "X", precio: 1000, categoria: "A", stock: 5, enOferta: false },
      "1",
      mockActualizar,
      mockNavigate
    );
    expect(result.tipoMensaje).toBe("success");
    expect(mockActualizar).toHaveBeenCalled();
  });
});
