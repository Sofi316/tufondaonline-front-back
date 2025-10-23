import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (nombre, precio, img) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.nombre === nombre);
      
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.nombre === nombre
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { 
          nombre, 
          precio, 
          img, 
          cantidad: 1 
        }];
      }
    });
  };

  const eliminarDelCarrito = (nombre) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.nombre !== nombre));
  };

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

  const valor = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalProductos
  };

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
};