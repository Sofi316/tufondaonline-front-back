import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useCarrito } from '../components/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

export default function Comprar() {
  const { carrito, montoTotal, vaciarCarrito } = useCarrito();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [datosEnvio, setDatosEnvio] = useState({
    direccion: user?.direccion || '',
    comuna: user?.comuna || '',
    telefono: '',
    notas: ''
  });

  useEffect(() => {
    if (!user) navigate('/login');
    if (carrito.length === 0) navigate('/categorias');
  }, [carrito, user, navigate]);

  const handleChange = (e) => {
    setDatosEnvio({ ...datosEnvio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const ordenData = {
      usuarioId: user.id, 
      direccionEnvio: `${datosEnvio.direccion}, ${datosEnvio.comuna}. Notas: ${datosEnvio.notas}`, 
      metodoPago: "Webpay", 
      
      detalles: carrito.map(prod => ({
        productoId: prod.id,       
        cantidad: prod.cantidad,   
        precioUnitario: prod.precio 
      }))
    };

    try {
 
      const response = await api.post('/ordenes', ordenData);
      
      console.log("Orden creada ID:", response.data.id);
      
      vaciarCarrito(); 
      navigate('/pago-exitoso');

    } catch (err) {
      console.error("Error al crear la orden:", err);
      const errorMsg = err.response?.data?.message || "Hubo un problema al procesar tu pedido. Intenta nuevamente.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Container className="my-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        <Col md={7}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white fw-bold">Datos de Envío</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} id="form-compra">
                <Form.Group className="mb-3">
                  <Form.Label>Dirección de entrega</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="direccion" 
                    value={datosEnvio.direccion} 
                    onChange={handleChange} 
                    required 
                    placeholder="Ej: Av. Siempreviva 742"
                  />
                </Form.Group>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label>Comuna</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="comuna" 
                            value={datosEnvio.comuna} 
                            onChange={handleChange} 
                            required 
                            placeholder="Ej: Santiago"
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control 
                            type="tel" 
                            name="telefono" 
                            placeholder="+569..."
                            value={datosEnvio.telefono} 
                            onChange={handleChange} 
                            required 
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Notas del pedido (Opcional)</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={2} 
                    name="notas" 
                    value={datosEnvio.notas} 
                    onChange={handleChange} 
                    placeholder="Ej: Dejar en conserjería, timbre malo..."
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Método de Pago</Form.Label>
                    <Form.Select disabled>
                        <option>Webpay / Tarjeta (Simulado)</option>
                    </Form.Select>
                </Form.Group>

              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow-sm bg-light border-0">
            <Card.Body>
              <h4 className="mb-3">Resumen del Pedido</h4>
              <ul className="list-group list-group-flush mb-3 rounded">
                {carrito.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-bottom">
                        <div>
                            <small className="fw-bold">{item.nombre}</small>
                            <div className="text-muted small">x{item.cantidad}</div>
                        </div>
                        <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                    </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${montoTotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 text-success">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total a Pagar</strong>
                <strong className="fs-4 text-primary">${montoTotal.toLocaleString('es-CL')}</strong>
              </div>

              <div className="d-grid">
                <Button 
                    variant="success" 
                    size="lg" 
                    type="submit" 
                    form="form-compra" 
                    disabled={loading}
                    className="fw-bold"
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Procesando...
                    </>
                  ) : "Pagar Ahora"}
                </Button>
              </div>
              <div className="text-center mt-3">
                <small className="text-muted"><i className="bi bi-lock-fill"></i> Pago seguro encriptado</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}