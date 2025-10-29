window.CarritoLogic = {

  // Agregar un producto al carrito
  // Si el producto ya existe, aumenta su cantidad; si no, lo agrega.
  agregarAlCarrito: function (carrito, id, nombre, precio, img) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
      return carrito.map(item =>
        item.nombre === nombre
          ? { ...item, cantidad: item.cantidad + 1, precio: precio }
          : item
      );
    } else {
      return [
        ...carrito,
        { id, nombre, precio, img, cantidad: 1 }
      ];
    }
  },

  // Eliminar un producto por nombre
  eliminarDelCarrito: function (carrito, nombre) {
    return carrito.filter(item => item.nombre !== nombre);
  },

  // Actualizar cantidad de un producto
  // Si la nueva cantidad <= 0, lo elimina del carrito.
  actualizarCantidad: function (carrito, nombre, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
      return window.CarritoLogic.eliminarDelCarrito(carrito, nombre);
    }
    return carrito.map(item =>
      item.nombre === nombre
        ? { ...item, cantidad: nuevaCantidad }
        : item
    );
  },

  // Vaciar todo el carrito
  vaciarCarrito: function () {
    return [];
  },

  // Calcular totales (subtotal, descuento, total y cantidad total)
  calcularTotales: function (carrito, descuentoAplicado) {
    const totalProductos = carrito.reduce((total, item) => total + (Number(item.cantidad) || 0), 0);
    const montoSubtotal = carrito.reduce((total, item) => total + ((Number(item.precio) || 0) * (Number(item.cantidad) || 0)), 0);
    const descuentoReal = Number(descuentoAplicado) || 0;
    const montoDescuento = montoSubtotal * descuentoReal;
    const montoTotal = montoSubtotal - montoDescuento;
    return { totalProductos, montoSubtotal, montoDescuento, montoTotal };
  }

};
