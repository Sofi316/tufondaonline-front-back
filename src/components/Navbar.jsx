import { NavLink } from "react-router-dom";
import logoFonda from "../assets/Fonda_som.png";
import React, { useState } from 'react';
import banderas from "../assets/Banderines.png";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
    
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      
      <div className="container ps-0">

        {/* Logo */}
        <NavLink to="/" className="navbar-brand">
          <img src={logoFonda} alt="Logo de TuFondaOnline" className="logoFonda" />
        </NavLink>

        {/* BOTÓN HAMBURGUESA */}
        {/* Este es el botón que aparece en móviles */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsExpanded(!isExpanded)} 
          aria-expanded={isExpanded} 
          aria-controls="mainNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENEDOR COLAPSABLE */}
        {/* Añade la clase 'show' SÓLO si isExpanded es true */}
        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} 
          id="mainNavbar">

          {/* ENLACES */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link"
              onClick={() => setIsExpanded(false)}>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Categorias" className="nav-link"
              onClick={() => setIsExpanded(false)}>Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Ofertas" className="nav-link"
              onClick={() => setIsExpanded(false)}>Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Blogs" className="nav-link"
              onClick={() => setIsExpanded(false)}>Blogs</NavLink>
            </li>
            
           
            <li className="nav-item">
              <NavLink to="/Nosotros" className="nav-link"
              onClick={() => setIsExpanded(false)}>Nosotros</NavLink>
            </li>
            
           
            <li className="nav-item">
              <NavLink to="/Contacto" className="nav-link"
              onClick={() => setIsExpanded(false)}>Contacto</NavLink>
            </li>

            <li className="nav-item me-2"> 
              <Link to="/IniciarSesion" className="btn btn-danger">
                  Iniciar Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Registro" className="btn btn-primary">
                  Crear cuenta
              </Link>
            </li>
            {/* CARRITO DE COMPRAS (falta funcionalidad) */}
            <li className="nav-item">
              <NavLink to="/Carrito" className="nav-link"
              onClick={() => setIsExpanded(false)}>
                <i className="bi bi-cart"></i>
                <span className="badge bg-danger rounded-pill ms-1">
                  0
                </span>
              </NavLink>
            </li>
            
          </ul>
        </div>

      </div>
    </nav>
    <img src={banderas} alt="banderines" className="img-fluid d-block mb-0" />
    </>
  );
}