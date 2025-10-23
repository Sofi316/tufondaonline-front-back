import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function AdminDashboard() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Dashboard</h2>
          <p className="text-muted">Resumen de las actividades diarias</p>
        </Col>
      </Row>

      {/* --- Fila de Estadísticas (Figura 9) --- */}
      <Row className="my-3">
        <Col md={4}>
          <Card className="text-white bg-primary shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h4>Compras</h4>
                <h3>1,234</h3>
                <span>+20% que el mes pasado</span>
              </div>
              <i className="bi bi-cart4" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-success shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h4>Productos</h4>
                <h3>400</h3>
                <span>Inventario total</span>
              </div>
              <i className="bi bi-box-seam" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-warning shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h4>Usuarios</h4>
                <h3>890</h3>
                <span>Usuarios registrados</span>
              </div>
              <i className="bi bi-people" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- Fila de Accesos Directos (Figura 9) --- */}
      <h3 className="mt-4">Accesos Directos</h3>
      <Row>
        {/* Fila 1 de Accesos */}
        <Col md={3} className="mb-3">
          <Link to="/admin/ordenes" className="text-decoration-none">
            <Card className="shortcut-card">
              <Card.Body className="text-center">
                <i className="bi bi-receipt" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="mt-2">Órdenes</h5>
                <Card.Text>Gestión de órdenes y boletas</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="mb-3">
          <Link to="/admin/productos" className="text-decoration-none">
            <Card className="shortcut-card">
              <Card.Body className="text-center">
                <i className="bi bi-box-seam-fill" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="mt-2">Productos</h5>
                <Card.Text>Administrar inventario</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="mb-3">
           <Link to="/admin/categorias" className="text-decoration-none">
            <Card className="shortcut-card">
              <Card.Body className="text-center">
                <i className="bi bi-tags-fill" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="mt-2">Categorías</h5>
                <Card.Text>Organizar por categorías</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="mb-3">
           <Link to="/admin/usuarios" className="text-decoration-none">
            <Card className="shortcut-card">
              <Card.Body className="text-center">
                <i className="bi bi-people-fill" style={{ fontSize: '2.5rem' }}></i>
                <h5 className="mt-2">Usuarios</h5>
                <Card.Text>Gestión de cuentas</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      {/* (Puedes añadir la segunda fila de accesos (Reportes, Perfil, Tienda) aquí) */}

    </Container>
  );
}