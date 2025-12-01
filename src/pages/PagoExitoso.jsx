import React, { useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCarrito } from '../components/CarritoContext'; 

export default function PagoExitoso() {
  const { vaciarCarrito } = useCarrito();

  useEffect(() => {
    vaciarCarrito();
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Card className="text-center shadow p-5 border-0" style={{ maxWidth: '500px' }}>
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
        </div>
        <Card.Title as="h2" className="mb-3">¡Pago Realizado!</Card.Title>
        <Card.Text className="text-muted mb-4">
          Tu pedido ha sido procesado exitosamente. Hemos enviado un comprobante a tu correo electrónico.
          ¡Gracias por preferir la Fonda Online!
        </Card.Text>
        <div className="d-grid gap-2">
          <Button as={Link} to="/" variant="success" size="lg">
            Volver al Inicio
          </Button>
          <Button as={Link} to="/categorias" variant="outline-secondary">
            Seguir Comprando
          </Button>
        </div>
      </Card>
    </Container>
  );
}