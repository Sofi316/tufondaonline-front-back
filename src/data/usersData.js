// src/data/usersData.js

// Importa los productos para poder "poblar" los detalles de las órdenes
import { productos as allProducts } from './productosData.js'; // Asegúrate que la ruta sea correcta

// --- DATOS Y CRUD DE USUARIOS ---

// Usuarios por defecto si localStorage está vacío
const USERS_DEFAULT = [
  {
    id: 1, email: 'admin@fonda.cl', password: 'admin123', nombre: 'Admin Fonda',
    role: 'administrador', rut: '1-9', region: 'Región Metropolitana', comuna: 'Santiago',
    direccion: 'Calle Falsa 123', activo: true, fechaRegistro: '2024-01-01', fechaNac: '1990-01-01' // Datos que ya tenías + dirección/fechaNac
  },
  {
    id: 2, email: 'sofia@duoc.cl', password: 'sofia123', nombre: 'Sofía Homazábal',
    role: 'cliente', rut: '2-7', region: 'Región de Valparaíso', comuna: 'Viña del Mar',
    direccion: 'Av. Siempre Viva 456', activo: true, fechaRegistro: '2024-02-01', fechaNac: '1995-05-10' // Datos que ya tenías + dirección/fechaNac
  },
  {
    id: 3, email: 'romina@duoc.cl', password: 'romina123', nombre: 'Romina Hormazábal',
    role: 'cliente', rut: '3-5', region: 'Región del Biobío', comuna: 'Concepción',
    direccion: 'Pasaje Inventado 789', activo: true, fechaRegistro: '2024-03-01', fechaNac: '1998-11-20' // Datos que ya tenías + dirección/fechaNac
  },
  {
    id: 4, email: 'fabian@duoc.cl', password: 'fabian123', nombre: 'Fabián Sanhueza',
    role: 'cliente', rut: '4-3', region: 'Región de La Araucanía', comuna: 'Temuco',
    direccion: 'Camino Real 101', activo: false, fechaRegistro: '2024-04-01', fechaNac: '1997-03-15' // Datos que ya tenías + dirección/fechaNac
  },
];

// Carga usuarios desde localStorage o usa los defaults
// CAMBIADO A 'let' para permitir modificaciones por deleteUsuario
let users = JSON.parse(localStorage.getItem('fondaUsers')) || USERS_DEFAULT;

// Función para guardar usuarios en localStorage
function saveUsers() {
    localStorage.setItem('fondaUsers', JSON.stringify(users));
}

// --- FUNCIÓN DE LOGIN (Unificada) ---
// Devuelve más datos para autocompletar el formulario de compra
export const loginUser = (email, password) => {
  // Usa el array 'users' (que puede venir de localStorage)
  const user = users.find(u => u.email === email);
  if (user && user.password === password) {
    // Devuelve los datos necesarios
    return {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      role: user.role,
      direccion: user.direccion, // Para autocompletar
      comuna: user.comuna,       // Para autocompletar
      region: user.region        // Para autocompletar
    };
  }
  return null; // Falla el login
};

// --- FUNCIONES CRUD DE USUARIOS (Unificadas y Exportadas) ---

// Leer Todos los Usuarios
export function getUsuarios() {
    return [...users]; // Devuelve una copia para evitar mutaciones accidentales
}

// Leer Un Usuario por ID
export function getUsuario(id) {
    // Compara el ID como número
    return users.find(u => u.id === Number(id));
}

// Crear Usuario Nuevo
export function createUsuario(data) {
    // Validaciones básicas (puedes añadir más, como formato de RUT, etc.)
    if (!data.email || !data.contraseña || !data.nombre || !data.apellidos || !data.tipo || !data.rut) {
        throw new Error("Faltan datos requeridos (email, contraseña, nombre, apellidos, rol/tipo, rut).");
    }
    if (users.some(u => u.email === data.email)) {
        throw new Error("El correo electrónico ya está registrado.");
    }
     if (users.some(u => u.rut === data.rut)) {
        throw new Error("El RUT ya está registrado.");
    }

    // Calcula el nuevo ID
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    // Crea el objeto del nuevo usuario
    const newUser = {
        id: newId,
        email: data.email,
        password: data.contraseña, // IMPORTANTE: En una app real, ¡encriptar esto!
        nombre: `${data.nombre} ${data.apellidos}`, // Combina nombre y apellidos
        role: data.tipo, // Usa 'tipo' del formulario como 'role'
        rut: data.rut,
        region: data.region || '', // Asigna valor por defecto si no viene
        comuna: data.comuna || '', // Asigna valor por defecto si no viene
        fechaNac: data.fechaNac || '', // Asigna valor por defecto si no viene
        direccion: data.direccion || '', // Asigna valor por defecto si no viene
        activo: true, // Los usuarios nuevos empiezan activos
        fechaRegistro: new Date().toISOString().split('T')[0] // Fecha de hoy (YYYY-MM-DD)
    };
    users.push(newUser); // Añade al array en memoria
    saveUsers(); // Guarda el array actualizado en localStorage
    console.log("Usuario creado:", newUser);
    return newUser; // Devuelve el usuario creado
}

// Actualizar Usuario Existente
export function updateUsuario(id, updatedData) {
    const index = users.findIndex(u => u.id === Number(id)); // Encuentra el índice del usuario
    if (index !== -1) { // Si se encontró
        // Validación de email único (si se intenta cambiar)
        if (updatedData.email && users.some(u => u.email === updatedData.email && u.id !== Number(id))) {
            throw new Error("El nuevo correo electrónico ya está en uso por otro usuario.");
        }
        // Validación de RUT único (si se intenta cambiar)
        if (updatedData.rut && users.some(u => u.rut === updatedData.rut && u.id !== Number(id))) {
            throw new Error("El nuevo RUT ya está en uso por otro usuario.");
        }

        // Asegura que 'activo' sea booleano (si viene como string 'true'/'false')
        if (updatedData.activo !== undefined) {
           updatedData.activo = updatedData.activo === 'true' || updatedData.activo === true;
        }

        // Obtiene el usuario actual para mantener datos no enviados
        const currentUser = users[index];
        // Fusiona los datos antiguos con los nuevos, asegurando que el ID no cambie
        users[index] = {
             ...currentUser, // Mantiene datos originales que no se actualizaron
             ...updatedData, // Sobrescribe con los datos recibidos
             id: currentUser.id // Reafirma que el ID no cambie
        };

        // Mantiene la contraseña antigua si no se envió una nueva
        if (!updatedData.password) {
            users[index].password = currentUser.password;
        }

        saveUsers(); // Guarda en localStorage
        console.log("Usuario actualizado:", users[index]);
        return users[index]; // Devuelve el usuario actualizado
    }
    // Si no se encontró el usuario, lanza un error
    throw new Error("No se encontró el usuario para actualizar.");
}

// Eliminar Usuario por ID
export function deleteUsuario(id) {
    const initialLength = users.length; // Guarda el tamaño inicial
    // Filtra el array, manteniendo todos excepto el que coincide con el ID
    users = users.filter(u => u.id !== Number(id));
    // Verifica si se eliminó algo (si el tamaño cambió)
    if (users.length === initialLength) {
         throw new Error("No se encontró el usuario para eliminar."); // Lanza error si no se encontró
    }
    saveUsers(); // Guarda la lista actualizada en localStorage
    console.log(`Usuario con ID ${id} eliminado.`);
    return true; // Indica que la operación fue exitosa
}

// --- DATOS Y FUNCIONES DE ÓRDENES ---

// Órdenes por defecto si localStorage está vacío
const ORDENES_DEFAULT = [
  {
    id: 20240705, // ID numérico
    userId: 2, // ID del usuario asociado
    clienteNombre: "Sofía Homazábal", clienteEmail: "sofia@duoc.cl",
    fecha: "2025-10-20", estado: "Completado", total: 27000,
    direccion: "Av. Siempre Viva 123", region: "Metropolitana de Santiago", comuna: "Santiago", departamento: '', indicaciones: 'Dejar en conserjería', // Añadidos campos faltantes
    items: [ { productId: 1, cantidad: 1, precioAlComprar: 3000 }, { productId: 2, cantidad: 4, precioAlComprar: 3500 }, { productId: 3, cantidad: 1, precioAlComprar: 10000 } ] // Guarda ID de producto y precio al comprar
  },
  {
    id: 20240706, userId: 3, clienteNombre: "Romina Hormazábal", clienteEmail: "romina@duoc.cl",
    fecha: "2025-10-21", estado: "Procesando", total: 12000,
    direccion: "Calle Falsa 456", region: "Metropolitana de Santiago", comuna: "Maipú", departamento: 'Apto 10', indicaciones:'',
    items: [ { productId: 1, cantidad: 4, precioAlComprar: 3000 } ]
  },
   {
    id: 20240707, userId: 2, clienteNombre: "Sofía Homazábal", clienteEmail: "sofia@duoc.cl",
    fecha: "2025-10-22", estado: "Cancelado", total: 8000, // Ajustado a 2x Empanada Pino Oferta
    direccion: "Av. Siempre Viva 123", region: "Metropolitana de Santiago", comuna: "Santiago", departamento: '', indicaciones:'',
    items: [ { productId: 5, cantidad: 2, precioAlComprar: 4000 } ] // Guarda precio de oferta
  }
];

