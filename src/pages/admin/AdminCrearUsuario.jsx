import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function AdminCrearUsuario() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rut: '',
    email: '',
    nombre: '',
    apellidos: '',
    fechaNac: '',
    direccion: '',
    region: '',
    comuna: '',
    rol: 'CLIENTE',
    password: ''
  });

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    api.get('/api/regiones').then(res => setRegiones(res.data));
  }, []);

  const handleRegionChange = async (e) => {
    const regionId = e.target.value;
    setFormData({ ...formData, region: regionId, comuna: "" });

    if (regionId) {
      const res = await api.get(`/api/comunas/${regionId}`);
      setComunas(res.data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const payload = {
      ...formData,
      nombre: `${formData.nombre} ${formData.apellidos}`.trim(),
      region: { id: parseInt(formData.region) },
      comuna: { id: parseInt(formData.comuna) }
    };

    delete payload.apellidos;

    try {
      await api.post('/api/usuarios', payload);
      alert("Usuario creado correctamente");
      navigate("/admin/usuarios");
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear el usuario.");
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-3">Crear Usuario</h2>

      {mensaje && <Alert variant="danger">{mensaje}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>RUT</Form.Label>
                <Form.Control name="rut" value={formData.rut} onChange={handleChange} required />
              </Col>

              <Col md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Col>

              <Col md={6}>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control name="apellidos" value={formData.apellidos} onChange={handleChange} required />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
              <Form.Label>Dirección</Form.Label>
              <Form.Control 
                  name="direccion" 
                  value={formData.direccion} 
                  onChange={handleChange} 
                  required 
              />
              </Col>
              <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" name="fechaNac" onChange={handleChange} required />
              </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Región</Form.Label>
                <Form.Select name="region" value={formData.region} onChange={handleRegionChange} required>
                  <option value="">Seleccione...</option>
                  {regiones.map(r => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Comuna</Form.Label>
                <Form.Select
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  required
                  disabled={!formData.region}
                >
                  <option value="">Seleccione...</option>
                  {comunas.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Rol</Form.Label>
                <Form.Select name="rol" value={formData.rol} onChange={handleChange}>
                  <option value="CLIENTE">Cliente</option>
                  <option value="VENDEDOR">Vendedor</option>
                  <option value="ADMINISTRADOR">Administrador</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <div className="d-grid">
              <Button type="submit" variant="success">Crear Usuario</Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
