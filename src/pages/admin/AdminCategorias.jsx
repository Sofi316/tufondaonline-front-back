import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../config/api'; 
export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarCategorias = async () => {
    try {
      const response = await api.get('/api/categorias');
      setCategorias(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error al cargar categorías.");
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta categoría?")) {
      try {
        await api.delete(`/api/categorias/${id}`);
        setCategorias(categorias.filter(c => c.id !== id));
      } catch (err) {
        alert("No se puede eliminar. Es posible que tenga productos asociados.");
      }
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container fluid>
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>Gestión de Categorías</h2>
        </Col>
        <Col className="text-end">
          <Button as={Link} to="/admin/categorias/nueva" variant="success">
            <i className="bi bi-plus-lg me-2"></i>Nueva Categoría
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="m-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Nombre Categoría</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td className="fw-bold">{cat.nombre}</td>
                  <td className="text-end">
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => handleEliminar(cat.id)}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              {categorias.length === 0 && (
                <tr><td colSpan="3" className="text-center py-4">No hay categorías registradas.</td></tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}