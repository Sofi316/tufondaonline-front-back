 

 
import { productos as allProducts } from './productosData.js';  

 

 
const USERS_DEFAULT = [
  {
    id: 1, email: 'admin@duoc.cl', password: 'admin123', nombre: 'Admin Fonda',
    role: 'administrador', rut: '1-9', region: 'Región Metropolitana', comuna: 'Santiago',
    direccion: 'Calle Falsa 123', activo: true, fechaRegistro: '2024-01-01', fechaNac: '1990-01-01'  
  },
  {
    id: 2, email: 'sofia@duoc.cl', password: 'sofia123', nombre: 'Sofía Homazábal',
    role: 'cliente', rut: '2-7', region: 'Región de Valparaíso', comuna: 'Viña del Mar',
    direccion: 'Av. Siempre Viva 456', activo: true, fechaRegistro: '2024-02-01', fechaNac: '1995-05-10'  
  },
  {
    id: 3, email: 'romina@duoc.cl', password: 'romina123', nombre: 'Romina Hormazábal',
    role: 'cliente', rut: '3-5', region: 'Región del Biobío', comuna: 'Concepción',
    direccion: 'Pasaje Inventado 789', activo: true, fechaRegistro: '2024-03-01', fechaNac: '1998-11-20'  
  },
  {
    id: 4, email: 'fabian@duoc.cl', password: 'fabian123', nombre: 'Fabián Sanhueza',
    role: 'cliente', rut: '4-3', region: 'Región de La Araucanía', comuna: 'Temuco',
    direccion: 'Camino Real 101', activo: false, fechaRegistro: '2024-04-01', fechaNac: '1997-03-15'  
  },
];

 
 
let users = JSON.parse(localStorage.getItem('fondaUsers')) || USERS_DEFAULT;

 
function saveUsers() {
    localStorage.setItem('fondaUsers', JSON.stringify(users));
}

 
 
export const loginUser = (email, password) => {
   
  const user = users.find(u => u.email === email);
  if (user && user.password === password) {
     
    return {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      role: user.role,
      direccion: user.direccion,  
      comuna: user.comuna,        
      region: user.region         
    };
  }
  return null;  
};

 

 
export function getUsuarios() {
    return [...users];  
}

 
export function getUsuario(id) {
     
    return users.find(u => u.id === Number(id));
}

 
export function createUsuario(data) {
     
    if (!data.email || !data.contraseña || !data.nombre || !data.apellidos || !data.tipo || !data.rut) {
        throw new Error("Faltan datos requeridos (email, contraseña, nombre, apellidos, rol/tipo, rut).");
    }
    if (users.some(u => u.email === data.email)) {
        throw new Error("El correo electrónico ya está registrado.");
    }
     if (users.some(u => u.rut === data.rut)) {
        throw new Error("El RUT ya está registrado.");
    }

     
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
     
    const newUser = {
        id: newId,
        email: data.email,
        password: data.contraseña,  
        nombre: `${data.nombre} ${data.apellidos}`,  
        role: data.tipo,  
        rut: data.rut,
        region: data.region || '',  
        comuna: data.comuna || '',  
        fechaNac: data.fechaNac || '',  
        direccion: data.direccion || '',  
        activo: true,  
        fechaRegistro: new Date().toISOString().split('T')[0]  
    };
    users.push(newUser);  
    saveUsers();  
    console.log("Usuario creado:", newUser);
    return newUser;  
}

 
export function updateUsuario(id, updatedData) {
    const index = users.findIndex(u => u.id === Number(id));  
    if (index !== -1) {  
         
        if (updatedData.email && users.some(u => u.email === updatedData.email && u.id !== Number(id))) {
            throw new Error("El nuevo correo electrónico ya está en uso por otro usuario.");
        }
         
        if (updatedData.rut && users.some(u => u.rut === updatedData.rut && u.id !== Number(id))) {
            throw new Error("El nuevo RUT ya está en uso por otro usuario.");
        }

         
        if (updatedData.activo !== undefined) {
           updatedData.activo = updatedData.activo === 'true' || updatedData.activo === true;
        }

         
        const currentUser = users[index];
         
        users[index] = {
             ...currentUser,  
             ...updatedData,  
             id: currentUser.id  
        };

         
        if (!updatedData.password) {
            users[index].password = currentUser.password;
        }

        saveUsers();  
        console.log("Usuario actualizado:", users[index]);
        return users[index];  
    }
     
    throw new Error("No se encontró el usuario para actualizar.");
}

 
export function deleteUsuario(id) {
    const initialLength = users.length;  
     
    users = users.filter(u => u.id !== Number(id));
     
    if (users.length === initialLength) {
         throw new Error("No se encontró el usuario para eliminar.");  
    }
    saveUsers();  
    console.log(`Usuario con ID ${id} eliminado.`);
    return true;  
}

 

 
const ORDENES_DEFAULT = [
  {
    id: 20240705,  
    userId: 2,  
    clienteNombre: "Sofía Homazábal", clienteEmail: "sofia@duoc.cl",
    fecha: "2025-10-20", estado: "Completado", total: 27000,
    direccion: "Av. Siempre Viva 123", region: "Metropolitana de Santiago", comuna: "Santiago", departamento: '', indicaciones: 'Dejar en conserjería',  
    items: [ { productId: 1, cantidad: 1, precioAlComprar: 3000 }, { productId: 2, cantidad: 4, precioAlComprar: 3500 }, { productId: 3, cantidad: 1, precioAlComprar: 10000 } ]  
  },
  {
    id: 20240706, userId: 3, clienteNombre: "Romina Hormazábal", clienteEmail: "romina@duoc.cl",
    fecha: "2025-10-21", estado: "Procesando", total: 12000,
    direccion: "Calle Falsa 456", region: "Metropolitana de Santiago", comuna: "Maipú", departamento: 'Apto 10', indicaciones:'',
    items: [ { productId: 1, cantidad: 4, precioAlComprar: 3000 } ]
  },
   {
    id: 20240707, userId: 2, clienteNombre: "Sofía Homazábal", clienteEmail: "sofia@duoc.cl",
    fecha: "2025-10-22", estado: "Cancelado", total: 8000,  
    direccion: "Av. Siempre Viva 123", region: "Metropolitana de Santiago", comuna: "Santiago", departamento: '', indicaciones:'',
    items: [ { productId: 5, cantidad: 2, precioAlComprar: 4000 } ]  
  }
];

 
 
