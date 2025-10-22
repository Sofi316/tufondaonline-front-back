// src/pages/admin/AdminVerOrden.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
// Importamos la nueva función de tu archivo de datos
import { getOrden } from '../../data/usersData.js'; 

export default function AdminVerOrden() {
  
  // useParams() obtiene el ':id' de la URL (ver App.jsx)
  const { id } = useParams(); 
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    // Carga la orden específica usando el ID de la URL
    setOrden(getOrden(id)); 
  }, [id]); // Se ejecuta cada vez que el ID cambia

  // Función helper para dar color al estado (Badge)
  const getBadgeVariant = (estado) => {
    switch (estado) {
      case 'Completado': return 'success';
      case 'Procesando': return 'warning';
      case 'Cancelado': return 'danger';
      default: return 'secondary';
    }
  };

  // Formatear como moneda chilena
  const formatPesoChileno = (valor) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(valor);
  };

  // Mostrar "Cargando..." si la orden aún no se encuentra
  if (!orden) {
    return <Container fluid><p>Cargando detalle de la orden...</p></Container>;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          {/* --- Botón para volver al listado --- */}
          <Button as={Link} to="/admin/ordenes" variant="secondary" size="sm" className="mb-3">
            <i className="bi bi-arrow-left me-1"></i>
            Volver a Órdenes
          </Button>
          
          <h2>Detalle de Orden #{orden.id}</h2>
        </Col>
      </Row>

      <Row>
        {/* --- Columna de Información del Cliente --- */}
        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Header>
              <Card.Title as="h5">Información del Cliente</Card.Title>
            </Card.Header>
            <Card.Body>
              <p><strong>Nombre:</strong> {orden.clienteNombre}</p>
              <p><strong>Email:</strong> {orden.clienteEmail}</p>
              <p><strong>Dirección:</strong> {orden.direccion}</p>
              <p><strong>Comuna:</strong> {orden.comuna}</p>
              <p><strong>Región:</strong> {orden.region}</p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm mb-3">
            <Card.Header>
              <Card.Title as="h5">Resumen de Pago</Card.Title>
            </Card.Header>
            <Card.Body>
              <p><strong>Fecha:</strong> {orden.fecha}</p>
              <p><strong>Estado:</strong> 
                <Badge bg={getBadgeVariant(orden.estado)} className="ms-2">
                  {orden.estado}
                </Badge>
              </p>
              <hr />
              <h4 className="text-end">
                Total Pagado: {formatPesoChileno(orden.total)}
              </h4>
            </Card.Body>
          </Card>
        </Col>
        
        {/* --- Columna de Items del Pedido --- */}
        <Col md={8}>
          <Card className="shadow-sm mb-3">
            <Card.Header>
              <Card.Title as="h5">Items del Pedido</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orden.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{formatPesoChileno(item.precio)}</td>
                      <td>{formatPesoChileno(item.cantidad * item.precio)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}