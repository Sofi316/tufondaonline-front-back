// src/pages/admin/AdminVerProducto.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { obtenerProducto } from '../../data/productosData.js'; // Ajusta ruta

export default function AdminVerProducto() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const data = obtenerProducto(id);
    if (data) {
      setProducto(data);
    } else {
      // Si no se encuentra el producto, redirigir o mostrar error
      navigate('/admin/productos'); 
    }
  }, [id, navigate]);

  const formatPesoChileno = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  const getStockBadge = (stock) => {
    if (stock <= 10) return <Badge bg="danger">Crítico ({stock})</Badge>;
    if (stock <= 20) return <Badge bg="warning">Bajo ({stock})</Badge>;
    return <Badge bg="success">OK ({stock})</Badge>;
  };

  if (!producto) {
    return <Container fluid><p>Cargando producto...</p></Container>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Detalle de Producto: {producto.nombre}</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/admin/productos')}>
            <i className="bi bi-arrow-left me-1"></i> Volver a Productos
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Row className="g-0">
          <Col md={4}>
            {/* Si 'img' es un import, necesita manejo diferente, asumimos URL */}
            <Card.Img 
              variant="top" 
              src={producto.img || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
              alt={producto.nombre}
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title as="h3">{producto.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{producto.categoria}</Card.Subtitle>
              <hr />
              <p><strong>ID:</strong> {producto.id}</p>
              <p><strong>Precio:</strong> {formatPesoChileno(producto.precio)}</p>
              <p><strong>Stock:</strong> {getStockBadge(producto.stock)}</p>
              <p><strong>URL Detalle (Slug):</strong> {producto.detalle || 'No definido'}</p>
              <p><strong>URL Imagen:</strong> {producto.img || 'No definida'}</p>
              
              <div className="text-end mt-3">
                <Button variant="warning" as={Link} to={`/admin/productos/editar/${producto.id}`}>
                  <i className="bi bi-pencil-fill me-2"></i> Editar Producto
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}