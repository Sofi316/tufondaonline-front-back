// src/components/CarritoContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Asegúrate que la ruta sea correcta

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
  const { descuentoAplicado } = useAuth(); // Obtiene 0 o 0.10 (por ejemplo)

  // Guarda el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar al carrito (modificada para actualizar precio si ya existe)
  const agregarAlCarrito = (id, nombre, precio, img) => {
    setCarrito(prevCarrito => {
      // Busca si el producto ya está por nombre (como en tu original)
      const productoExistente = prevCarrito.find(item => item.nombre === nombre);

      if (productoExistente) {
        // Si existe, incrementa cantidad Y ACTUALIZA EL PRECIO (por si se agrega desde ofertas)
        return prevCarrito.map(item =>
          item.nombre === nombre
            ? { ...item, cantidad: item.cantidad + 1, precio: precio } // <-- Precio actualizado
            : item
        );
      } else {
        // Si no existe, lo añade guardando todos los datos recibidos
        return [...prevCarrito, {
          id, // Guarda el ID
          nombre,
          precio, // Guarda el precio (puede ser normal u oferta)
          img,
          cantidad: 1
        }];
      }
    });
  };

  // Función para eliminar del carrito (usa nombre)
  const eliminarDelCarrito = (nombre) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.nombre !== nombre));
  };

  // Función para actualizar cantidad (usa nombre)
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

  // --- CÁLCULOS DE TOTALES (Más Seguros) ---
  // Calcula el total de productos (número de items)
  const totalProductos = carrito.reduce((total, item) => total + (Number(item.cantidad) || 0), 0);

  // Calcula el SUBTOTAL (asegura que item.precio y item.cantidad sean números)
  const montoSubtotal = carrito.reduce((total, item) => total + ((Number(item.precio) || 0) * (Number(item.cantidad) || 0)), 0);

  // Calcula el MONTO DEL DESCUENTO (asegura que descuentoAplicado sea número)
  const descuentoReal = Number(descuentoAplicado) || 0;
  const montoDescuento = montoSubtotal * descuentoReal;

  // Calcula el TOTAL FINAL
  const montoTotal = montoSubtotal - montoDescuento;
  // ------------------------------------

  // Valores que se expondrán a través del contexto
  const valor = {
    carrito,            // Array de items en el carrito
    agregarAlCarrito,   // Función para agregar
    eliminarDelCarrito, // Función para eliminar
    actualizarCantidad, // Función para cambiar cantidad
    vaciarCarrito,      // Función para vaciar todo
    totalProductos,     // Número total de items
    montoSubtotal,      // Costo total antes de descuentos
    montoDescuento,     // Monto exacto que se descuenta
    montoTotal          // Monto final a pagar
  };

  // Retorna el Provider con los valores calculados
  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
};