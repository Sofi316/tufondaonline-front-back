import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// --- DATOS SIMULADOS PARA EL GRÁFICO ---

const ventasPorCategoria = [
  { nombre: 'Plato con Carne', ventas: 75, color: 'primary' },
  { nombre: 'Plato sin carne', ventas: 50, color: 'success' },
  { nombre: 'Bebestible', ventas: 90, color: 'info' },
];



export default function AdminReportesProductos() {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Reportes de Productos</h2>
        </Col>
        <Col xs="auto" className="text-end">
          <Button variant="secondary" onClick={() => navigate('/admin/productos')}>
            <i className="bi bi-arrow-left me-1"></i> Volver a Productos
          </Button>
        </Col>
      </Row>

  
      <Row>
        <Col md={8} className="mx-auto"> 
          <Card className="shadow-sm">
            <Card.Header>
              <Card.Title as="h5">Ventas Estimadas por Categoría (Último Mes)</Card.Title>
            </Card.Header>
            <Card.Body>
              {ventasPorCategoria.map((categoria, index) => (
                <div key={index} className="mb-3">
                  <strong>{categoria.nombre}</strong>
                  <ProgressBar 
                    now={categoria.ventas} 
                    label={`${categoria.ventas}%`} 
                    variant={categoria.color} 
                    animated 
                    className="mt-1"
                  />
                </div>
              ))}
              <p className="text-muted mt-3 small">
                *Datos simulados. Representan un porcentaje estimado de participación en ventas.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
}