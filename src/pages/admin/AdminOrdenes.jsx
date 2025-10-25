import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOrdenes } from '../../data/usersData.js'; 

export default function AdminOrdenes() {
  
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    setOrdenes(getOrdenes());
  }, []);

  const getBadgeVariant = (estado) => {
    switch (estado) {
      case 'Completado': return 'success';
      case 'Procesando': return 'warning';
      case 'Cancelado': return 'danger';
      default: return 'secondary';
    }
  };
  
  const formatPesoChileno = (valor) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(valor);
  };

  return (
    <Container fluid>
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Órdenes y Boletas</h2>
          <p className="text-muted">Gestión y seguimiento de órdenes de compra.</p>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>N° Orden</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map(orden => (
            <tr key={orden.id}>
              <td>#{orden.id}</td>
              <td>{orden.clienteNombre}</td>
              <td>{orden.fecha}</td>
              <td>
                <Badge bg={getBadgeVariant(orden.estado)}>
                  {orden.estado}
                </Badge>
              </td>
              <td>{formatPesoChileno(orden.total)}</td>
              <td>
                <Button 
                  as={Link} 
                  to={`/admin/ordenes/${orden.id}`} 
                  variant="info" 
                  size="sm"
                >
                  <i className="bi bi-eye-fill me-1"></i>
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}