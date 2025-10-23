// src/pages/admin/AdminProductosCriticos.jsx

import React, { useState, useEffect } from 'react';
// 1. IMPORTA 'Alert' JUNTO CON LOS DEMÁS COMPONENTES DE REACT-BOOTSTRAP
import { Container, Row, Col, Table, Button, Badge, Alert } from 'react-bootstrap'; 
import { Link, useNavigate } from 'react-router-dom';
// Asegúrate que la ruta sea correcta
import { obtenerProductosCriticos } from '../../data/productosData.js'; 

export default function AdminProductosCriticos() {
  
  const [productosCriticos, setProductosCriticos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProductosCriticos(obtenerProductosCriticos()); 
  }, []);
  
  const formatPesoChileno = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <Container fluid>
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Productos con Stock Crítico</h2>
          <p className="text-muted">Productos con 10 unidades o menos en stock.</p>
        </Col>
        <Col xs="auto" className="text-end">
          <Button variant="secondary" onClick={() => navigate('/admin/productos')}>
            <i className="bi bi-arrow-left me-1"></i> Volver a Productos
          </Button>
        </Col>
      </Row>

      {/* 2. AHORA <Alert> ESTÁ DEFINIDO Y FUNCIONARÁ */}
      {productosCriticos.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosCriticos.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.categoria}</td>
                <td>{formatPesoChileno(prod.precio)}</td>
                <td><Badge bg="danger">{prod.stock}</Badge></td>
                <td>
                  <Button variant="warning" size="sm" as={Link} to={`/admin/productos/editar/${prod.id}`}>
                    <i className="bi bi-pencil-fill me-1"></i> Editar Stock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="success">¡Excelente! No hay productos con stock crítico en este momento.</Alert>
      )}
    </Container>
  );
}