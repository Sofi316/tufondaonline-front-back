import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando panel...</div>;

  // Si no está logeado, fuera
  if (!user) {
    return <Navigate to="/iniciarSesion" />;
  }

  // Si NO ES ADMIN y quiere entrar al dashboard,
  // lo mandamos a productos
  if (
    user.rol !== "ADMINISTRADOR" &&
    location.pathname.startsWith("/admin/dashboard")
  ) {
    return <Navigate to="/admin/productos" />;
  }

  // Si NO ES ADMIN y quiere entrar a USUARIOS o CATEGORIAS,
  // también se bloquea
  if (
    user.rol !== "ADMINISTRADOR" &&
    (location.pathname.startsWith("/admin/usuarios") ||
      location.pathname.startsWith("/admin/categorias"))
  ) {
    return <Navigate to="/admin/productos" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-dark min-vh-100 p-0">
          <div className="p-3 text-white text-center fw-bold border-bottom border-secondary">
            Panel Admin
          </div>

          <Nav className="flex-column p-2">

            {/* SOLO ADMIN ve Dashboard */}
            {user.rol === "ADMINISTRADOR" && (
              <Nav.Link as={Link} to="/admin/dashboard" className="text-white-50 hover-light">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Nav.Link>
            )}

            {/* ADMIN y VENDEDOR */}
            <Nav.Link as={Link} to="/admin/productos" className="text-white-50 hover-light">
              <i className="bi bi-box-seam me-2"></i> Productos
            </Nav.Link>

            {/* SOLO ADMIN */}
            {user.rol === "ADMINISTRADOR" && (
              <Nav.Link as={Link} to="/admin/usuarios" className="text-white-50 hover-light">
                <i className="bi bi-people me-2"></i> Usuarios
              </Nav.Link>
            )}

            {/* ADMIN y VENDEDOR */}
            <Nav.Link as={Link} to="/admin/ordenes" className="text-white-50 hover-light">
              <i className="bi bi-box-seam me-2"></i> Órdenes
            </Nav.Link>

            {/* SOLO ADMIN */}
            {user.rol === "ADMINISTRADOR" && (
              <Nav.Link as={Link} to="/admin/categorias" className="text-white-50 hover-light">
                <i className="bi bi-tags me-2"></i> Categorías
              </Nav.Link>
            )}

            <Nav.Link
              as="button"
              onClick={logout}
              className="text-warning mt-4 border-top border-secondary pt-3 bg-transparent border-0 text-start w-100"
            >
              <i className="bi bi-arrow-left-circle me-2"></i> Cerrar sesión
            </Nav.Link>

          </Nav>
        </Col>

        <Col md={10} className="p-4 bg-light">
          <Outlet /> 
        </Col>
      </Row>
    </Container>
  );
}
