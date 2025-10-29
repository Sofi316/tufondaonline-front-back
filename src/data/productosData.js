 

 
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

 
export let productos = [
     
    {
        id: 1,
        nombre: "Choripán",
        precio: 3000,
        img: choripan,
        detalle: "/Choripan",  
        categoria: "Plato con Carne",
        stock: 50,
        enOferta: false,
        descripcion: "Delicioso chorizo de Chillán asado a la parrilla dentro de un crujiente pan marraqueta."
    },
    {
        id: 2,
        nombre: "Completo Italiano",
        precio: 3500,
        img: completo,
        detalle: "/Completo",  
        categoria: "Plato con Carne",
        stock: 40,
        enOferta: false,
        descripcion: "Tradicional completo chileno con vienesa, palta fresca, tomate picado y mayonesa casera."
    },
    {
        id: 3,
        nombre: "Anticucho",
        precio: 10000,
        img: anticucho,
        detalle: "/Anticucho",  
        categoria: "Plato con Carne",
        stock: 15,
        enOferta: false,
        descripcion: "Trozos jugosos de carne de vacuno, longaniza, cebolla y pimentón asados a la parrilla en brocheta."
    },
    {
        id: 4,
        nombre: "Pastel de Choclo",
        precio: 17000,
        img: pastelChoclo,
        detalle: "/PastelChoclo",  
        categoria: "Plato con Carne",
        stock: 10,
        enOferta: false,
        descripcion: "Clásico plato chileno con pino de carne, pollo, huevo duro y aceitunas, cubierto con pasta de choclo dulce."
    },
    {
        id: 6,
        nombre: "Choripán Vegano",
        precio: 3000,
        img: choripanVeg,
        detalle: "/ChoripanVegano",  
        categoria: "Plato sin carne",
        stock: 20,
        enOferta: false,
        descripcion: "Versión vegana del clásico choripán, con chorizo a base de plantas en pan marraqueta."
    },
    {
        id: 7,
        nombre: "Completo Italiano Vegano",
        precio: 3500,
        img: completoVeg,
        detalle: "/CompletoVegano",  
        categoria: "Plato sin carne",
        stock: 18,
        enOferta: false,
        descripcion: "Completo italiano 100% vegano, con salchicha vegetal, palta, tomate y mayonesa vegana."
    },
    {
        id: 8,
        nombre: "Empanada Vegana",
        precio: 5000,
        img: empanadaVeg,
        detalle: "/EmpanadaVegana",  
        categoria: "Plato sin carne",
        stock: 12,
        enOferta: false,
        descripcion: "Empanada horneada rellena de un sabroso pino de champiñones, cebolla y especias."
    },
    {
        id: 9,
        nombre: "Empanada de Queso",
        precio: 5000,
        img: empanadaQueso,
        detalle: "/EmpanadaQueso",  
        categoria: "Plato sin carne",
        stock: 25,
        enOferta: false,
        descripcion: "Empanada frita rellena de abundante queso derretido."
    },
    {
        id: 10,
        nombre: "Anticucho de Verduras",
        precio: 8000,
        img: anticuchoVer,
        detalle: "/AnticuchoVerdura",  
        categoria: "Plato sin carne",
        stock: 8,
        enOferta: false,
        descripcion: "Brocheta de verduras de temporada (pimentón, cebolla, zapallo italiano, champiñón) asadas a la parrilla."
    },
    {
        id: 11,
        nombre: "Pastel de Choclo Vegano",
        precio: 17000,
        img: pastelChocloVeg,
        detalle: "/PastelChocloVegano",  
        categoria: "Plato sin carne",
        stock: 5,
        enOferta: false,
        descripcion: "Versión vegana del pastel de choclo, con pino a base de soya texturizada y verduras, cubierto de pasta de choclo."
    },
    {
        id: 13,
        nombre: "Terremoto para Niños",
        precio: 3000,
        img: terremotoNinos,
        detalle: "/TerremotoNinos",  
        categoria: "Bebestible",
        stock: 80,
        enOferta: false,
        descripcion: "Versión sin alcohol del terremoto, preparada con helado de piña y granadina."
    },
    {
        id: 14,
        nombre: "Bebida Coca Cola",
        precio: 2500,
        img: cocaCola,
        detalle: "/CocaCola",  
        categoria: "Bebestible",
        stock: 200,
        enOferta: false,
        descripcion: "Clásica bebida Coca-Cola en formato lata o botella."
    },
    {
        id: 15,
        nombre: "Agua",
        precio: 1800,
        img: agua,
        detalle: "/Agua",  
        categoria: "Bebestible",
        stock: 150,
        enOferta: false,
        descripcion: "Agua mineral sin gas, botella de 500cc."
    },
     
    {
      id: 5,
      nombre: "Empanada de Pino",
      precio: 5000,
      img: empanada,
      detalle: "/Empanada",  
      categoria: "Plato con Carne",
      stock: 30,
      enOferta: true,
      precioOferta: 4000,
      descripcion: "Masa rellena de carne picada, cebolla, aceitunas, pasas y huevo duro."
    },
    {
      id: 12,
      nombre: "Terremoto",
      precio: 3500,
      img: terremoto,
      detalle: "/Terremoto",  
      categoria: "Bebestible",
      stock: 100,
      enOferta: true,
      precioOferta: 3000,
      descripcion: "Tradicional trago chileno con vino pipeño blanco, helado de piña y granadina."
    },
];

 
export const agregarProducto = (nuevoProducto) => {
    const newId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const productoConId = {
        ...nuevoProducto,
        id: newId,
        precio: Number(nuevoProducto.precio) || 0,
        stock: Number(nuevoProducto.stock) || 0,
        enOferta: nuevoProducto.enOferta || false,
         
        detalle: nuevoProducto.detalle || `/${nuevoProducto.nombre.replace(/\s+/g, '')}`,  
        descripcion: nuevoProducto.descripcion || "",
        categoria: nuevoProducto.categoria || "Sin categoría"
    };
    productos.push(productoConId);
    return productoConId;
};
export const obtenerProductos = () => [...productos];

 
 
export const getProductById = (id) => {
  return productos.find((p) => p.id == id);
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
                precioOferta: Number(datosActualizados.precioOferta) || p.precioOferta,
                detalle: datosActualizados.detalle || p.detalle,  
                descripcion: datosActualizados.descripcion || p.descripcion,
                categoria: datosActualizados.categoria || p.categoria
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

 
export const obtenerProductosCriticos = (umbral = 10) => {
    return productos.filter(p => p.stock <= umbral);
};
export const obtenerCategorias = () => {
    const categorias = productos.map(p => p.categoria);
    return [...new Set(categorias)].sort();
};

 
export const obtenerProductosEnOferta = () => {
    return obtenerProductos().filter(p => p.enOferta === true);
};