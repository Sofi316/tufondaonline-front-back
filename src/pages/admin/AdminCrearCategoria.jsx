import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../utils/AdminCrearCategoria.logic.js'; // <-- Importa la lógica externa

export default function AdminCrearCategoria() {
  const navigate = useNavigate();
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Crear Nueva Categoría</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/admin/categorias')}
          >
            <i className="bi bi-arrow-left me-1"></i> Volver a Categorías
          </Button>
        </Col>
      </Row>

      {mensaje && (
        <Row>
          <Col lg={8} className="mx-auto">
            <Alert
              variant={tipoMensaje}
              onClose={() => setMensaje("")}
              dismissible
            >
              {mensaje}
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  const result = window.AdminCrearCategoriaLogic.handleSubmit(
                    e,
                    nombreCategoria,
                    setMensaje,
                    setTipoMensaje,
                    setNombreCategoria,
                    navigate
                  );
                  if (result) {
                    setTipoMensaje(result.tipoMensaje);
                    setMensaje(result.mensaje);
                    if (result.reset) setNombreCategoria("");
                  }
                }}
                noValidate
              >
                <Form.Group controlId="formCategoriaNombre" className="mb-3">
                  <Form.Label>Nombre de la Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Postres"
                    value={nombreCategoria}
                    onChange={(e) =>
                      window.AdminCrearCategoriaLogic.handleChange(
                        e,
                        setNombreCategoria,
                        setMensaje
                      )
                    }
                    required
                  />
                  <Form.Text className="text-muted">
                    Ingrese el nombre de la nueva categoría que desea crear.
                  </Form.Text>
                </Form.Group>

                <div className="text-end">
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
