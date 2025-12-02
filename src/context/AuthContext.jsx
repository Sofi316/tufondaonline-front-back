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
      const response = await api.post('/auth/login', { email, password });
      const { token, usuario } = response.data; 

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setUser(usuario);
      return { success: true, message: "Inicio de sesión exitoso" };

    } catch (error) {
      console.error("Error en login:", error);
      const mensajeError = error.response?.status === 403 
        ? "Credenciales incorrectas" 
        : "Error de servidor";
      return { success: false, message: mensajeError };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, usuario } = response.data; 

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setUser(usuario);

      return { success: true, message: "Usuario registrado con éxito" };
    } catch (error) {
      console.error("Error en registro:", error);
      return { success: false, message: "Error al registrar usuario (posiblemente email o RUT duplicado)" };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    window.dispatchEvent(new Event("carrito-limpiar"));

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
