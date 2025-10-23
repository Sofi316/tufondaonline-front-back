// src/data/productosData.js

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

// CAMBIADO A 'let' Y AÑADIDOS IDs ÚNICOS
export let productos = [
    { id: 1, nombre: "Choripán", precio: 3000, img: choripan, detalle: "/choripan", categoria: "Plato con Carne" },
    { id: 2, nombre: "Completo Italiano", precio: 3500, img: completo, detalle: "/completo", categoria: "Plato con Carne" },
    { id: 3, nombre: "Anticucho", precio: 10000, img: anticucho, detalle: "/anticucho", categoria: "Plato con Carne" },
    { id: 4, nombre: "Pastel de Choclo", precio: 17000, img: pastelChoclo, detalle: "/pastelchoclo", categoria: "Plato con Carne" },
    { id: 5, nombre: "Empanada de Pino", precio: 5000, img: empanada, detalle: "/empanada", categoria: "Plato con Carne" },
    { id: 6, nombre: "Choripán Vegano", precio: 3000, img: choripanVeg, detalle: "/choripanvegano", categoria: "Plato sin carne" },
    { id: 7, nombre: "Completo Italiano Vegano", precio: 3500, img: completoVeg, detalle: "/completovegano", categoria: "Plato sin carne" },
    { id: 8, nombre: "Empanada Vegana", precio: 5000, img: empanadaVeg, detalle: "/empanadavegana", categoria: "Plato sin carne" },
    { id: 9, nombre: "Empanada de Queso", precio: 5000, img: empanadaQueso, detalle: "/empanadaqueso", categoria: "Plato sin carne" },
    { id: 10, nombre: "Anticucho de Verduras", precio: 8000, img: anticuchoVer, detalle: "/anticuchoverdura", categoria: "Plato sin carne" },
    { id: 11, nombre: "Pastel de Choclo Vegano", precio: 17000, img: pastelChocloVeg, detalle: "/pastelchoclovegano", categoria: "Plato sin carne" },
    { id: 12, nombre: "Terremoto", precio: 3500, img: terremoto, detalle: "/terremoto", categoria: "Bebestible" },
    { id: 13, nombre: "Terremoto para Niños", precio: 3000, img: terremotoNinos, detalle: "/terremotoninos", categoria: "Bebestible" },
    { id: 14, nombre: "Bebida Coca Cola", precio: 2500, img: cocaCola, detalle: "/cocacola", categoria: "Bebestible" },
    { id: 15, nombre: "Agua", precio: 1800, img: agua, detalle: "/agua", categoria: "Bebestible" },
  ];

// --- FUNCIONES CRUD DE PRODUCTOS ---

// Crear
export const agregarProducto = (nuevoProducto) => {
    const newId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const productoConId = { ...nuevoProducto, id: newId };
    productos.push(productoConId);
    return productoConId;
};

// Leer (Todos)
export const obtenerProductos = () => [...productos];

// Leer (Uno)
export const obtenerProducto = (id) => {
    return productos.find(p => p.id === Number(id));
}

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