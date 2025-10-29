import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const carritoInicial = JSON.parse(localStorage.getItem('carrito')) || [];
  const [carrito, setCarrito] = useState(carritoInicial);
  const { descuentoAplicado } = useAuth(); 

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (id, nombre, precio, img) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.nombre === nombre);

      if (productoExistente) {
        return prevCarrito.map(item =>
          item.nombre === nombre
            ? { ...item, cantidad: item.cantidad + 1, precio: precio } 
            : item
        );
      } else {
        return [...prevCarrito, {
          id, 
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


  const totalProductos = carrito.reduce((total, item) => total + (Number(item.cantidad) || 0), 0);
  const montoSubtotal = carrito.reduce((total, item) => total + ((Number(item.precio) || 0) * (Number(item.cantidad) || 0)), 0);
  const descuentoReal = Number(descuentoAplicado) || 0;
  const montoDescuento = montoSubtotal * descuentoReal;
  const montoTotal = montoSubtotal - montoDescuento;

  const valor = {
    carrito,            
    agregarAlCarrito,   
    eliminarDelCarrito, 
    actualizarCantidad, 
    vaciarCarrito,      
    totalProductos,     
    montoSubtotal,      
    montoDescuento,     
    montoTotal          
  };
  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
};