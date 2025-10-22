import React from "react";
import choripan from "../assets/productos/choripan.jpg"
import completo from "../assets/productos/completo.jpg"
import anticucho from "../assets/productos/anticucho.jpg"
import pastelChoclo from "../assets/productos/pastelchoclo.jpg"
import empanada from "../assets/productos/empanada.jpg"
import choripanVeg from "../assets/productos/choripanveg.jpg"
import completoVeg from "../assets/productos/completoveg.jpg"
import empanadaVeg from "../assets/productos/empanadaveg.jpg"
import empanadaQueso from "../assets/productos/empanadaqueso.jpg"
import anticuchoVer from "../assets/productos/anticuchoverdura.jpg"
import pastelChocloVeg from "../assets/productos/pastelchocloveg.jpg"
import terremoto from "../assets/productos/terremoto.jpg"
import terremotoNinos from "../assets/productos/terremotoniños.jpg"
import cocaCola from "../assets/productos/coca-cola.jpg"
import agua from "../assets/productos/agua.jpg"

export const productos = [
    { nombre: "Choripán", precio: 3000, img: choripan, detalle: "/Choripan", categoria: "Plato con Carne" },
    { nombre: "Completo Italiano", precio: 3500, img: completo, detalle: "/Completo", categoria: "Plato con Carne" },
    { nombre: "Anticucho", precio: 10000, img: anticucho, detalle: "/Anticucho", categoria: "Plato con Carne" },
    { nombre: "Pastel de Choclo", precio: 17000, img: pastelChoclo, detalle: "/PastelChoclo", categoria: "Plato con Carne" },
    { nombre: "Empanada de Pino", precio: 5000, img: empanada, detalle: "/Empanada", categoria: "Plato con Carne" },
    { nombre: "Choripán Vegano", precio: 3000, img: choripanVeg, detalle: "/ChoripanVegano", categoria: "Plato sin carne" },
    { nombre: "Completo Italiano Vegano", precio: 3500, img: completoVeg, detalle: "/CompletoVegano", categoria: "Plato sin carne" },
    { nombre: "Empanada Vegana", precio: 5000, img: empanadaVeg, detalle: "/EmpanadaVegana", categoria: "Plato sin carne" },
    { nombre: "Empanada de Queso", precio: 5000, img: empanadaQueso, detalle: "/EmpanadaQueso", categoria: "Plato sin carne" },
    { nombre: "Anticucho de Verduras", precio: 8000, img: anticuchoVer, detalle: "/AnticuchoVerdura", categoria: "Plato sin carne" },
    { nombre: "Pastel de Choclo Vegano", precio: 17000, img: pastelChocloVeg, detalle: "/PastelChocloVegano", categoria: "Plato sin carne" },
    { nombre: "Terremoto", precio: 3500, img: terremoto, detalle: "/Terremoto", categoria: "Bebestible" },
    { nombre: "Terremoto para Niños", precio: 3000, img: terremotoNinos, detalle: "/TerremotoNinos", categoria: "Bebestible" },
    { nombre: "Bebida Coca Cola", precio: 2500, img: cocaCola, detalle: "/CocaCola", categoria: "Bebestible" },
    { nombre: "Agua", precio: 1800, img: agua, detalle: "/Agua", categoria: "Bebestible" },
  ];

  // Crear
export const agregarProducto = (nuevoProducto) => {
    const id = productos.length ? productos[productos.length - 1].id + 1 : 1;
    productos.push({ id, ...nuevoProducto });
    return productos;
  };
  
  // Leer
  export const obtenerProductos = () => [...productos];
  
  // Actualizar
  export const actualizarProducto = (id, datosActualizados) => {
    productos = productos.map((p) => (p.id === id ? { ...p, ...datosActualizados } : p));
    return productos.find((p) => p.id === id);
  };
  
  // Eliminar
  export const eliminarProducto = (id) => {
    productos = productos.filter((p) => p.id !== id);
    return productos;
  };