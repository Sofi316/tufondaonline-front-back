import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { createUsuario } from '../../data/usersData.js';
import { getRegiones, getComunas } from '../../data/datos.js';
import '../../utils/AdminCrearUsuario.logic.js'; 

export default function AdminCrearUsuario() {

  const initialState = {
    rut: '', email: '', nombre: '', apellidos: '', fechaNac: '',
    direccion: '', region: '', comuna: '', contraseña: '',
    contraseñaCon: '', tipo: 'cliente'
  };

  const [formData, setFormData] = useState(initialState);
  const [listaRegiones, setListaRegiones] = useState([]);
  const [listaComunas, setListaComunas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    setListaRegiones(getRegiones());
  }, []);

  useEffect(() => {
    if (formData.region) {
      setListaComunas(getComunas(formData.region));
    } else {
      setListaComunas([]);
    }
    setFormData(prev => ({ ...prev, comuna: '' }));
  }, [formData.region]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Crear Nuevo Usuario</h2>
          <p className="text-muted">
            Complete el formulario para registrar un nuevo usuario en el sistema.
          </p>
        </Col>
      </Row>

      {mensaje && (
        <Row>
          <Col lg={10} className="mx-auto">
            <Alert variant={tipoMensaje} onClose={() => setMensaje("")} dismissible>
              {mensaje}
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={10} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  const result = window.AdminCrearUsuarioLogic.handleSubmit(
                    e,
                    formData,
                    createUsuario,
                    initialState
                  );
                  if (result) {
                    setTipoMensaje(result.tipoMensaje);
                    setMensaje(result.mensaje);
                    if (result.reset) setFormData(initialState);
                  }
                }}
                noValidate
              >

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formRut">
                    <Form.Label>RUT</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese RUT"
                      name="rut"
                      value={formData.rut}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId="formEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingrese correo"
                      name="email"
                      value={formData.email}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId="formApellidos">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formFechaNac">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      name="fechaNac"
                      value={formData.fechaNac}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId="formDireccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese dirección"
                      name="direccion"
                      value={formData.direccion}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formRegion">
                    <Form.Label>Región</Form.Label>
                    <Form.Select
                      name="region"
                      value={formData.region}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    >
                      <option value="">Seleccione una región</option>
                      {listaRegiones.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId="formComuna">
                    <Form.Label>Comuna</Form.Label>
                    <Form.Select
                      name="comuna"
                      value={formData.comuna}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                      disabled={listaComunas.length === 0}
                    >
                      <option value="">
                        {formData.region ? "Seleccione una comuna" : "Seleccione una región"}
                      </option>
                      {listaComunas.map(comuna => (
                        <option key={comuna} value={comuna}>{comuna}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md={4} controlId="formPass1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      name="contraseña"
                      value={formData.contraseña}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={4} controlId="formPass2">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirme contraseña"
                      name="contraseñaCon"
                      value={formData.contraseñaCon}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={4} controlId="formTipo">
                    <Form.Label>Tipo de Usuario</Form.Label>
                    <Form.Select
                      name="tipo"
                      value={formData.tipo}
                      onChange={(e) => window.AdminCrearUsuarioLogic.handleChange(e, setFormData, setMensaje)}
                      required
                    >
                      <option value="cliente">Cliente</option>
                      <option value="vendedor">Vendedor</option>
                      <option value="administrador">Administrador</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <div className="text-end">
                  <Button variant="primary" type="submit">
                    Crear Usuario
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
