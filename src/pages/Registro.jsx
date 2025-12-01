import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../config/api'; 

export default function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    email: '',
    fechaNac: '',
    direccion: '',
    region: '', 
    comuna: '', 
    password: '',
    confirmPassword: '',
    tipo: 'cliente' 
  });

  const [listaRegiones, setListaRegiones] = useState([]);
  const [listaComunas, setListaComunas] = useState([]);
  
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("success");

  useEffect(() => {
    const cargarRegiones = async () => {
      try {
        const response = await api.get('/regiones');
        setListaRegiones(response.data);
      } catch (error) {
        console.error("Error cargando regiones:", error);
        setMensaje("Error cargando regiones. Verifique conexión.");
        setVariant("danger");
      }
    };
    cargarRegiones();
  }, []);

  useEffect(() => {
    const cargarComunas = async () => {
      if (!formData.region) {
        setListaComunas([]);
        return;
      }
      try {
        // Asumiendo que tu backend tiene un endpoint para filtrar comunas por región
        // Puede ser /comunas/{idRegion} o /comunas?regionId={id}
        // Ajusta esta línea según tu API real:
        const response = await api.get(`/comunas/${formData.region}`); 
        setListaComunas(response.data);
      } catch (error) {
        console.error("Error cargando comunas:", error);
      }
    };
    cargarComunas();
  }, [formData.region]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (formData.password !== formData.confirmPassword) {
      setMensaje("Las contraseñas no coinciden");
      setVariant("danger");
      return;
    }

    try {
    
      await api.post('/register', formData); 
      
      setMensaje("Usuario registrado exitosamente. Redirigiendo al login...");
      setVariant("success");
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error(error);
      setMensaje(error.response?.data?.message || "Error al registrar el usuario");
      setVariant("danger");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Crear Cuenta</h2>
              
              {mensaje && <Alert variant={variant}>{mensaje}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>RUT</Form.Label>
                      <Form.Control type="text" name="rut" onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" name="nombre" onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control type="text" name="apellidos" onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                   <Form.Label>Fecha de Nacimiento</Form.Label>
                   <Form.Control type="date" name="fechaNac" onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" name="direccion" onChange={handleChange} required />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Región</Form.Label>
                      <Form.Select name="region" onChange={handleChange} value={formData.region} required>
                        <option value="">Seleccione...</option>
                        {listaRegiones.map(reg => (
                          <option key={reg.id} value={reg.id}>{reg.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Comuna</Form.Label>
                      <Form.Select name="comuna" onChange={handleChange} required disabled={!formData.region}>
                        <option value="">Seleccione...</option>
                        {listaComunas.map(com => (
                          <option key={com.id} value={com.id}>{com.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" name="password" onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Contraseña</Form.Label>
                      <Form.Control type="password" name="confirmPassword" onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                    <Form.Label>Tipo de Cuenta</Form.Label>
                    <Form.Select name="tipo" onChange={handleChange}>
                        <option value="cliente">Cliente</option>
                        <option value="vendedor">Vendedor</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Registrarse
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