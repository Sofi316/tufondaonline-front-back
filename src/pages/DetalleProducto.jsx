import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useCarrito } from '../components/CarritoContext';
import api from '../config/api';

export default function DetalleProducto() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await api.get(`/productos/${id}`);
        setProducto(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Producto no encontrado");
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !producto) {
    return (
      <Container className="text-center mt-5">
        <h3>{error || "Producto no encontrado"}</h3>
        <Button variant="secondary" onClick={() => navigate('/categorias')}>
            Volver al catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Volver atrás
      </Button>

      <Card className="shadow-lg border-0 overflow-hidden">
        <Row className="g-0">
          <Col md={6}>
            <div style={{ height: '500px', backgroundColor: '#f8f9fa' }}>
                <img 
                  src={producto.img} 
                  alt={producto.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/500?text=Sin+Imagen'; }} 
                />
            </div>
          </Col>
          <Col md={6}>
            <Card.Body className="p-5 d-flex flex-column h-100">
              <div>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="info" className="mb-2">{producto.categoria?.nombre || "General"}</Badge>
                    {producto.enOferta && <Badge bg="danger">¡OFERTA!</Badge>}
                </div>
                
                <h1 className="display-5 fw-bold mb-3">{producto.nombre}</h1>
                
                <div className="mb-4">
                    {producto.enOferta ? (
                        <>
                            <span className="text-decoration-line-through text-muted fs-4 me-3">
                                ${producto.precio.toLocaleString('es-CL')}
                            </span>
                            <span className="text-danger fw-bold display-6">
                                ${producto.precioOferta.toLocaleString('es-CL')}
                            </span>
                        </>
                    ) : (
                        <span className="fw-bold display-6 text-primary">
                            ${producto.precio.toLocaleString('es-CL')}
                        </span>
                    )}
                </div>

                <p className="lead text-muted mb-4">
                  {producto.descripcion || "Sin descripción disponible."}
                </p>
                
                <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
              </div>

              <div className="mt-auto d-grid gap-2">
                <Button 
                    variant="success" 
                    size="lg" 
                    onClick={() => agregarAlCarrito(producto)}
                    disabled={producto.stock <= 0}
                >
                  <i className="bi bi-cart-plus me-2"></i> 
                  {producto.stock > 0 ? "Agregar al Carrito" : "Sin Stock"}
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}