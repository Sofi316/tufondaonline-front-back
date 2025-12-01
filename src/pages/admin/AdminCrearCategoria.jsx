import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

export default function AdminCrearCategoria() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      await api.post('/categorias', { nombre });
      
      setMensaje("Categoría creada exitosamente.");
      setTimeout(() => {
        navigate('/admin/categorias');
      }, 1000);

    } catch (error) {
      console.error(error);
      setMensaje("Error al crear la categoría.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-center mb-3">
             <h3>Nueva Categoría</h3>
             <Button variant="secondary" size="sm" onClick={() => navigate('/admin/categorias')}>
                Cancelar
             </Button>
          </div>

          {mensaje && <Alert variant={mensaje.includes("Error") ? "danger" : "success"}>{mensaje}</Alert>}

          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Nombre de la Categoría</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ej: Bebidas, Postres..." 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Guardar Categoría"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}