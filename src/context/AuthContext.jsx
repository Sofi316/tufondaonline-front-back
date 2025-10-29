 
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser as apiLoginUser } from '../data/usersData';  

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
   if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

 
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
   
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
     const storedUser = localStorage.getItem('usuarioLogueado');
     try { return storedUser ? JSON.parse(storedUser) : null; }
     catch (e) { console.error("Fallo al parsear usuario desde localStorage", e); return null; }
  });

   
   
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
   
  const [codigoDescuentoUsado, setCodigoDescuentoUsado] = useState('');
   

   
  const iniciarSesion = (email, password) => {
    const user = apiLoginUser(email, password);  
    if (user) {
      setUsuarioLogueado(user);  
      localStorage.setItem('usuarioLogueado', JSON.stringify(user));  
       
      setDescuentoAplicado(0);
      setCodigoDescuentoUsado('');
      console.log("Usuario inició sesión:", user);
      return user;  
    } else {
      cerrarSesion();  
      console.log("Fallo de inicio de sesión");
      return null;  
    }
  };

   
  const cerrarSesion = () => {
    setUsuarioLogueado(null);  
    localStorage.removeItem('usuarioLogueado');  
     
    setDescuentoAplicado(0);
    setCodigoDescuentoUsado('');
    console.log("Usuario cerró sesión");
    navigate('/iniciarSesion');  
  };

   
  const aplicarCodigoDescuento = (codigoInput) => {
     
    if (codigoInput === 'FELICES8') {
      setDescuentoAplicado(0.10);  
      setCodigoDescuentoUsado(codigoInput);  
      console.log("Código FELICES8 aplicado (10%)");
       
      return { success: true, message: '¡Código FELICES8 aplicado! Tienes 10% de descuento.' };
    }
     

     
    setDescuentoAplicado(0);  
    setCodigoDescuentoUsado('');
    console.log("Código de descuento inválido:", codigoInput);
     
    return { success: false, message: 'Código de descuento inválido o expirado.' };
  };
   

   
  const valor = {
    usuarioLogueado,         
    iniciarSesion,           
    cerrarSesion,            
    descuentoAplicado,       
    codigoDescuentoUsado,    
    aplicarCodigoDescuento,  
  };

   
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
};