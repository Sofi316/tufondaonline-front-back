import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
// Asegúrate de tener bootstrap-icons (npm install bootstrap-icons)
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importa tus estilos donde añadirás las clases de admin


export default function AdminLayout() {
  
  // (Aquí iría la lógica para "Cerrar Sesión")
  const handleLogout = () => {
    console.log("Cerrar sesión");
    // Aquí borrarías el estado global del usuario y redirigirías al login
    // navigate('/iniciarSesion');
  };

  return (
    <div className="admin-layout">
      {/* --- SIDEBAR --- */}
      <nav className="admin-sidebar">
        <div className="sidebar-header">
          <h3>FondaOnline</h3>
          <span>Admin Panel</span>
        </div>
        
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin" end>
              <i className="bi bi-grid-1x2-fill me-2"></i> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/ordenes">
              <i className="bi bi-receipt me-2"></i> Órdenes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/productos">
              <i className="bi bi-box-seam-fill me-2"></i> Productos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/categorias">
              <i className="bi bi-tags-fill me-2"></i> Categorías
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/usuarios">
              <i className="bi bi-people-fill me-2"></i> Usuarios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/productos/reportes">
              <i className="bi bi-file-earmark-bar-graph-fill me-2"></i> Reportes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/perfil">
              <i className="bi bi-person-circle me-2"></i> Perfil
            </NavLink>
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <NavLink className="nav-link" to="/">
            <i className="bi bi-shop me-2"></i> Ver Tienda
          </NavLink>
          <button className="nav-link" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left me-2"></i> Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="admin-content">
        {/* 'Outlet' es el espacio donde React Router renderizará 
            el componente de la ruta actual (ej. AdminDashboard) */}
        <Outlet />
      </main>
    </div>
  );
}