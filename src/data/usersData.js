// src/data/usersData.js

// 1. IMPORTAMOS LOS PRODUCTOS REALES DESDE SU ARCHIVO
import { productos as allProducts } from './productosData.js'; // Asegúrate que la ruta './productosData.js' es correcta


// --- 2. DATOS DE USUARIOS (CRUD COMPLETO) ---

const USERS_DEFAULT = [
  {
    id: 1, email: 'admin@fonda.cl', password: 'admin123', nombre: 'Admin Fonda',
    role: 'administrador', rut: '1-9', region: 'Región Metropolitana', comuna: 'Santiago',
    activo: true, fechaRegistro: '2024-01-01'
  },
  {
    id: 2, email: 'sofia@duoc.cl', password: 'sofia123', nombre: 'Sofía Homazábal',
    role: 'cliente', rut: '2-7', region: 'Región de Valparaíso', comuna: 'Viña del Mar',
    activo: true, fechaRegistro: '2024-02-01'
  },
  {
    id: 3, email: 'romina@duoc.cl', password: 'romina123', nombre: 'Romina Hormazábal',
    role: 'cliente', rut: '3-5', region: 'Región del Biobío', comuna: 'Concepción',
    activo: true, fechaRegistro: '2024-03-01'
  },
  {
    id: 4, email: 'fabian@duoc.cl', password: 'fabian123', nombre: 'Fabián Sanhueza',
    role: 'cliente', rut: '4-3', region: 'Región de La Araucanía', comuna: 'Temuco',
    activo: false, fechaRegistro: '2024-04-01'
  },
];

// Cargamos usuarios desde localStorage o usamos la lista por defecto
let users = JSON.parse(localStorage.getItem('fondaUsers')) || USERS_DEFAULT;

// Función interna para guardar usuarios en localStorage
function saveUsers() {
    localStorage.setItem('fondaUsers', JSON.stringify(users));
}

// --- TU FUNCIÓN DE LOGIN (Se mantiene) ---
export const loginUser = (email, password) => {
  const user = users.find(u => u.email === email);
  if (user && user.password === password) {
    return { id: user.id, email: user.email, nombre: user.nombre, role: user.role };
  }
  return null;
};

// --- FUNCIONES CRUD DE USUARIOS (Requeridas por la rúbrica) ---

// LEER (Todos)
export function getUsuarios() {
    return [...users]; // Devuelve una copia para evitar mutaciones accidentales
}

// LEER (Uno por ID)
export function getUsuario(id) {
    return users.find(u => u.id === Number(id));
}

// CREAR
export function createUsuario(data) {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
        id: newId,
        email: data.email,
        password: data.contraseña,
        nombre: `${data.nombre} ${data.apellidos}`,
        role: data.tipo,
        rut: data.rut,
        region: data.region,
        comuna: data.comuna,
        fechaNac: data.fechaNac,
        direccion: data.direccion,
        activo: true,
        fechaRegistro: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    saveUsers();
    console.log("Usuario creado:", newUser);
    console.log("Lista de usuarios actualizada:", users);
    return newUser;
}

// ACTUALIZAR
export function updateUsuario(id, updatedData) {
    const index = users.findIndex(u => u.id === Number(id));
    if (index !== -1) {
        // Asegura que 'activo' sea booleano
        if (updatedData.activo !== undefined) {
           updatedData.activo = updatedData.activo === 'true' || updatedData.activo === true;
        }
        users[index] = { ...users[index], ...updatedData };
        saveUsers();
        return users[index];
    }
    return null;
}

// ELIMINAR
export function deleteUsuario(id) {
    const index = users.findIndex(u => u.id === Number(id));
    if (index !== -1) {
        users = users.filter(u => u.id !== Number(id));
        saveUsers();
        return true;
    }
    return false;
}


// --- 3. DATOS DE ÓRDENES (Corregido y Completo) ---

// Orden 1: 1x Choripan (3000) + 4x Completo (14000) + 1x Anticucho (10000) = 27000
// Orden 2: 4x Choripan (12000) = 12000
const ORDENES_DEFAULT = [
  {
    id: 20240705, userId: 2, clienteNombre: "Sofía Homazábal", clienteEmail: "sofia@duoc.cl",
    fecha: "2025-10-20", estado: "Completado", total: 27000,
    direccion: "Av. Siempre Viva 123, Springfield", region: "Región Metropolitana", comuna: "Santiago",
    items: [ { productId: 1, cantidad: 1 }, { productId: 2, cantidad: 4 }, { productId: 3, cantidad: 1 } ]
  },
  {
    id: 20240706, userId: 3, clienteNombre: "Romina Hormazábal", clienteEmail: "romina@duoc.cl",
    fecha: "2025-10-21", estado: "Procesando", total: 12000,
    direccion: "Calle Falsa 456, Santiago", region: "Región Metropolitana", comuna: "Maipú",
    items: [ { productId: 1, cantidad: 4 } ]
  }
];

// Cargamos órdenes desde localStorage o usamos la lista por defecto
let ordenes = JSON.parse(localStorage.getItem('fondaOrdenes')) || ORDENES_DEFAULT;

// Función interna para guardar órdenes en localStorage
function saveOrdenes() {
  localStorage.setItem('fondaOrdenes', JSON.stringify(ordenes));
}

// --- FUNCIONES CRUD (Read) para Órdenes ---

// LEER (Todas)
export function getOrdenes() {
  return [...ordenes]; // Devuelve una copia
}

// LEER (Una por ID, con productos populados)
export function getOrden(id) {
  const orden = ordenes.find(o => o.id === Number(id));
  if (!orden) return null;

  // "POPULAMOS" LOS ITEMS DE LA ORDEN
  const populatedItems = orden.items.map(item => {
    // Buscamos el producto completo en nuestra lista importada
    const producto = allProducts.find(p => p.id === item.productId);
    // Devolvemos un objeto fusionado con detalles del producto + cantidad
    return {
      ...producto, // Trae {id, nombre, precio, img, ...}
      cantidad: item.cantidad // Añade la cantidad
    };
  }).filter(item => item.id); // Filtra por si algún producto no fue encontrado

  // Devolvemos la orden completa con los items "populados"
  return { ...orden, items: populatedItems };
}