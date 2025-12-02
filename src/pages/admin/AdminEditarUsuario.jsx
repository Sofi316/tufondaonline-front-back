import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api';

export default function AdminEditarUsuario() {
  const { id } = useParams();
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
    rol: '',
    password: ''
  });

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [userRes, regRes] = await Promise.all([
          api.get(`/api/usuarios/${id}`),
          api.get('/api/regiones')
        ]);

        const u = userRes.data;
        setRegiones(regRes.data);

        const fechaFormateada = u.fechaNac ? u.fechaNac.toString().split("T")[0] : "";

        let partes = u.nombre?.trim().split(" ") || [];
        let nombre = partes.shift() || "";
        let apellidos = partes.join(" ");

        setFormData({
          rut: u.rut || "",
          email: u.email || "",
          nombre: nombre,
          apellidos: apellidos,
          fechaNac: fechaFormateada,
          direccion: u.direccion || "",
          region: u.region ? u.region.id : "",
          comuna: u.comuna ? u.comuna.id : "",
          rol: u.rol || "CLIENTE",
          password: ""
        });

        if (u.region?.id) {
          const comRes = await api.get(`/api/comunas/${u.region.id}`);
          setComunas(comRes.data);
        }

        setLoading(false);

      } catch (error) {
        console.error(error);
        alert("Error al cargar usuario");
        navigate('/admin/usuarios');
      }
    };

    cargarDatos();
  }, [id, navigate]);

  const handleRegionChange = async (e) => {
    const regionId = e.target.value;
    setFormData({ ...formData, region: regionId, comuna: "" });

    if (regionId) {
      try {
        const res = await api.get(`/api/comunas/${regionId}`);
        setComunas(res.data);
      } catch {
        setComunas([]);
      }
    } else {
      setComunas([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const nombreCompleto = `${formData.nombre} ${formData.apellidos}`.trim();

    const payload = {
      ...formData,
      nombre: nombreCompleto, 
      region: { id: parseInt(formData.region) },
      comuna: { id: parseInt(formData.comuna) }
    };

    delete payload.apellidos;

    if (!payload.password) delete payload.password;

    try {
      await api.put(`/api/usuarios/${id}`, payload);
      alert("Usuario actualizado correctamente");
      navigate("/admin/usuarios");
    } catch (error) {
      console.error(error);
      setMensaje("Error al actualizar. Verifique los datos.");
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Editar Usuario #{id}</h2>
        <Button variant="secondary" size="sm" onClick={() => navigate("/admin/usuarios")}>
          Cancelar
        </Button>
      </div>

      {mensaje && <Alert variant="danger">{mensaje}</Alert>}

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
              <Form.Group as={Col} md={6}>
                <Form.Label>Dirección</Form.Label>
                <Form.Control 
                  name="direccion" 
                  value={formData.direccion} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Región</Form.Label>
                  <Form.Select name="region" value={formData.region} onChange={handleRegionChange} required>
                    <option value="">Seleccione...</option>
                    {regiones.map(r => (
                      <option key={r.id} value={r.id}>{r.nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
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
                </Form.Group>
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
                <Form.Label>Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Dejar vacía para no cambiar"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Guardar Cambios</Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
