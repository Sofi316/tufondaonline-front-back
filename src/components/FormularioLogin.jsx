import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 1. YA NO necesitas importar 'loginUser' de usersData aquí
// import { loginUser } from '../data/usersData';

// 2. IMPORTA useAuth para acceder al contexto
import { useAuth } from '../context/AuthContext'; // Asegúrate que la ruta sea correcta

export default function FormularioLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 3. OBTÉN la función 'iniciarSesion' del contexto
  const { iniciarSesion } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 4. LLAMA a la función 'iniciarSesion' DEL CONTEXTO
    const loggedInUser = iniciarSesion(email, password); // Esta función actualiza el estado global

    // 5. Comprueba el resultado (devuelto por la función del contexto)
    if (loggedInUser) {
      // ¡Inicio de sesión exitoso!
      console.log('¡Inicio de sesión exitoso via Context!', loggedInUser);

      // Redirige según el rol (igual que antes)
      if (loggedInUser.role === 'administrador') {
        navigate('/admin');
      } else {
        navigate('/'); // O a donde quieras redirigir al cliente
      }

    } else {
      // Login fallido (la función del contexto devuelve null)
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
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
          maxLength="10" // Considera quitar este maxlength si las contraseñas pueden ser más largas
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Botones */}
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