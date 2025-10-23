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

// 1. CAMBIADO A 'let' Y AÑADIDOS IDs Y STOCK
export let productos = [
    { id: 1, nombre: "Choripán", precio: 3000, img: choripan, detalle: "/choripan", categoria: "Plato con Carne", stock: 50 },
    { id: 2, nombre: "Completo Italiano", precio: 3500, img: completo, detalle: "/completo", categoria: "Plato con Carne", stock: 40 },
    { id: 3, nombre: "Anticucho", precio: 10000, img: anticucho, detalle: "/anticucho", categoria: "Plato con Carne", stock: 15 },
    { id: 4, nombre: "Pastel de Choclo", precio: 17000, img: pastelChoclo, detalle: "/pastelchoclo", categoria: "Plato con Carne", stock: 10 }, // Stock al límite
    { id: 5, nombre: "Empanada de Pino", precio: 5000, img: empanada, detalle: "/empanada", categoria: "Plato con Carne", stock: 30 },
    { id: 6, nombre: "Choripán Vegano", precio: 3000, img: choripanVeg, detalle: "/choripanvegano", categoria: "Plato sin carne", stock: 20 },
    { id: 7, nombre: "Completo Italiano Vegano", precio: 3500, img: completoVeg, detalle: "/completovegano", categoria: "Plato sin carne", stock: 18 },
    { id: 8, nombre: "Empanada Vegana", precio: 5000, img: empanadaVeg, detalle: "/empanadavegana", categoria: "Plato sin carne", stock: 12 },
    { id: 9, nombre: "Empanada de Queso", precio: 5000, img: empanadaQueso, detalle: "/empanadaqueso", categoria: "Plato sin carne", stock: 25 },
    { id: 10, nombre: "Anticucho de Verduras", precio: 8000, img: anticuchoVer, detalle: "/anticuchoverdura", categoria: "Plato sin carne", stock: 8 }, // Crítico
    { id: 11, nombre: "Pastel de Choclo Vegano", precio: 17000, img: pastelChocloVeg, detalle: "/pastelchoclovegano", categoria: "Plato sin carne", stock: 5 }, // Crítico
    { id: 12, nombre: "Terremoto", precio: 3500, img: terremoto, detalle: "/terremoto", categoria: "Bebestible", stock: 100 },
    { id: 13, nombre: "Terremoto para Niños", precio: 3000, img: terremotoNinos, detalle: "/terremotoninos", categoria: "Bebestible", stock: 80 },
    { id: 14, nombre: "Bebida Coca Cola", precio: 2500, img: cocaCola, detalle: "/cocacola", categoria: "Bebestible", stock: 200 },
    { id: 15, nombre: "Agua", precio: 1800, img: agua, detalle: "/agua", categoria: "Bebestible", stock: 150 },
  ];

// --- FUNCIONES CRUD DE PRODUCTOS ---

// Crear
export const agregarProducto = (nuevoProducto) => {
    const newId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const productoConId = {
        ...nuevoProducto,
        id: newId,
        precio: Number(nuevoProducto.precio) || 0, // Asegura que sea número
        stock: Number(nuevoProducto.stock) || 0 // Asegura que sea número
    };
    productos.push(productoConId);
    // Nota: Aquí podrías guardar 'productos' en localStorage para persistencia
    return productoConId;
};

// Leer (Todos)
export const obtenerProductos = () => [...productos]; // Devuelve copia

// Leer (Uno por ID)
export const obtenerProducto = (id) => {
    return productos.find(p => p.id === Number(id));
}

// Actualizar
export const actualizarProducto = (id, datosActualizados) => {
    let productoActualizado = null;
    productos = productos.map((p) => {
        if (p.id === Number(id)) {
            productoActualizado = {
                ...p,
                ...datosActualizados,
                precio: Number(datosActualizados.precio) || p.precio, // Asegura número
                stock: Number(datosActualizados.stock) || p.stock // Asegura número
            };
            return productoActualizado;
        }
        return p;
    });
    // Nota: Aquí podrías guardar 'productos' en localStorage
    return productoActualizado;
};

// Eliminar
export const eliminarProducto = (id) => {
    productos = productos.filter((p) => p.id !== Number(id));
    // Nota: Aquí podrías guardar 'productos' en localStorage
    return productos;
};

// --- FUNCIÓN PARA PRODUCTOS CRÍTICOS ---
export const obtenerProductosCriticos = (umbral = 10) => {
    return productos.filter(p => p.stock <= umbral);
};

// --- FUNCIÓN PARA OBTENER CATEGORÍAS ---
export const obtenerCategorias = () => {
    const categorias = productos.map(p => p.categoria);
    return [...new Set(categorias)].sort(); // Devuelve categorías únicas y ordenadas
};