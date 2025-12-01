import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function AdminCrearUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rut: '', email: '', nombre: '', apellidos: '', 
    fechaNac: '', direccion: '', 
    region: '', comuna: '', 
    password: '', rol: 'cliente'
  });

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("success");

  useEffect(() => {
    api.get('/api/regiones').then(res => setRegiones(res.data));
  }, []);

  
  useEffect(() => {
    if (formData.region) {
      // Ajusta la ruta si tu backend usa /comunas?regionId=...
      api.get(`/api/comunas/${formData.region}`)
         .then(res => setComunas(res.data))
         .catch(() => setComunas([]));
    } else {
      setComunas([]);
    }
  }, [formData.region]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      await api.post('/api/usuarios', formData);
      setVariant("success");
      setMensaje("Usuario registrado correctamente.");
      
      setFormData({
        rut: '', email: '', nombre: '', apellidos: '', 
        fechaNac: '', direccion: '', region: '', comuna: '', 
        password: '', rol: 'cliente'
      });

    } catch (error) {
      setVariant("danger");
      setMensaje(error.response?.data?.message || "Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h2>Registrar Nuevo Usuario</h2>
          <Button variant="outline-secondary" size="sm" onClick={() => navigate('/admin/usuarios')}>
            <i className="bi bi-arrow-left me-1"></i> Ver Usuarios
          </Button>
        </Col>
      </Row>

      {mensaje && <Alert variant={variant} dismissible onClose={() => setMensaje("")}>{mensaje}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md={6}>
                <Form.Label>RUT</Form.Label>
                <Form.Control name="rut" value={formData.rut} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md={6}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control name="apellidos" value={formData.apellidos} onChange={handleChange} required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
               <Col md={6}>
                 <Form.Group>
                   <Form.Label>Región</Form.Label>
                   <Form.Select name="region" value={formData.region} onChange={handleChange} required>
                     <option value="">Seleccione...</option>
                     {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                   </Form.Select>
                 </Form.Group>
               </Col>
               <Col md={6}>
                 <Form.Group>
                   <Form.Label>Comuna</Form.Label>
                   <Form.Select name="comuna" value={formData.comuna} onChange={handleChange} required disabled={!formData.region}>
                     <option value="">Seleccione...</option>
                     {comunas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                   </Form.Select>
                 </Form.Group>
               </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md={6}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
              
              <Form.Group as={Col} md={6}>
                <Form.Label>Rol</Form.Label>
                <Form.Select name="rol" value={formData.rol} onChange={handleChange}>
                  <option value="cliente">Cliente</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="administrador">Administrador</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <div className="text-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : "Crear Usuario"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}