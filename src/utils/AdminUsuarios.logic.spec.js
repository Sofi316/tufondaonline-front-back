describe("AdminUsuariosLogic", function() {

  const logic = window.AdminUsuariosLogic;

  // --- initUsuarios ---
  it("debería obtener usuarios correctamente", function() {
    const mock = () => [{ id: 1, nombre: "Juan" }];
    const result = logic.initUsuarios(mock);
    expect(result.length).toBe(1);
  });

  it("debería retornar undefined si getUsuarios no está definido", function() {
    expect(logic.initUsuarios()).toBeUndefined();
  });

  it("debería retornar array vacío si la función devuelve vacío", function() {
    const mock = () => [];
    const result = logic.initUsuarios(mock);
    expect(result).toEqual([]);
  });

  // --- updateComunasPorRegion ---
  it("debería obtener comunas cuando hay región válida", function() {
    const mock = (r) => ["Santiago"];
    const result = logic.updateComunasPorRegion("RM", mock);
    expect(result[0]).toBe("Santiago");
  });

  it("debería retornar [] si no hay región", function() {
    const result = logic.updateComunasPorRegion("", () => ["A"]);
    expect(result).toEqual([]);
  });

  it("debería retornar [] si getComunas no existe", function() {
    const result = logic.updateComunasPorRegion("RM");
    expect(result).toEqual([]);
  });

  // --- handleShowDetails ---
  it("debería obtener historial del usuario", function() {
    const user = { id: 1 };
    const mockOrdenes = () => [{ id: 99 }];
    const result = logic.handleShowDetails(user, mockOrdenes);
    expect(result.historial.length).toBe(1);
  });

  it("debería retornar vacío si user es nulo", function() {
    const result = logic.handleShowDetails(null, () => []);
    expect(result).toEqual({ selectedUser: null, historial: [] });
  });

  it("debería retornar vacío si user.id no existe", function() {
    const result = logic.handleShowDetails({}, () => []);
    expect(result).toEqual({ selectedUser: null, historial: [] });
  });

  // --- handleEditFormChange ---
  it("debería actualizar el campo del formulario", function() {
    const prev = { nombre: "Juan" };
    const result = logic.handleEditFormChange(prev, "nombre", "Pedro");
    expect(result.nombre).toBe("Pedro");
  });

  it("debería retornar el mismo objeto si no hay nombre de campo", function() {
    const prev = { a: 1 };
    const result = logic.handleEditFormChange(prev, "", "x");
    expect(result).toBe(prev);
  });

  // --- formatPesoChileno ---
  it("debería formatear el número en pesos chilenos", function() {
    const result = logic.formatPesoChileno(1000);
    expect(result).toContain("$");
  });

  it("debería retornar $0 si el valor no es número", function() {
    const result = logic.formatPesoChileno("abc");
    expect(result).toBe("$0");
  });

  it("debería manejar correctamente valores grandes", function() {
    const result = logic.formatPesoChileno(999999);
    expect(result).toContain(".");
  });

});
