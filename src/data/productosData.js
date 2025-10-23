// src/data/productosData.js

// --- IMPORTS DE IMÁGENES (Asegúrate que estas rutas sean correctas) ---
import choripan from "../assets/productos/choripan.jpg"
import completo from "../assets/productos/completo.jpg"
import anticucho from "../assets/productos/anticucho.jpg"
import pastelChoclo from "../assets/productos/pastelchoclo.jpg"
import empanada from "../assets/productos/empanada.jpg"
import choripanVeg from "../assets/productos/choripanveg.jpg"
import completoVeg from "../assets/productos/completoveg.jpg"
import empanadaVeg from "../assets/productos/empanadaveg.jpg"
import empanadaQueso from "../assets/productos/empanadaqueso.jpg"
import anticuchoVer from "../assets/productos/anticuchoverdura.jpg" // Asegúrate que el nombre de archivo coincida
import pastelChocloVeg from "../assets/productos/pastelchocloveg.jpg"
import terremoto from "../assets/productos/terremoto.jpg"
import terremotoNinos from "../assets/productos/terremotoniños.jpg" // Asegúrate que el nombre de archivo coincida
import cocaCola from "../assets/productos/coca-cola.jpg"
import agua from "../assets/productos/agua.jpg"

// --- LISTA DE PRODUCTOS (con campos de oferta añadidos) ---
export let productos = [
    // Productos SIN oferta
    { id: 1, nombre: "Choripán", precio: 3000, img: choripan, detalle: "/Choripan", categoria: "Plato con Carne", stock: 50, enOferta: false },
    { id: 2, nombre: "Completo Italiano", precio: 3500, img: completo, detalle: "/Completo", categoria: "Plato con Carne", stock: 40, enOferta: false },
    { id: 3, nombre: "Anticucho", precio: 10000, img: anticucho, detalle: "/Anticucho", categoria: "Plato con Carne", stock: 15, enOferta: false },
    { id: 4, nombre: "Pastel de Choclo", precio: 17000, img: pastelChoclo, detalle: "/PastelChoclo", categoria: "Plato con Carne", stock: 10, enOferta: false },
    { id: 6, nombre: "Choripán Vegano", precio: 3000, img: choripanVeg, detalle: "/ChoripanVegano", categoria: "Plato sin carne", stock: 20, enOferta: false },
    { id: 7, nombre: "Completo Italiano Vegano", precio: 3500, img: completoVeg, detalle: "/CompletoVegano", categoria: "Plato sin carne", stock: 18, enOferta: false },
    { id: 8, nombre: "Empanada Vegana", precio: 5000, img: empanadaVeg, detalle: "/EmpanadaVegana", categoria: "Plato sin carne", stock: 12, enOferta: false },
    { id: 9, nombre: "Empanada de Queso", precio: 5000, img: empanadaQueso, detalle: "/EmpanadaQueso", categoria: "Plato sin carne", stock: 25, enOferta: false },
    { id: 10, nombre: "Anticucho de Verduras", precio: 8000, img: anticuchoVer, detalle: "/AnticuchoVerdura", categoria: "Plato sin carne", stock: 8, enOferta: false },
    { id: 11, nombre: "Pastel de Choclo Vegano", precio: 17000, img: pastelChocloVeg, detalle: "/PastelChocloVegano", categoria: "Plato sin carne", stock: 5, enOferta: false },
    { id: 13, nombre: "Terremoto para Niños", precio: 3000, img: terremotoNinos, detalle: "/TerremotoNinos", categoria: "Bebestible", stock: 80, enOferta: false },
    { id: 14, nombre: "Bebida Coca Cola", precio: 2500, img: cocaCola, detalle: "/CocaCola", categoria: "Bebestible", stock: 200, enOferta: false },
    { id: 15, nombre: "Agua", precio: 1800, img: agua, detalle: "/Agua", categoria: "Bebestible", stock: 150, enOferta: false },

    // Productos CON oferta
    {
      id: 5, // ID coincide con el producto original
      nombre: "Empanada de Pino",
      precio: 5000, // Precio original
      img: empanada,
      detalle: "/Empanada",
      categoria: "Plato con Carne",
      stock: 30,
      enOferta: true,     // Marcado como oferta
      precioOferta: 4000  // Nuevo precio
    },
    {
      id: 12, // ID coincide con el producto original
      nombre: "Terremoto",
      precio: 3500, // Precio original
      img: terremoto,
      detalle: "/Terremoto",
      categoria: "Bebestible",
      stock: 100,
      enOferta: true,     // Marcado como oferta
      precioOferta: 3000  // Nuevo precio
    },
];

// --- FUNCIONES CRUD DE PRODUCTOS (Se mantienen igual que tu archivo) ---
export const agregarProducto = (nuevoProducto) => {
    const newId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const productoConId = {
        ...nuevoProducto,
        id: newId,
        precio: Number(nuevoProducto.precio) || 0,
        stock: Number(nuevoProducto.stock) || 0,
        enOferta: nuevoProducto.enOferta || false // Asegura que tenga valor
    };
    productos.push(productoConId);
    return productoConId;
};
export const obtenerProductos = () => [...productos];
export const obtenerProducto = (id) => {
    return productos.find(p => p.id === Number(id));
}
export const actualizarProducto = (id, datosActualizados) => {
    let productoActualizado = null;
    productos = productos.map((p) => {
        if (p.id === Number(id)) {
            productoActualizado = {
                ...p,
                ...datosActualizados,
                precio: Number(datosActualizados.precio) || p.precio,
                stock: Number(datosActualizados.stock) || p.stock,
                enOferta: datosActualizados.enOferta !== undefined ? datosActualizados.enOferta : p.enOferta,
                precioOferta: Number(datosActualizados.precioOferta) || p.precioOferta
            };
            return productoActualizado;
        }
        return p;
    });
    return productoActualizado;
};
export const eliminarProducto = (id) => {
    productos = productos.filter((p) => p.id !== Number(id));
    return productos;
};

// --- FUNCIONES AUXILIARES (Se mantienen igual) ---
export const obtenerProductosCriticos = (umbral = 10) => {
    return productos.filter(p => p.stock <= umbral);
};
export const obtenerCategorias = () => {
    const categorias = productos.map(p => p.categoria);
    return [...new Set(categorias)].sort();
};

// --- FUNCIÓN PARA OBTENER OFERTAS ---
export const obtenerProductosEnOferta = () => {
    return obtenerProductos().filter(p => p.enOferta === true);
};