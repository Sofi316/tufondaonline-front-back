import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useCarrito } from '../components/CarritoContext'; // Ojo con la ruta si moviste el archivo
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
    comuna: user?.comuna?.nombre || '', 
    telefono: '',
    notas: ''
  });

  useEffect(() => {
    if (!user) navigate('/iniciarSesion');
    if (carrito.length === 0) navigate('/categorias');
  }, [carrito, user, navigate]);

  const handleChange = (e) => {
    setDatosEnvio({ ...datosEnvio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
        // PASO 1: Crear la CABECERA de la Orden
        // Aquí arreglamos el error 500 enviando el 'total' y el 'estado'
        const ordenResponse = await api.post('/api/ordenes', {
            total: montoTotal,    // <--- ¡ESTO FALTABA! (Por eso el error 500)
            estado: "PENDIENTE"
            
        });
        
        const idOrdenCreada = ordenResponse.data.id;
        console.log("Orden creada con ID:", idOrdenCreada);

        // PASO 2: Crear los DETALLES (Productos) uno por uno
        // Recorremos el carrito y enviamos cada producto al backend
        const promesasDetalles = carrito.map(prod => {
            return api.post('/api/detalle_orden', {
                orden: { id: idOrdenCreada },
                producto: { id: prod.id },
                cantidad: prod.cantidad,
                precio: prod.precio
            });
        });

        // Esperamos a que se guarden todos los productos
        await Promise.all(promesasDetalles);
      
        // PASO 3: Finalizar
        vaciarCarrito(); 
        navigate('/pago-exitoso');

    } catch (err) {
      console.error("Error al comprar:", err);
      const errorMsg = err.response?.data?.message || "Error al procesar la compra. Intenta nuevamente.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Container className="my-5">
      <h2 className="mb-4 texto-azul">Finalizar Compra</h2>
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
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
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