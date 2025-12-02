import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function AdminVerOrden() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orden, setOrden] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [productosMap, setProductosMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordenRes = await api.get(`/api/ordenes/${id}`);
        setOrden(ordenRes.data);

        const detalleRes = await api.get(`/api/detalle_orden/orden/${id}`);
        setDetalles(detalleRes.data);

        const prodRes = await api.get('/api/productos');
        const mapa = {};
        prodRes.data.forEach(p => mapa[p.id] = p);
        setProductosMap(mapa);

        setLoading(false);
      } catch (err) {
        setError("No se pudo cargar la información de la orden.");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!orden) return null;

  return (
    <Container className="my-4">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/admin/ordenes')}>
        <i className="bi bi-arrow-left me-2"></i> Volver a Órdenes
      </Button>

      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Orden #{orden.id}</h4>
          <Badge bg="light" text="dark" className="fs-6">{orden.estado || "Procesando"}</Badge>
        </Card.Header>

        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <h5 className="text-muted">Datos del Cliente</h5>
              <p className="mb-1"><strong>ID Usuario:</strong> {orden.usuario?.id}</p>              <h5 className="text-muted mt-3">Detalles de Envío</h5>
              <p>{orden.direccionEnvio}</p>
            </Col>

            <Col md={6} className="text-md-end">
              <h5 className="text-muted">Resumen</h5>
              <p className="mb-1"><strong>Fecha:</strong> {orden.fecha ? new Date(orden.fecha).toLocaleDateString() : '-'}</p>
              <p className="mb-1"><strong>Método Pago:</strong> {orden.metodoPago}</p>
              <h3 className="text-success mt-2">${orden.total ? orden.total.toLocaleString('es-CL') : 0}</h3>
            </Col>
          </Row>

          <h5 className="mb-3">Productos Comprados</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th className="text-center">Precio Unit.</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {detalles.map((detalle, index) => {
                const productoInfo = productosMap[detalle.producto.id];
                return (
                  <tr key={detalle.id || index}>
                    <td>
                      <div className="d-flex align-items-center">
                        {productoInfo && (
                          <img src={productoInfo.img} alt="" style={{ width: '40px', marginRight: '10px' }} />
                        )}
                        <strong>{productoInfo ? productoInfo.nombre : `Producto ${detalle.producto.id}`}</strong>
                      </div>
                    </td>
                    <td className="text-center">${detalle.precio.toLocaleString('es-CL')}</td>
                    <td className="text-center">{detalle.cantidad}</td>
                    <td className="text-end">${(detalle.precio * detalle.cantidad).toLocaleString('es-CL')}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>

        <Card.Footer className="text-end">
          <Button variant="success" onClick={() => window.print()}>
            <i className="bi bi-printer me-2"></i> Imprimir Comprobante
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
