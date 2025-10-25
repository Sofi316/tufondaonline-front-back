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
  // Carga inicial del carrito desde localStorage
  const carritoInicial = JSON.parse(localStorage.getItem('carrito')) || [];
  const [carrito, setCarrito] = useState(carritoInicial);
  // Obtiene el porcentaje de descuento del AuthContext
  const { descuentoAplicado } = useAuth(); 

  // Guarda el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar al carrito
  const agregarAlCarrito = (id, nombre, precio, img) => {
    setCarrito(prevCarrito => {
      // Busca si el producto ya está por nombre 
      const productoExistente = prevCarrito.find(item => item.nombre === nombre);

      if (productoExistente) {
        // Si existe, incrementa cantidad Y ACTUALIZA EL PRECIO 
        return prevCarrito.map(item =>
          item.nombre === nombre
            ? { ...item, cantidad: item.cantidad + 1, precio: precio } 
            : item
        );
      } else {
        // Si no existe, lo añade guardando todos los datos recibidos
        return [...prevCarrito, {
          id, // Guarda el ID
          nombre,
          precio, // Guarda el precio 
          img,
          cantidad: 1
        }];
      }
    });
  };

  // Función para eliminar del carrito
  const eliminarDelCarrito = (nombre) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.nombre !== nombre));
  };

  // Función para actualizar cantidad
  const actualizarCantidad = (nombre, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(nombre); // Elimina si la cantidad es 0 o menos
    } else {
      // Actualiza la cantidad del item específico
      setCarrito(prevCarrito =>
        prevCarrito.map(item =>
          item.nombre === nombre
            ? { ...item, cantidad: nuevaCantidad }
            : item
        )
      );
    }
  };

  // Función para vaciar completamente el carrito
  const vaciarCarrito = () => {
    setCarrito([]); // Setea el carrito a un array vacío
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