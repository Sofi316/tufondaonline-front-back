import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cargarUsuarios = async () => {
    try {
      const response = await api.get('/api/usuarios');
      setUsuarios(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error al cargar la lista de usuarios. Verifica que el token sea de Admin.");
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await api.delete(`/api/usuarios/${id}`);
        setUsuarios(usuarios.filter(u => u.id !== id));
      } catch (err) {
        alert("Error al eliminar. Puede que el usuario tenga órdenes asociadas.");
      }
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container fluid className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>Gestión de Usuarios</h2>
        </Col>
        <Col className="text-end">
          <Button as={Link} to="/admin/usuarios/crearUser" variant="success">
            <i className="bi bi-person-plus-fill me-2"></i>Nuevo Usuario
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
                <th>Nombre Completo</th>
                <th>RUT</th>
                <th>Email</th>
                <th>Rol</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.rut}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.rol === 'ADMINISTRADOR'? <Badge bg="danger">Admin</Badge> :
                     u.rol === 'VENDEDOR'? <Badge bg="warning" text="dark">Vendedor</Badge> :
                     <Badge bg="primary">Cliente</Badge>}
                  </td>
                  <td className="text-end">
                    <Button 
                      variant="outline-warning" 
                      size="sm" 
                      className="me-2"
                      onClick={() => navigate(`/admin/usuarios/editar/${u.id}`)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleEliminar(u.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
