import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carritoCompras');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error("Error leyendo carrito del storage", error);
      return [];
    }
  });

  const [montoDescuento, setMontoDescuento] = useState(0);

  useEffect(() => {
    localStorage.setItem('carritoCompras', JSON.stringify(carrito));
  }, [carrito]);

  // --- FUNCIONES DEL CARRITO ---

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);

      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
      
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (idProducto) => {

    setCarrito((prev) => prev.filter((item) => item.id !== idProducto));
  };

  const actualizarCantidad = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad < 1) return; 
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === idProducto ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setMontoDescuento(0); 
    localStorage.removeItem('carritoCompras');
  };

  // --- CÁLCULOS ---
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const montoSubtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const montoTotal = montoSubtotal - montoDescuento;

  const aplicarDescuentoValor = (valor) => {
    setMontoDescuento(valor);
  };

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    cantidadTotal,
    montoSubtotal,
    montoDescuento,
    montoTotal,
    aplicarDescuentoValor
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoContext;