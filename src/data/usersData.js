// src/services/usersData.js

// --- 1. DATOS DE USUARIOS ---
// (Datos base de tu archivo, pero adaptados para el CRUD)
const USERS_DEFAULT = [
  {
    id: 1,
    email: 'admin@fonda.cl',
    password: 'admin123',
    nombre: 'Admin Fonda',
    role: 'administrador',
    rut: '1-9',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
    activo: true,
    fechaRegistro: '2024-01-01'
  },
  {
    id: 2,
    email: 'sofia@duoc.cl',
    password: 'sofia123',
    nombre: 'Sofía Homazábal',
    role: 'cliente',
    rut: '2-7',
    region: 'Región de Valparaíso',
    comuna: 'Viña del Mar',
    activo: true,
    fechaRegistro: '2024-02-01'
  },
  {
    id: 3,
    email: 'romina@duoc.cl',
    password: 'romina123',
    nombre: 'Romina Hormazábal',
    role: 'cliente',
    rut: '3-5',
    region: 'Región del Biobío',
    comuna: 'Concepción',
    activo: true,
    fechaRegistro: '2024-03-01'
  },
  {
    id: 4,
    email: 'fabian@duoc.cl',
    password: 'fabian123',
    nombre: 'Fabián Sanhueza',
    role: 'cliente',
    rut: '4-3',
    region: 'Región de La Araucanía',
    comuna: 'Temuco',
    activo: false,
    fechaRegistro: '2024-04-01'
  },
];

// Cargamos usuarios desde localStorage o usamos la lista por defecto
let users = JSON.parse(localStorage.getItem('fondaUsers')) || USERS_DEFAULT;

// Función interna para guardar en localStorage
function saveUsers() {
    localStorage.setItem('fondaUsers', JSON.stringify(users));
}


// --- 2. TU FUNCIÓN DE LOGIN (Se mantiene) ---
export const loginUser = (email, password) => {
  const user = users.find(u => u.email === email);
  if (user && user.password === password) {
    return {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      role: user.role,
    };
  }
  return null;
};


// --- 3. FUNCIONES CRUD (Requeridas por la rúbrica) ---

/**
 * --- FUNCIONES READ (Leer) ---
 */
export function getUsuarios() {
    return users;
}

export function getUsuario(id) {
    return users.find(u => u.id === Number(id)); 
}

/**
 * --- FUNCIÓN CREATE (Crear) ---
 * @param {object} data - Los datos del formulario (de AdminCrearUsuario)
 */
export function createUsuario(data) {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = {
        id: newId,
        email: data.email,
        password: data.contraseña, // El formulario usa 'contraseña'
        nombre: `${data.nombre} ${data.apellidos}`,
        role: data.tipo, // El formulario usa 'tipo'
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
    return newUser;
}

/**
 * --- FUNCIÓN UPDATE (Actualizar) ---
 * @param {number} id - ID del usuario a actualizar
 * @param {object} updatedData - Datos del formulario de edición
 */
export function updateUsuario(id, updatedData) {
    const index = users.findIndex(u => u.id === Number(id));
    if (index !== -1) {
        
        // Importante: El formulario pasa "true" o "false" como string
        if (updatedData.activo !== undefined) {
           updatedData.activo = updatedData.activo === 'true' || updatedData.activo === true;
        }

        users[index] = { ...users[index], ...updatedData };
        saveUsers();
        return users[index];
    }
    return null;
}

/**
 * --- FUNCIÓN DELETE (Eliminar) ---
 * @param {number} id - ID del usuario a eliminar
 */
export function deleteUsuario(id) {
    const index = users.findIndex(u => u.id === Number(id));
    if (index !== -1) {
        users = users.filter(u => u.id !== Number(id));
        saveUsers();
        return true;
    }
    return false;
}

// src/data/usersData.js

// ... (pega esto al final de tu archivo usersData.js)
// ... (después de la función deleteUsuario)

// --- 3. DATOS DE ÓRDENES (Simulados) ---

const ORDENES_DEFAULT = [
  {
    id: 20240705, // ID de la Figura 7
    userId: 2, // ID de Sofía
    clienteNombre: "Sofía Homazábal",
    clienteEmail: "sofia@duoc.cl",
    fecha: "2025-10-20",
    estado: "Completado", // Puede ser: "Completado", "Procesando", "Cancelado"
    total: 28775,
    direccion: "Av. Siempre Viva 123, Springfield",
    region: "Región Metropolitana",
    comuna: "Santiago",
    items: [
      { id: 1, nombre: "Fortnite", cantidad: 1, precio: 50 },
      { id: 2, nombre: "Minecraft", cantidad: 4, precio: 2695 },
      { id: 3, nombre: "Red Dead Redemption 2", cantidad: 1, precio: 5999 },
      // ... (añadí solo 3 para el ejemplo)
    ]
  },
  {
    id: 20240706,
    userId: 3, // ID de Romina
    clienteNombre: "Romina Hormazábal",
    clienteEmail: "romina@duoc.cl",
    fecha: "2025-10-21",
    estado: "Procesando",
    total: 12000,
    direccion: "Calle Falsa 456, Santiago",
    region: "Región Metropolitana",
    comuna: "Maipú",
    items: [
      { id: 10, nombre: "Choripan", cantidad: 4, precio: 3000 },
    ]
  }
];

let ordenes = JSON.parse(localStorage.getItem('fondaOrdenes')) || ORDENES_DEFAULT;

function saveOrdenes() {
  localStorage.setItem('fondaOrdenes', JSON.stringify(ordenes));
}

// --- FUNCIONES CRUD (Read) para Órdenes ---

/**
 * LEER: Obtiene todas las órdenes.
 */
export function getOrdenes() {
  return ordenes;
}

/**
 * LEER: Obtiene una orden por su ID.
 * (Para la página "MOSTRAR BOLETA")
 */
export function getOrden(id) {
  // Usamos Number() porque el ID de la URL vendrá como string
  return ordenes.find(o => o.id === Number(id));
}