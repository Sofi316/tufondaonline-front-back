
import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return contsext;
};

export const CarritoProvider = ({ children }) => {
  const carritoInicial = JSON.parse(localStorage.getItem('carrito')) || [];
  const [carrito, setCarrito] = useState(carritoInicial);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (id, nombre, precio, img) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.nombre === nombre);

      if (productoExistente) {
        // --- LÍNEA CORREGIDA ---
        // Si existe, incrementa cantidad Y ACTUALIZA EL PRECIO
        return prevCarrito.map(item =>
          item.nombre === nombre
            ? { ...item, cantidad: item.cantidad + 1, precio: precio } // <-- Precio actualizado
            : item
        );
      } else {
        // Si no existe, lo añade (guardando el ID y el precio recibido)
        return [...prevCarrito, {
          id,
          nombre,
          precio, // Guarda el precio (sea normal u oferta)
          img,
          cantidad: 1
        }];
      }
    });
  };

  // --- SIN CAMBIOS (usa nombre) ---
  const eliminarDelCarrito = (nombre) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.nombre !== nombre));
  };

  // --- SIN CAMBIOS (usa nombre) ---
  const actualizarCantidad = (nombre, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(nombre);
    } else {
      setCarrito(prevCarrito =>
        prevCarrito.map(item =>
          item.nombre === nombre
            ? { ...item, cantidad: nuevaCantidad }
            : item
        )
      );
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
  const montoTotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  const valor = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalProductos,
    montoTotal
  };

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
};