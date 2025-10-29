import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import '../utils/CarritoContext.logic.js'; 


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
  setCarrito(prevCarrito =>
    window.CarritoLogic.agregarAlCarrito(prevCarrito, id, nombre, precio, img)
  );
};

const eliminarDelCarrito = (nombre) => {
  setCarrito(prevCarrito =>
    window.CarritoLogic.eliminarDelCarrito(prevCarrito, nombre)
  );
};

const actualizarCantidad = (nombre, nuevaCantidad) => {
  setCarrito(prevCarrito =>
    window.CarritoLogic.actualizarCantidad(prevCarrito, nombre, nuevaCantidad)
  );
};

const vaciarCarrito = () => {
  setCarrito(window.CarritoLogic.vaciarCarrito());
};


  const { totalProductos, montoSubtotal, montoDescuento, montoTotal } =
  window.CarritoLogic.calcularTotales(carrito, descuentoAplicado);


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