import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import '../utils/Registro.logic.js'; // 👈 importante

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
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("success");

  const [listaRegiones, setListaRegiones] = useState([]);
  const [listaComunas, setListaComunas] = useState([]);

  // -------------------------
  // VALIDACIÓN EN VIVO
  // -------------------------
  const validarCampo = (name, value) => {
    let msg = "";

    switch (name) {
      case "rut":
        if (!value) msg = "El RUT es requerido.";
        else if (!window.RegistroLogic.validarRUT(value))
          msg = "RUT inválido (ej: 12345678-K).";
        break;

      case "email":
        if (!value) msg = "El correo es requerido.";
        else if (!/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(value))
          msg = "Correo inválido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
        break;

      case "nombre":
        if (!value) msg = "El nombre es requerido.";
        else if (value.length > 50) msg = "Máximo 50 caracteres.";
        break;

      case "apellidos":
        if (!value) msg = "Los apellidos son requeridos.";
        else if (value.length > 100) msg = "Máximo 100 caracteres.";
        break;

      case "fechaNac":
        if (!value) msg = "La fecha de nacimiento es requerida.";
        else {
          const edad = window.RegistroLogic.calcularEdad(value);
          if (edad < 18) msg = "Debes tener al menos 18 años.";
        }
        break;

      case "direccion":
        if (!value) msg = "La dirección es requerida.";
        else if (value.length > 300) msg = "Máximo 300 caracteres.";
        break;

      case "region":
        if (!value) msg = "Debes seleccionar una región.";
        break;

      case "comuna":
        if (!value) msg = "Debes seleccionar una comuna.";
        break;

      case "password":
        if (!value) msg = "La contraseña es requerida.";
        else if (value.length < 4 || value.length > 10)
          msg = "Debe tener entre 4 y 10 caracteres.";
        break;

      case "confirmPassword":
        if (value !== formData.password)
          msg = "Las contraseñas no coinciden.";
        break;

      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: msg }));
  };

  const validarTodo = () => {
    const nuevos = {};

    Object.keys(formData).forEach(key => {
      validarCampo(key, formData[key]);
      if (errors[key]) nuevos[key] = errors[key];
    });

    return nuevos;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    validarCampo(name, value);
  };

  // -------------------------
  // CARGA REGIONES Y COMUNAS
  // -------------------------
  useEffect(() => {
    const cargarRegiones = async () => {
      try {
        const response = await api.get('/api/regiones');
        setListaRegiones(response.data);
      } catch (error) {
        console.error("Error cargando regiones:", error);
        setMensaje("Error cargando regiones.");
        setVariant("danger");
      }
    };
    cargarRegiones();
  }, []);

  useEffect(() => {
    const cargarComunas = async () => {
      if (!formData.region) return setListaComunas([]);

      try {
        const response = await api.get(`/api/comunas/${formData.region}`);
        setListaComunas(response.data);
      } catch (error) {
        console.error("Error cargando comunas:", error);
      }
    };
    cargarComunas();
  }, [formData.region]);

  // -------------------------
  // SUBMIT FINAL
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validarTodo();
    if (Object.values(errs).some(msg => msg && msg !== "")) {
      return; // Hay errores → No enviar
    }

    try {
      const usuario = {
        nombre: formData.nombre + " " + formData.apellidos,
        email: formData.email,
        password: formData.password,
        rut: formData.rut,
        direccion: formData.direccion,
        fechaNac: formData.fechaNac,
        activo: true,
        comuna: { id: Number(formData.comuna) }
      };

      const response = await api.post('/auth/register', usuario);

      localStorage.setItem("token", response.data.token);

      setMensaje("Usuario registrado exitosamente.");
      setVariant("success");

      setTimeout(() => navigate('/iniciarSesion'), 1500);

    } catch (error) {
      setMensaje(error.response?.data?.message || "Error al registrar el usuario");
      setVariant("danger");
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4 texto-azul">Crear Cuenta</h2>

              {mensaje && <Alert variant={variant}>{mensaje}</Alert>}

              <Form onSubmit={handleSubmit}>
                
                {/* RUT + Email */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>RUT</Form.Label>
                      <Form.Control
                        type="text"
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                        isInvalid={!!errors.rut}
                      />
                      <Form.Text className="text-danger">{errors.rut}</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Text className="text-danger">{errors.email}</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Nombre + Apellidos */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        isInvalid={!!errors.nombre}
                      />
                      <Form.Text className="text-danger">{errors.nombre}</Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        isInvalid={!!errors.apellidos}
                      />
                      <Form.Text className="text-danger">{errors.apellidos}</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Fecha */}
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaNac"
                    value={formData.fechaNac}
                    onChange={handleChange}
                    isInvalid={!!errors.fechaNac}
                  />
                  <Form.Text className="text-danger">{errors.fechaNac}</Form.Text>
                </Form.Group>

                {/* Dirección */}
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    isInvalid={!!errors.direccion}
                  />
                  <Form.Text className="text-danger">{errors.direccion}</Form.Text>
                </Form.Group>

                {/* Región + Comuna */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Región</Form.Label>
                      <Form.Select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        isInvalid={!!errors.region}
                      >
                        <option value="">Seleccione...</option>
                        {listaRegiones.map(reg => (
                          <option key={reg.id} value={reg.id}>{reg.nombre}</option>
                        ))}
                      </Form.Select>
                      <Form.Text className="text-danger">{errors.region}</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Comuna</Form.Label>
                      <Form.Select
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                        disabled={!formData.region}
                        isInvalid={!!errors.comuna}
                      >
                        <option value="">Seleccione...</option>
                        {listaComunas.map(com => (
                          <option key={com.id} value={com.id}>{com.nombre}</option>
                        ))}
                      </Form.Select>
                      <Form.Text className="text-danger">{errors.comuna}</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Passwords */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Text className="text-danger">{errors.password}</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

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
