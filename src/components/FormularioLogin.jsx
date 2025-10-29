import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function FormularioLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { iniciarSesion } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const loggedInUser = iniciarSesion(email, password); 

    if (loggedInUser) {
      console.log('¡Inicio de sesión exitoso via Context!', loggedInUser);
      if (loggedInUser.role === 'administrador') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
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