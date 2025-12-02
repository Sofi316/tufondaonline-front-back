import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../config/api'; 
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVentas: 0,
    totalOrdenes: 0,
    totalProductos: 0,
    totalUsuarios: 0
  });
  const [ordenesRecientes, setOrdenesRecientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        
        const [resProd, resUser, resOrdenes] = await Promise.all([
          api.get('/api/productos'),
          api.get('/api/usuarios'),
          api.get('/api/ordenes') 
        ]);

        const ordenes = resOrdenes.data || [];
        const productos = resProd.data || [];
        const usuarios = resUser.data || [];

        const ventasTotales = ordenes.reduce((acc, ord) => acc + (ord.total || 0), 0);

        setStats({
          totalVentas: ventasTotales,
          totalOrdenes: ordenes.length,
          totalProductos: productos.length,
          totalUsuarios: usuarios.length
        });

        const recientes = [...ordenes].sort((a, b) => b.id - a.id).slice(0, 5);
        setOrdenesRecientes(recientes);

        setLoading(false);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container fluid>
      <h2 className="mb-4">Panel de Control</h2>

      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="text-white bg-primary h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase mb-1">Ventas Totales</h6>
                  <h3 className="mb-0">${stats.totalVentas.toLocaleString('es-CL')}</h3>
                </div>
                <i className="bi bi-currency-dollar fs-1 opacity-50"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-success h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase mb-1">Órdenes</h6>
                  <h3 className="mb-0">{stats.totalOrdenes}</h3>
                </div>
                <i className="bi bi-bag-check fs-1 opacity-50"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-warning h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase mb-1">Productos</h6>
                  <h3 className="mb-0">{stats.totalProductos}</h3>
                </div>
                <i className="bi bi-box-seam fs-1 opacity-50"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-info h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase mb-1">Usuarios</h6>
                  <h3 className="mb-0">{stats.totalUsuarios}</h3>
                </div>
                <i className="bi bi-people fs-1 opacity-50"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Órdenes Recientes</h5>
          <Button as={Link} to="/admin/ordenes" variant="outline-primary" size="sm">Ver Todas</Button>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Usuario ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {ordenesRecientes.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-3">No hay órdenes recientes.</td></tr>
              ) : (
                ordenesRecientes.map(ord => (
                  <tr key={ord.id}>
                    <td>#{ord.id}</td>
                    <td>{ord.usuario?.id}</td>
                    <td>{ord.fecha ? new Date(ord.fecha).toLocaleDateString() : '-'}</td>
                    <td>${ord.total ? ord.total.toLocaleString('es-CL') : 0}</td>
                    <td><span className="badge bg-secondary">{ord.estado || 'Procesando'}</span></td>
                    <td>
                      <Link to={`/admin/ordenes/${ord.id}`} className="btn btn-sm btn-info text-white">
                        <i className="bi bi-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}