// Carga órdenes desde localStorage o usa las defaults
// CAMBIADO A 'let' para permitir modificaciones por agregarOrden
let ordenes = JSON.parse(localStorage.getItem('fondaOrdenes')) || ORDENES_DEFAULT;

// Función para guardar órdenes en localStorage
function saveOrdenes() {
  localStorage.setItem('fondaOrdenes', JSON.stringify(ordenes));
}

// --- FUNCIONES DE ÓRDENES (Unificadas y Exportadas) ---

// Obtener Todas las Órdenes
export function getOrdenes() {
  // Ordena por ID numérico descendente
  return [...ordenes].sort((a, b) => b.id - a.id);
}

// Obtener Una Orden por ID (con datos de producto poblados)
export function getOrden(id) {
  // Busca la orden por ID (compara como string por si viene de URL)
  const orden = ordenes.find(o => String(o.id) === String(id));
  if (!orden) return null; // Devuelve null si no se encuentra

  // "Poblar" los items: Añade los detalles del producto a cada item de la orden
  const populatedItems = orden.items.map(item => {
    // Busca el producto correspondiente usando el productId guardado
    const producto = allProducts.find(p => p.id === item.productId);
    // Combina los datos del producto encontrado con la cantidad y el precio guardado en la orden
    return {
         ...(producto || { nombre: 'Producto no encontrado', img: '', id: item.productId }), // Si el producto ya no existe, muestra un placeholder
         cantidad: item.cantidad,
         // Usa el precio guardado en la orden, o el precio actual si no se guardó
         precio: item.precioAlComprar !== undefined ? item.precioAlComprar : (producto ? producto.precio : 0)
         };
  }).filter(Boolean); // Filtra por si algún producto fue null

  // Devuelve la orden completa con los items poblados
  return { ...orden, items: populatedItems };
}

// Agregar Nueva Orden
export const agregarOrden = (detallesOrden) => {
    // Busca el usuario por email para obtener su ID
    const user = users.find(u => u.email === detallesOrden.customerInfo.correo);

    const nuevaOrden = {
        // Genera un ID numérico simple basado en timestamp (o usa el de detallesOrden si prefieres)
        id: Date.now(), // ID numérico simple
        userId: user ? user.id : null, // Guarda el ID del usuario si existe
        fecha: new Date().toLocaleString('es-CL'), // Fecha y hora actual
        clienteNombre: `${detallesOrden.customerInfo.nombre} ${detallesOrden.customerInfo.apellidos}`,
        clienteEmail: detallesOrden.customerInfo.correo,
        direccion: detallesOrden.customerInfo.calle,
        departamento: detallesOrden.customerInfo.departamento,
        comuna: detallesOrden.customerInfo.comuna,
        region: detallesOrden.customerInfo.region,
        indicaciones: detallesOrden.customerInfo.indicaciones,
        estado: 'Procesando', // Estado inicial
        // Guarda solo ID de producto, cantidad y PRECIO al momento de la compra
        items: detallesOrden.items.map(item => ({
            productId: item.id,
            cantidad: item.cantidad,
            precioAlComprar: item.precio // Guarda el precio exacto pagado (importante!)
        })),
        total: detallesOrden.total // Guarda el total calculado
    };
    ordenes.push(nuevaOrden); // Añade al array en memoria
    saveOrdenes(); // Guarda en localStorage
    console.log("Nueva orden guardada:", nuevaOrden);
};

// Obtener Órdenes por Usuario ID
export function getOrdenesPorUsuario(userId) {
  // Filtra la lista completa de órdenes por el userId
  return getOrdenes().filter(o => o.userId === Number(userId));
}