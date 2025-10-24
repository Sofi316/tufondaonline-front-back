// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
// 1. Importa useNavigate
import { useNavigate } from 'react-router-dom';
import { loginUser as apiLoginUser } from '../data/usersData'; // Importa tu función de login

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
   if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // 2. Define navigate dentro del Provider
  const navigate = useNavigate();
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
     const storedUser = localStorage.getItem('usuarioLogueado');
     try {
        return storedUser ? JSON.parse(storedUser) : null;
     } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        return null;
     }
  });

  const iniciarSesion = (email, password) => {
    const user = apiLoginUser(email, password);
    if (user) {
      setUsuarioLogueado(user);
      localStorage.setItem('usuarioLogueado', JSON.stringify(user));
      console.log("User logged in:", user);
      return user;
    } else {
      cerrarSesion();
      console.log("Login failed");
      return null;
    }
  };

  const cerrarSesion = () => {
    setUsuarioLogueado(null);
    localStorage.removeItem('usuarioLogueado');
    console.log("User logged out");
    // 3. Ahora puedes usar navigate aquí para redirigir al login
    navigate('/iniciarSesion');
  };

  const valor = {
    usuarioLogueado,
    iniciarSesion,
    cerrarSesion,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
};