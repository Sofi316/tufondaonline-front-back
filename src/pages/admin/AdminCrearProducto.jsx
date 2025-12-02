import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function AdminCrearProducto() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoriaId: '', 
    stock: '',
    img: '',
    descripcion: '',
    enOferta: false,
    precioOferta: ''
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("success");

  useEffect(() => {
    api.get('/api/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error cargando categorías", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'switch' || type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        img: formData.img,
        enOferta: formData.enOferta,
        precioOferta: formData.enOferta ? Number(formData.precioOferta) : null,
        categoria: { 
          idCategoria: Number(formData.categoriaId)
        }
      };

      await api.post('/api/productos', payload);

      setVariant("success");
      setMensaje("Producto creado correctamente.");

      setTimeout(() => navigate('/admin/productos'), 1500);

    } catch (error) {
      console.error(error);
      setVariant("danger");
      setMensaje("Error al crear producto. Verifique los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h2>Nuevo Producto</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/admin/productos')}>
            <i className="bi bi-arrow-left me-1"></i> Volver
          </Button>
        </Col>
      </Row>

      {mensaje && <Alert variant={variant}>{mensaje}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md={6}>
                <Form.Label>Nombre Producto</Form.Label>
                <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <Form.Label>Precio (CLP)</Form.Label>
                <Form.Control type="number" name="precio" value={formData.precio} onChange={handleChange} required min="1"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md={6}>
                <Form.Label>Categoría</Form.Label>
                <Form.Select 
                  name="categoriaId" 
                  value={formData.categoriaId} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Seleccione...</option>
                  {categorias.map((cat) => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>Stock Inicial</Form.Label>
                <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
               <Form.Group as={Col}>
                  <Form.Label>URL Imagen</Form.Label>
                  <Form.Control type="text" name="img" placeholder="http://..." value={formData.img} onChange={handleChange} />
               </Form.Group>
            </Row>

            <div className="bg-light p-3 rounded mb-3">
              <Form.Check 
                type="switch"
                label="¿Está en Oferta?"
                name="enOferta"
                checked={formData.enOferta}
                onChange={handleChange}
              />
              {formData.enOferta && (
                <Form.Group className="mt-2">
                  <Form.Label>Precio Oferta</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="precioOferta" 
                    value={formData.precioOferta} 
                    onChange={handleChange} 
                    required={formData.enOferta}
                  />
                </Form.Group>
              )}
            </div>

            <Form.Group className="mb-4">
               <Form.Label>Descripción</Form.Label>
               <Form.Control as="textarea" rows={3} name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </Form.Group>

            <div className="text-end">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border"/> : "Guardar Producto"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
