import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Badge, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api'; 

export default function AdminProductosCriticos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const STOCK_CRITICO = 10; 

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await api.get('/productos');
        const criticos = response.data.filter(p => p.stock <= STOCK_CRITICO);
        setProductos(criticos);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Stock Crítico</h2>
        <Button variant="outline-secondary" size="sm" onClick={() => navigate('/admin/productos')}>
          <i className="bi bi-arrow-left me-2"></i>Volver al Inventario
        </Button>
      </div>

      {productos.length === 0 ? (
        <Alert variant="success">
          <i className="bi bi-check-circle me-2"></i>
          ¡Excelente! No hay productos con stock crítico.
        </Alert>
      ) : (
        <>
          <Alert variant="warning" className="mb-4">
            Atención: Hay <strong>{productos.length}</strong> productos que requieren reposición inmediata.
          </Alert>

          <Table striped hover responsive className="shadow-sm bg-white">
            <thead className="bg-light">
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock Actual</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria?.nombre || p.categoria || 'General'}</td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td className="fw-bold text-danger">{p.stock}</td>
                  <td>
                    {p.stock === 0 ? (
                      <Badge bg="danger">AGOTADO</Badge>
                    ) : (
                      <Badge bg="warning" text="dark">Bajo Stock</Badge>
                    )}
                  </td>
                  <td>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => navigate(`/admin/productos/editar/${p.id}`)} 
                    >
                      <i className="bi bi-box-seam me-1"></i> Reponer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}