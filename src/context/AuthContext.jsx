import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/api'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [codigoDescuentoUsado, setCodigoDescuentoUsado] = useState(null);

  useEffect(() => {
    const verificarSesion = () => {
      const tokenGuardado = localStorage.getItem('token');
      const usuarioGuardado = localStorage.getItem('usuario');

      if (tokenGuardado && usuarioGuardado) {
        setUser(JSON.parse(usuarioGuardado));
      }
      setLoading(false);
    };
    verificarSesion();
  }, []);


  const login = async (email, password) => {
    try {
    
      const response = await api.post('/login', { email, password });
      
    
      const { token, usuario } = response.data; 

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setUser(usuario);
      return { success: true, message: "Inicio de sesión exitoso" };

    } catch (error) {
      console.error("Error en login:", error);
      const mensajeError = error.response?.data?.message || "Credenciales incorrectas o error de servidor";
      return { success: false, message: mensajeError };
    }
  };

  const register = async (userData) => {
    try {
      await api.post('/usuarios', userData);
      return { success: true, message: "Usuario registrado con éxito" };
    } catch (error) {
      console.error("Error en registro:", error);
      const mensajeError = error.response?.data?.message || "Error al registrar usuario";
      return { success: false, message: mensajeError };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUser(null);
    setCodigoDescuentoUsado(null);
  };

  const aplicarCodigoDescuento = (codigo) => {
    if (codigo === 'FELICES8') {
      setCodigoDescuentoUsado(codigo);
      return { success: true, message: 'Código aplicado correctamente' };
    }
    return { success: false, message: 'Código inválido' };
  };

  const value = {
    user,
    login,
    register,
    logout,
    aplicarCodigoDescuento,
    codigoDescuentoUsado,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};