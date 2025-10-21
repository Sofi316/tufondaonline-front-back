import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 1. Importa la función de login desde tu archivo de datos
import { loginUser } from '../data/usersData'; 

export default function FormularioLogin() {
  // Estados para guardar los valores de los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para manejar el error
  const [error, setError] = useState('');

  // 2. Hook de React Router para poder redirigir al usuario
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
    setError(''); // Limpia errores anteriores

    // 3. Llama a la función de login que importamos
    const loggedInUser = loginUser(email, password);

    // 4. Comprueba el resultado
    if (loggedInUser) {
      // ¡Inicio de sesión exitoso!
      console.log('¡Inicio de sesión exitoso!', loggedInUser);
      
      // (En un futuro, aquí guardarías al usuario en un estado global)
      
      // 5. Redirige al usuario según su rol
      if (loggedInUser.role === 'administrador') {
        // Si es admin, lo mandas al dashboard (ajusta la ruta si es necesario)
        navigate('/admin'); 
      } else {
        // Si es comprador, lo mandas a la página principal
        navigate('/'); 
      }

    } else {
      // Login fallido
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    // 'noValidate' previene la validación HTML por defecto
    <form onSubmit={handleSubmit} noValidate>
      
      {/* Mensaje de error (si existe) */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Campo Correo */}
      <div className="mb-3">
        <label htmlFor="loginEmail" className="form-label">Correo</label>
        <input
          type="email"
          id="loginEmail"
          name="email"
          // 'form-control' es la clase de Bootstrap
          // 'is-invalid' se añade si hay un error
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder="@duoc.cl, @profesor.duoc.cl..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Campo Contraseña */}
      <div className="mb-3">
        <label htmlFor="loginPassword" className="form-label">Contraseña</label>
        <input
          type="password"
          id="loginPassword"
          name="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder="******"
          required
          minLength="4"
          maxLength="10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Botones de acción */}
      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <button type="submit" className="btn btn-danger me-md-2">
          Ingresar
        </button>
        <Link to="/registro" className="btn btn-outline-primary">
          Crear cuenta
        </Link>
      </div>
    </form>
  );
}