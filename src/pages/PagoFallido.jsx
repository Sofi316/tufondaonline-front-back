// src/pages/PagoFallido.jsx
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button, ListGroup } from 'react-bootstrap';

export default function PagoFallido() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get order details passed via state, provide defaults
  const { orderDetails } = location.state || { orderDetails: null };

  // Format currency
  const formatPesoChileno = (valor) => {
    if (typeof valor !== 'number') return '$NaN';
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  // Function to navigate back to checkout, potentially passing state back
  const handleRetry = () => {
    navigate('/comprar', { state: { retryOrderDetails: orderDetails } }); // Pass back details if needed for prefill
  };

  if (!orderDetails) {
    return (
      <Container className="text-center my-5">
        <Alert variant="warning">No se encontraron detalles de la orden.</Alert>
        <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
      </Container>
    );
  }

  const { orderNumber, customerInfo, items, total } = orderDetails;

  return (
    <Container className="my-5">
      <Alert variant="danger" className="text-center">
        <Alert.Heading><i className="bi bi-exclamation-triangle-fill me-2"></i> No se pudo realizar el pago</Alert.Heading>
        <p>
          Ocurrió un error al procesar tu orden <strong>#{orderNumber}</strong>. Por favor, intenta nuevamente.
        </p>
        <Button variant="warning" onClick={handleRetry} className="mt-2">
          Volver a Realizar el Pago
        </Button>
      </Alert>

      <p className="text-center text-muted">Detalle de la compra:</p>

      {/* Re-display info similar to success page */}
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header as="h5">Información del Cliente</Card.Header>
            <Card.Body>
              <p><strong>Nombre:</strong> {customerInfo.nombre} {customerInfo.apellidos}</p>
              <p><strong>Correo:</strong> {customerInfo.correo}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header as="h5">Dirección de Entrega</Card.Header>
            <Card.Body>
               <p><strong>Calle:</strong> {customerInfo.calle}{customerInfo.departamento ? `, Depto ${customerInfo.departamento}` : ''}</p>
              <p><strong>Comuna:</strong> {customerInfo.comuna}</p>
              <p><strong>Región:</strong> {customerInfo.region}</p>
              {customerInfo.indicaciones && <p><strong>Indicaciones:</strong> {customerInfo.indicaciones}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header as="h5">Productos en el Carrito</Card.Header>
        <ListGroup variant="flush">
           {items.map(item => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                <img src={item.img} alt={item.nombre} style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }} />
                {item.nombre} <span className="text-muted">x{item.cantidad}</span>
              </div>
              <span>{formatPesoChileno(item.precio * item.cantidad)}</span>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="d-flex justify-content-between">
            <strong>Total Intento:</strong>
            <strong>{formatPesoChileno(total)}</strong>
          </ListGroup.Item>
        </ListGroup>
      </Card>
       <div className="text-center mt-4">
        <Button as={Link} to="/" variant="secondary">
          Volver al Inicio
        </Button>
      </div>
    </Container>
  );
}