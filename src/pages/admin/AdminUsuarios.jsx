import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import api from '../../config/api';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarUsuarios = async () => {
    try {
      const response = await api.get('/api/usuarios');
      setUsuarios(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los usuarios.");
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.")) {
      try {
        await api.delete(`/api/usuarios/${id}`);
        cargarUsuarios(); 
      } catch (err) {
        alert("Error al eliminar usuario.");
      }
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Gestión de Usuarios</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="m-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>RUT</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre} {user.apellidos}</td>
                  <td>{user.email}</td>
                  <td>{user.rut}</td>
                  <td>
                    {/* Ajusta según si guardas 'administrador' o 'ROLE_ADMIN' */}
                    {user.rol === 'ADMINISTRADOR' ? (
                        <Badge bg="danger">Admin</Badge>
                    ) : user.rol === 'VENDEDOR' ? (
                        <Badge bg="warning" text="dark">Vendedor</Badge>
                    ) : (
                        <Badge bg="primary">Cliente</Badge>
                    )}
                  </td>
                  <td>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleEliminar(user.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                  <tr>
                      <td colSpan="6" className="text-center py-4">No hay usuarios registrados.</td>
                  </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}