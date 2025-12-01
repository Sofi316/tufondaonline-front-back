import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AdminLayout() {
  const { user, loading } = useAuth(); 

  if (loading) return <div>Cargando panel...</div>;

  if (!user) {
    return <Navigate to="/iniciarSesion" />;
  }

  // Ajusta 'administrador' según cómo lo guardaste en tu BD (puede ser 'admin', 'ROLE_ADMIN', etc.)
  if (user.rol !== 'ADMINISTRADOR' ) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-dark min-vh-100 p-0">
          <div className="p-3 text-white text-center fw-bold border-bottom border-secondary">
            Panel Admin
          </div>
          <Nav className="flex-column p-2">
            <Nav.Link as={Link} to="/admin/productos" className="text-white-50 hover-light">
              <i className="bi bi-box-seam me-2"></i> Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/usuarios" className="text-white-50 hover-light">
              <i className="bi bi-people me-2"></i> Usuarios
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/categorias" className="text-white-50 hover-light">
               <i className="bi bi-tags me-2"></i> Categorías
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="text-warning mt-4 border-top border-secondary pt-3">
              <i className="bi bi-arrow-left-circle me-2"></i> Volver a la Tienda
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