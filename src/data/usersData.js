
export const USERS = [
  {
    id: 1,
    email: 'admin@fonda.cl',
    password: 'admin123',
    nombre: 'Admin Fonda',
    role: 'administrador', // Rol de administrador
  },
  {
    id: 2,
    email: 'sofia@duoc.cl',
    password: 'sofia123',
    nombre: 'Sofía Homazábal',
    role: 'cliente', 
  },
  {
    id: 3,
    email: 'romina@duoc.cl',
    password: 'romina123',
    nombre: 'Romina Hormazábal',
    role: 'cliente',
  },
  {
    id: 4,
    email: 'fabian@duoc.cl',
    password: 'fabian123',
    nombre: 'Fabián Sanhueza',
    role: 'cliente',
  },
];

// Esta función simula la lógica de "Iniciar Sesión"
// Tu FormularioLogin.jsx la puede importar y usar
export const loginUser = (email, password) => {
  // 1. Busca al usuario por su email
  const user = USERS.find(u => u.email === email);

  // 2. Si el usuario existe y la contraseña coincide
  if (user && user.password === password) {
    // Devuelve el usuario (sin la contraseña por seguridad)
    return {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      role: user.role,
    };
  }

  // 3. Si no, devuelve null (login fallido)
  return null;
};