import React from 'react';
import { Container, Table, Button, Card, Row, Col } from 'react-bootstrap';
import { useCarrito } from '../components/CarritoContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Carrito() {
  const { 
    carrito, 
    eliminarDelCarrito, 
    actualizarCantidad, 
    montoTotal, 
    vaciarCarrito 
  } = useCarrito();
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProcederPago = () => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con la compra.");
      navigate('/iniciarSesion');
    } else {
      navigate('/comprar');
    }
  };

  if (carrito.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p className="text-muted">¡Agrega nuestras deliciosas preparaciones!</p>
        <Button as={Link} to="/categorias" variant="primary">Ir al Menú</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Tu Pedido</h2>
      <Row>
        <Col lg={8}>
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cant.</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.img} 
                          alt={item.nombre} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', borderRadius: '5px' }} 
                        />
                        <span>{item.nombre}</span>
                      </div>
                    </td>
                    <td>${item.precio.toLocaleString('es-CL')}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </Button>
                        <span>{item.cantidad}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button variant="outline-danger" size="sm" onClick={vaciarCarrito}>
            Vaciar Carrito
          </Button>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mt-3 mt-lg-0">
            <Card.Header className="bg-light fw-bold">Resumen de Compra</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Total a Pagar:</span>
                <span className="fw-bold fs-4">${montoTotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-grid">
                <Button variant="success" size="lg" onClick={handleProcederPago}>
                  Ir a Pagar
                </Button>
              </div>
              <div className="mt-3 text-center">
                 <small className="text-muted">
                    <i className="bi bi-shield-lock-fill me-1"></i>Pago 100% Seguro
                 </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}