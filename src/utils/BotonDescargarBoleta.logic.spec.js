describe("BotonDescargarBoletaLogic.generarContenidoBoleta", function () {
  it("debería generar contenido válido con una orden correcta", function () {
    const orderDetails = {
      orderNumber: "123",
      items: [
        { name: "Empanada", quantity: 2, price: 1500 },
        { name: "Bebida", quantity: 1, price: 1000 }
      ],
      total: 4000
    };

    const result = window.BotonDescargarBoletaLogic.generarContenidoBoleta(orderDetails);
    expect(result).toContain("Número de Orden: 123");
    expect(result).toContain("Empanada");
    expect(result).toContain("Total: $4000");
  });

  it("debería devolver error si orderDetails es nulo o inválido", function () {
    const result = window.BotonDescargarBoletaLogic.generarContenidoBoleta(null);
    expect(result).toContain("Error:");
  });

  it("debería devolver error si no hay productos en la orden", function () {
    const orderDetails = { orderNumber: "999", items: [], total: 0 };
    const result = window.BotonDescargarBoletaLogic.generarContenidoBoleta(orderDetails);
    expect(result).toContain("Error: la orden no contiene productos.");
  });

  it("debería manejar errores inesperados sin lanzar excepciones", function () {
    spyOn(console, "error");
    const badOrder = { items: "no es un array" };
    const result = window.BotonDescargarBoletaLogic.generarContenidoBoleta(badOrder);
    expect(result).toContain("Error:");
  });
});
