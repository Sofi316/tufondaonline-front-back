

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function AdminCrearCategoria() {
  
  const navigate = useNavigate();
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  const handleChange = (e) => {
    setMensaje(""); 
    setNombreCategoria(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombreCategoria.trim()) {
      setTipoMensaje("danger");
      setMensaje("Error: El nombre de la categoría no puede estar vacío.");
      return;
    }

    console.log("Nueva categoría a crear:", nombreCategoria); 
    setTipoMensaje("success");
   
    setMensaje(`¡Categoría "${nombreCategoria}" creada exitosamente!`); 
    setNombreCategoria(""); 

    setTimeout(() => navigate('/admin/categorias'), 2000); 
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Nueva Categoría</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/admin/categorias')}>
            <i className="bi bi-arrow-left me-1"></i> Volver a Categorías
          </Button>
        </Col>
      </Row>

      {mensaje && (
        <Alert variant={tipoMensaje} onClose={() => setMensaje("")} dismissible>
          {mensaje}
        </Alert>
      )}

      <Row>
        <Col md={8} lg={6} className="mx-auto"> 
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="formNombreCategoria">
                  <Form.Label>Nombre de la Nueva Categoría</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ej: Postres" 
                    value={nombreCategoria}
                    onChange={handleChange}
                    required 
                  />
                  <Form.Text className="text-muted">
                    Esta categoría estará disponible al crear o editar productos.
                  </Form.Text>
                </Form.Group>

                <div className="text-end mt-3">
                  <Button variant="primary" type="submit">
                    Crear Categoría
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