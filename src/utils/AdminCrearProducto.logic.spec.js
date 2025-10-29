describe("AdminCrearProductoLogic", function () {

  it("debe actualizar valores numéricos correctamente con handleChange", function () {
    let data = { precio: "" };
    const setFormData = (fn) => { data = fn(data); };
    const e = { target: { name: "precio", value: "1500", type: "number" } };
    window.AdminCrearProductoLogic.handleChange(e, setFormData, () => {});
    expect(data.precio).toBe(1500);
  });

  it("debe marcar checkbox correctamente con handleChange", function () {
    let data = { enOferta: false };
    const setFormData = (fn) => { data = fn(data); };
    const e = { target: { name: "enOferta", checked: true, type: "checkbox" } };
    window.AdminCrearProductoLogic.handleChange(e, setFormData, () => {});
    expect(data.enOferta).toBeTrue();
  });

  it("debe devolver error si faltan campos obligatorios en handleSubmit", function () {
    const result = window.AdminCrearProductoLogic.handleSubmit(
      { preventDefault: () => {} },
      { nombre: "", precio: "", categoria: "", stock: "" },
      () => {},
      () => {},
      {}
    );
    expect(result.tipoMensaje).toBe("danger");
    expect(result.mensaje).toContain("obligatorios");
  });

  it("debe devolver advertencia si el precio oferta es mayor o igual al normal", function () {
    const result = window.AdminCrearProductoLogic.handleSubmit(
      { preventDefault: () => {} },
      {
        nombre: "Test",
        precio: 1000,
        categoria: "Pan",
        stock: 5,
        enOferta: true,
        precioOferta: 1500
      },
      () => {},
      () => {},
      {}
    );
    expect(result.tipoMensaje).toBe("warning");
  });

  it("debe crear producto correctamente con datos válidos", function () {
    const mockAgregar = jasmine.createSpy("agregarProducto");
    const mockNavigate = jasmine.createSpy("navigate");
    const result = window.AdminCrearProductoLogic.handleSubmit(
      { preventDefault: () => {} },
      {
        nombre: "Empanada",
        precio: 2000,
        categoria: "Comida",
        stock: 10,
        enOferta: false,
      },
      mockAgregar,
      mockNavigate,
      {}
    );
    expect(result.tipoMensaje).toBe("success");
    expect(mockAgregar).toHaveBeenCalled();
  });

});
