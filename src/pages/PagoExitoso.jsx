import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button, ListGroup } from 'react-bootstrap';
import BotonDescargarBoleta from '../components/BotonDescargarBoleta';

export default function PagoExitoso() {
  const location = useLocation();
  const { orderDetails } = location.state || { orderDetails: null };

  const formatPesoChileno = (valor) => {
    if (typeof valor !== 'number') return '$NaN';
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
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
      <Alert variant="success" className="text-center">
        <Alert.Heading>¡Compra Exitosa!</Alert.Heading>
        <p>
            Se ha realizado la compra. Tu número de orden es: <strong>#{orderNumber}</strong>
        </p>
         
        <BotonDescargarBoleta orderDetails={orderDetails} />
      </Alert>

       
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
        <Card.Header as="h5">Resumen de la Compra</Card.Header>
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
            <strong>Total Pagado:</strong>
            <strong>{formatPesoChileno(total)}</strong>
          </ListGroup.Item>
        </ListGroup>
      </Card>

       
      <div className="text-center mt-4">
        <Button as={Link} to="/" variant="primary">
          Volver al Inicio
        </Button>
      </div>
    </Container>
  );
}