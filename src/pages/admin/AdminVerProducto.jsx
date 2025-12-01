import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function AdminVerProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await api.get(`/api/productos/${id}`);
        setProducto(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Producto no encontrado.");
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  // --- FUNCIÓN PARA ELIMINAR EL PRODUCTO ---
  const handleEliminar = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.")) {
        try {
            await api.delete(`/api/productos/${id}`);
            alert("Producto eliminado correctamente.");
            navigate('/admin/productos'); 
        } catch (err) {
            console.error(err);
            alert("Hubo un error al eliminar el producto. Verifica que no tenga órdenes asociadas.");
        }
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="my-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate('/admin/productos')}>
        <i className="bi bi-arrow-left me-2"></i> Volver al listado
      </Button>

      <Card className="shadow-lg border-0">
        <Row className="g-0">
          <Col md={5}>
            <div className="h-100 bg-light d-flex align-items-center justify-content-center p-3">
               <img 
                 src={producto.img} 
                 alt={producto.nombre} 
                 style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                 onError={(e) => {e.target.src = 'https://via.placeholder.com/400?text=Sin+Imagen'}}
               />
            </div>
          </Col>
          <Col md={7}>
            <Card.Body className="p-4 p-lg-5">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <Badge bg="info" className="fs-6">{producto.categoria?.nombre || producto.categoria}</Badge>
                {producto.enOferta && <Badge bg="danger" className="fs-6">En Oferta</Badge>}
              </div>

              <h2 className="display-6 fw-bold mb-3">{producto.nombre}</h2>
              
              <div className="mb-4">
                 <span className="text-muted small">ID: {producto.id}</span>
              </div>

              <div className="mb-4">
                <h4 className="text-primary fw-bold">
                    ${producto.enOferta ? producto.precioOferta : producto.precio}
                </h4>
                {producto.enOferta && (
                    <small className="text-decoration-line-through text-muted">Normal: ${producto.precio}</small>
                )}
              </div>

              <p className="lead text-muted mb-4">
                {producto.descripcion || "Sin descripción."}
              </p>

              <hr />

              <Row className="mb-4">
                <Col xs={6}>
                    <strong>Stock Disponible:</strong>
                    <div className={`fs-5 ${producto.stock < 10 ? 'text-danger fw-bold' : 'text-success'}`}>
                        {producto.stock} unidades
                    </div>
                </Col>
                <Col xs={6}>
                    <strong>Estado:</strong>
                    <div>
                        {producto.stock > 0 ? (
                            <span className="text-success"><i className="bi bi-check-circle-fill"></i> Activo</span>
                        ) : (
                            <span className="text-danger"><i className="bi bi-x-circle-fill"></i> Agotado</span>
                        )}
                    </div>
                </Col>
              </Row>

              <div className="d-flex gap-2">
                <Button variant="warning" onClick={() => navigate(`/admin/productos/editar/${producto.id}`)}>
                    <i className="bi bi-pencil me-2"></i> Editar
                </Button>
                
                <Button variant="danger" onClick={handleEliminar}>
                    <i className="bi bi-trash me-2"></i> Eliminar
                </Button>
              </div>

            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}