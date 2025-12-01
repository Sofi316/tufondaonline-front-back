import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import logoFonda from "../assets/Fonda_som.png";
import banderas from "../assets/Banderines.png";
import { useCarrito } from "../components/CarritoContext"; 
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { cantidadTotal } = useCarrito();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsExpanded(false);
        
        navigate('/iniciarSesion'); 
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container ps-0">

                    <NavLink to="/" className="navbar-brand">
                        <img src={logoFonda} alt="Logo de TuFondaOnline" className="logoFonda" />
                    </NavLink>

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

                    <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="mainNavbar">
                        <ul className="navbar-nav ms-auto align-items-center">
                            
                            {/* --- MENÚ PÚBLICO --- */}
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" onClick={() => setIsExpanded(false)}>Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/categorias" className="nav-link" onClick={() => setIsExpanded(false)}>Categorías</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/ofertas" className="nav-link" onClick={() => setIsExpanded(false)}>Ofertas</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/blogs" className="nav-link" onClick={() => setIsExpanded(false)}>Blogs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/nosotros" className="nav-link" onClick={() => setIsExpanded(false)}>Nosotros</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contacto" className="nav-link" onClick={() => setIsExpanded(false)}>Contacto</NavLink>
                            </li>

                            {/* --- LÓGICA DE SESIÓN --- */}
                            {user ? (
                                <>
                                    {/* Solo mostramos el panel si el rol es ADMINISTRADOR (Mayúscula, como viene de Java) */}
                                    {(user.rol === 'ADMINISTRADOR' || user.rol === 'VENDEDOR') && (
                                        <li className="nav-item">
                                            <NavLink to="/admin" className="nav-link text-warning fw-bold" onClick={() => setIsExpanded(false)}>
                                                <i className="bi bi-gear-fill me-1"></i>Admin
                                            </NavLink>
                                        </li>
                                    )}
                                    
                                    <li className="nav-item ms-2 d-none d-lg-block">
                                        <span className="nav-link text-light disabled">Hola, {user.nombre}</span>
                                    </li>

                                    <li className="nav-item ms-2">
                                        <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item me-2">
                                        {/* CORREGIDO: Ruta a /iniciarSesion */}
                                        <Link to="/iniciarSesion" className="btn btn-danger" onClick={() => setIsExpanded(false)}>
                                            Iniciar Sesión
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        {/* CORREGIDO: Ruta a /registro */}
                                        <Link to="/registro" className="btn btn-primary" onClick={() => setIsExpanded(false)}>
                                            Crear cuenta
                                        </Link>
                                    </li>
                                </>
                            )}

                            {/* --- CARRITO --- */}
                            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                                <NavLink to="/Carrito" className="nav-link position-relative" onClick={() => setIsExpanded(false)}>
                                    <span className="d-inline-block">
                                        <i className="bi bi-cart3 fs-5"></i>
                                        {cantidadTotal > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                                               
                                                {cantidadTotal}
                                            </span>
                                        )}
                                    </span>
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <img src={banderas} alt="banderines" className="img-fluid d-block mb-0 w-100" />
        </>
    );
}