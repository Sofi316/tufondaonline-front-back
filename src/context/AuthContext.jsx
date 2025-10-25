// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser as apiLoginUser } from '../data/usersData'; // Asegúrate que la ruta sea correcta

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
   if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Función auxiliar para calcular edad (si la necesitas para otros descuentos)
function calcularEdad(fechaNac) {
    if (!fechaNac) return 0;
    try {
        const nacimiento = new Date(fechaNac);
        if (isNaN(nacimiento.getTime())) return 0;
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    } catch (e) {
        console.error("Error calculando edad:", e);
        return 0;
    }
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // Estado para usuario logueado (carga desde localStorage)
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
     const storedUser = localStorage.getItem('usuarioLogueado');
     try { return storedUser ? JSON.parse(storedUser) : null; }
     catch (e) { console.error("Fallo al parsear usuario desde localStorage", e); return null; }
  });

  // --- ESTADOS PARA DESCUENTO ---
  // Guarda el porcentaje (ej: 0.10 para 10%)
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  // Guarda el código específico que se usó (ej: "FELICES8")
  const [codigoDescuentoUsado, setCodigoDescuentoUsado] = useState('');
  // -----------------------------

  // Función para iniciar sesión
  const iniciarSesion = (email, password) => {
    const user = apiLoginUser(email, password); // Llama a la función de usersData
    if (user) {
      setUsuarioLogueado(user); // Guarda usuario en estado
      localStorage.setItem('usuarioLogueado', JSON.stringify(user)); // Guarda en localStorage
      // Resetea cualquier descuento previo al iniciar sesión
      setDescuentoAplicado(0);
      setCodigoDescuentoUsado('');
      console.log("Usuario inició sesión:", user);
      return user; // Devuelve datos del usuario
    } else {
      cerrarSesion(); // Asegura limpiar estado si falla
      console.log("Fallo de inicio de sesión");
      return null; // Devuelve null si falla
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setUsuarioLogueado(null); // Limpia estado
    localStorage.removeItem('usuarioLogueado'); // Limpia localStorage
    // Resetea descuento al cerrar sesión
    setDescuentoAplicado(0);
    setCodigoDescuentoUsado('');
    console.log("Usuario cerró sesión");
    navigate('/iniciarSesion'); // Redirige al login
  };

  // --- FUNCIÓN PARA APLICAR CÓDIGO DE DESCUENTO ---
  const aplicarCodigoDescuento = (codigoInput) => {
    // Valida el código (puedes añadir más códigos aquí)
    if (codigoInput === 'FELICES8') {
      setDescuentoAplicado(0.10); // Aplica 10% de descuento
      setCodigoDescuentoUsado(codigoInput); // Guarda el código usado
      console.log("Código FELICES8 aplicado (10%)");
      // Devuelve éxito y mensaje
      return { success: true, message: '¡Código FELICES8 aplicado! Tienes 10% de descuento.' };
    }
    // else if (codigoInput === 'OTROCODIGO') { ... } // Lógica para otros códigos

    // Si el código no es válido
    setDescuentoAplicado(0); // Asegura que no haya descuento
    setCodigoDescuentoUsado('');
    console.log("Código de descuento inválido:", codigoInput);
    // Devuelve fallo y mensaje
    return { success: false, message: 'Código de descuento inválido o expirado.' };
  };
  // ------------------------------------------

  // Valores que proveerá el contexto
  const valor = {
    usuarioLogueado,        // Objeto del usuario logueado o null
    iniciarSesion,          // Función para loguear
    cerrarSesion,           // Función para desloguear
    descuentoAplicado,      // Porcentaje de descuento actual (ej: 0.10)
    codigoDescuentoUsado,   // Código usado (ej: "FELICES8")
    aplicarCodigoDescuento, // Función para intentar aplicar un código
  };

  // Retorna el Provider con los valores disponibles para sus hijos
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
};