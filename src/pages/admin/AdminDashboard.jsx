// src/pages/admin/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap'; // No necesitamos Badge aquí
// 1. IMPORTAMOS SOLO obtenerProductos
import { obtenerProductos } from '../../data/productosData.js'; // Ajusta la ruta

export default function AdminDashboard() {

  // 2. MANTENEMOS SOLO EL ESTADO PARA EL TOTAL
  const [totalProductos, setTotalProductos] = useState(0);
  // Eliminamos: const [conteoCriticos, setConteoCriticos] = useState(0);

  // 3. ACTUALIZAMOS USEEFFECT PARA CARGAR SOLO EL TOTAL
  useEffect(() => {
    setTotalProductos(obtenerProductos().length); // Obtiene el total de productos
    // Eliminamos: setConteoCriticos(obtenerConteoProductosCriticos());
  }, []); // El array vacío asegura que se ejecute solo una vez


  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Dashboard</h2>
          <p className="text-muted">Resumen de las actividades diarias</p>
        </Col>
      </Row>

      {/* --- Fila de Estadísticas --- */}
      <Row className="my-3">
        {/* ... (Tarjeta de Compras sin cambios) ... */}
         <Col md={4}>
          <Card className="text-white bg-primary shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h4>Compras</h4>
                <h3>1,234</h3> {/* Dato Fijo por ahora */}
                <span>+20% que el mes pasado</span>
              </div>
              <i className="bi bi-cart4" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
            </Card.Body>
          </Card>
        </Col>

        {/* --- TARJETA DE PRODUCTOS MODIFICADA (SIN BADGE) --- */}
        <Col md={4}>
          <Card className="text-white bg-success shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h4>Productos</h4>
                {/* 4. MUESTRA EL TOTAL DE PRODUCTOS DEL ESTADO */}
                <h3>{totalProductos}</h3>
                <span>Variedad de productos</span>
                {/* 5. EL BADGE DE STOCK CRÍTICO HA SIDO ELIMINADO */}
              </div>
              <i className="bi bi-box-seam" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
            </Card.Body>
          </Card>
        </Col>

        {/* ... (Tarjeta de Usuarios sin cambios) ... */}
         <Col md={4}>
          <Card className="text-white bg-warning shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h4>Usuarios</h4>
                <h3>890</h3> {/* Dato Fijo por ahora */}
                <span>Usuarios registrados</span>
              </div>
              <i className="bi bi-people" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* --- Fila de Accesos Directos --- */}
      {/* ... (Resto del dashboard sin cambios) ... */}
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

    </Container>
  );
}