let ordenes = JSON.parse(localStorage.getItem('fondaOrdenes')) || ORDENES_DEFAULT;

 
function saveOrdenes() {
  localStorage.setItem('fondaOrdenes', JSON.stringify(ordenes));
}

 

 
export function getOrdenes() {
   
  return [...ordenes].sort((a, b) => b.id - a.id);
}

 
export function getOrden(id) {
   
  const orden = ordenes.find(o => String(o.id) === String(id));
  if (!orden) return null;  

   
  const populatedItems = orden.items.map(item => {
     
    const producto = allProducts.find(p => p.id === item.productId);
     
    return {
         ...(producto || { nombre: 'Producto no encontrado', img: '', id: item.productId }),  
         cantidad: item.cantidad,
          
         precio: item.precioAlComprar !== undefined ? item.precioAlComprar : (producto ? producto.precio : 0)
         };
  }).filter(Boolean);  

   
  return { ...orden, items: populatedItems };
}

 
export const agregarOrden = (detallesOrden) => {
     
    const user = users.find(u => u.email === detallesOrden.customerInfo.correo);

    const nuevaOrden = {
         
        id: Date.now(),  
        userId: user ? user.id : null,  
        fecha: new Date().toLocaleString('es-CL'),  
        clienteNombre: `${detallesOrden.customerInfo.nombre} ${detallesOrden.customerInfo.apellidos}`,
        clienteEmail: detallesOrden.customerInfo.correo,
        direccion: detallesOrden.customerInfo.calle,
        departamento: detallesOrden.customerInfo.departamento,
        comuna: detallesOrden.customerInfo.comuna,
        region: detallesOrden.customerInfo.region,
        indicaciones: detallesOrden.customerInfo.indicaciones,
        estado: 'Procesando',  
         
        items: detallesOrden.items.map(item => ({
            productId: item.id,
            cantidad: item.cantidad,
            precioAlComprar: item.precio  
        })),
        total: detallesOrden.total  
    };
    ordenes.push(nuevaOrden);  
    saveOrdenes();  
    console.log("Nueva orden guardada:", nuevaOrden);
};

export function getOrdenesPorUsuario(userId) {
   
  return getOrdenes().filter(o => o.userId === Number(userId));
}