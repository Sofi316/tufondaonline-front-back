import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../components/CarritoContext'; 
import { useAuth } from '../context/AuthContext';     
function Navigation() {
  const { cantidadTotal } = useCarrito();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-danger">
          <i className="bi bi-flag-fill me-2"></i>FondaOnline
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Menú</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/carrito" className="position-relative me-3">
              <i className="bi bi-cart3 fs-5"></i>
              {cantidadTotal > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {cantidadTotal}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <NavDropdown title={<span><i className="bi bi-person-circle me-1"></i> {user.nombre}</span>} id="user-nav-dropdown">
                
                {(user.rol === 'administrador' || user.rol === 'admin') && (
                  <>
                    <NavDropdown.Item as={Link} to="/admin/productos">
                      <i className="bi bi-gear-fill me-2"></i>Gestionar Productos
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/usuarios">
                      <i className="bi bi-people-fill me-2"></i>Gestionar Usuarios
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}

                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Si no está logueado
              <div className="d-flex gap-2">
                <Button as={Link} to="/login" variant="outline-light" size="sm">Ingresar</Button>
                <Button as={Link} to="/registro" variant="danger" size="sm">Registrarse</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;