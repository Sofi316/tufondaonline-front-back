describe("CarritoLogic", function () {

  // ---- agregarAlCarrito ----
  it("debe agregar un producto nuevo al carrito", function () {
    const carrito = [];
    const nuevo = window.CarritoLogic.agregarAlCarrito(carrito, 1, "Pan", 1000, "img.jpg");
    expect(nuevo.length).toBe(1);
    expect(nuevo[0].nombre).toBe("Pan");
  });

  it("debe incrementar la cantidad si el producto ya existe", function () {
    const carrito = [{ id: 1, nombre: "Pan", precio: 1000, img: "img.jpg", cantidad: 1 }];
    const nuevo = window.CarritoLogic.agregarAlCarrito(carrito, 1, "Pan", 1000, "img.jpg");
    expect(nuevo[0].cantidad).toBe(2);
  });

  it("debe mantener otros productos sin cambios", function () {
    const carrito = [{ id: 2, nombre: "Leche", precio: 1500, img: "", cantidad: 1 }];
    const nuevo = window.CarritoLogic.agregarAlCarrito(carrito, 1, "Pan", 1000, "img.jpg");
    expect(nuevo.length).toBe(2);
  });

  // ---- eliminarDelCarrito ----
  it("debe eliminar un producto existente", function () {
    const carrito = [{ nombre: "Pan" }, { nombre: "Leche" }];
    const nuevo = window.CarritoLogic.eliminarDelCarrito(carrito, "Pan");
    expect(nuevo.length).toBe(1);
    expect(nuevo[0].nombre).toBe("Leche");
  });

  it("no debe afectar si el producto no existe", function () {
    const carrito = [{ nombre: "Leche" }];
    const nuevo = window.CarritoLogic.eliminarDelCarrito(carrito, "Pan");
    expect(nuevo.length).toBe(1);
  });

  it("debe retornar un arreglo vacío si se elimina el único producto", function () {
    const carrito = [{ nombre: "Pan" }];
    const nuevo = window.CarritoLogic.eliminarDelCarrito(carrito, "Pan");
    expect(nuevo.length).toBe(0);
  });

  // ---- actualizarCantidad ----
  it("debe actualizar la cantidad correctamente", function () {
    const carrito = [{ nombre: "Pan", cantidad: 1 }];
    const nuevo = window.CarritoLogic.actualizarCantidad(carrito, "Pan", 3);
    expect(nuevo[0].cantidad).toBe(3);
  });

  it("debe eliminar el producto si la cantidad es 0", function () {
    const carrito = [{ nombre: "Pan", cantidad: 1 }];
    const nuevo = window.CarritoLogic.actualizarCantidad(carrito, "Pan", 0);
    expect(nuevo.length).toBe(0);
  });

  it("no debe modificar otros productos", function () {
    const carrito = [
      { nombre: "Pan", cantidad: 1 },
      { nombre: "Leche", cantidad: 2 }
    ];
    const nuevo = window.CarritoLogic.actualizarCantidad(carrito, "Pan", 5);
    expect(nuevo[1].nombre).toBe("Leche");
  });

  // ---- vaciarCarrito ----
  it("debe retornar un arreglo vacío", function () {
    const resultado = window.CarritoLogic.vaciarCarrito();
    expect(Array.isArray(resultado)).toBeTrue();
    expect(resultado.length).toBe(0);
  });

  // ---- calcularTotales ----
  it("debe calcular totales correctamente", function () {
    const carrito = [
      { precio: 1000, cantidad: 2 },
      { precio: 500, cantidad: 1 }
    ];
    const res = window.CarritoLogic.calcularTotales(carrito, 0.1);
    expect(res.totalProductos).toBe(3);
    expect(res.montoSubtotal).toBe(2500);
    expect(res.montoDescuento).toBe(250);
    expect(res.montoTotal).toBe(2250);
  });

  it("debe manejar carrito vacío sin error", function () {
    const res = window.CarritoLogic.calcularTotales([], 0.1);
    expect(res.montoSubtotal).toBe(0);
    expect(res.totalProductos).toBe(0);
  });

  it("debe aplicar descuento 0 si es NaN", function () {
    const carrito = [{ precio: 1000, cantidad: 1 }];
    const res = window.CarritoLogic.calcularTotales(carrito, null);
    expect(res.montoDescuento).toBe(0);
  });

});
