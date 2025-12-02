import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api'; 
import { useAuth } from '../context/AuthContext'; 
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

  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('carritoCompras', JSON.stringify(carrito));
  }, [carrito]);
  useEffect(() => {
    const limpiar = () => setCarrito([]);
    window.addEventListener("carrito-limpiar", limpiar);

    return () => window.removeEventListener("carrito-limpiar", limpiar);
  }, []);


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
    localStorage.removeItem('carritoCompras');
  };


  const calcularEdad = (fechaNac) => {
    if (!fechaNac) return 0;
    const hoy = new Date();
    const cumple = new Date(fechaNac);
    let edad = hoy.getFullYear() - cumple.getFullYear();
    const m = hoy.getMonth() - cumple.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
        edad--;
    }
    return edad;
  };

  const edadUsuario = user ? calcularEdad(user.fechaNac) : 0;
  const tieneDescuentoEdad = edadUsuario >= 50; 

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const montoSubtotal = carrito.reduce((acc, item) => {
  const precioFinal = item.precioOferta ?? item.precio;
  return acc + (precioFinal * item.cantidad);
}, 0);


  const montoDescuento = tieneDescuentoEdad ? Math.round(montoSubtotal * 0.5) : 0;
  const montoTotal = montoSubtotal - montoDescuento;

  const procesarCompraBackend = async () => {
    if (carrito.length === 0) return { exito: false, msg: "El carrito está vacío" };

    try {
        const ordenResponse = await api.post('/api/ordenes', {
            estado: "PENDIENTE",
            total: montoTotal
        });

        const idOrdenGenerada = ordenResponse.data.id;

        const promesasDetalle = carrito.map(item => {
            return api.post('/api/detalle_orden', {
                orden: { id: idOrdenGenerada },
                producto: { id: item.id },
                cantidad: item.cantidad,
                precio: item.precio 
            });
        });

        await Promise.all(promesasDetalle);

        vaciarCarrito();
        return { exito: true, idOrden: idOrdenGenerada };

    } catch (error) {
        console.error("Error procesando compra:", error);
        return { exito: false, msg: "Error al procesar el pedido. Intente nuevamente." };
    }
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
    tieneDescuentoEdad, 
    procesarCompraBackend 
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoProvider;