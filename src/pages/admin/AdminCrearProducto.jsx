import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { agregarProducto, obtenerCategorias } from '../../data/productosData.js'; 

export default function AdminCrearProducto() {
  
  const navigate = useNavigate();
  const initialState = {
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    img: '', 
    detalle: '' 
  };
  const [formData, setFormData] = useState(initialState);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    setCategorias(obtenerCategorias());
  }, []);

  const handleChange = (e) => {
    setMensaje("");
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    if (!formData.nombre || !formData.precio || !formData.categoria || !formData.stock) {
        setTipoMensaje("danger");
        setMensaje("Error: Nombre, Precio, Categoría y Stock son obligatorios.");
        return;
    }
    if (isNaN(formData.precio) || isNaN(formData.stock)) {
        setTipoMensaje("danger");
        setMensaje("Error: Precio y Stock deben ser números.");
        return;
    }

    try {
      agregarProducto(formData);
      setTipoMensaje("success");
      setMensaje("¡Producto creado exitosamente!");
      setFormData(initialState);
      setTimeout(() => navigate('/admin/productos'), 1500); 

    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al crear el producto: " + error.message);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Nuevo Producto</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/admin/productos')}>
            <i className="bi bi-arrow-left me-1"></i> Volver a Productos
          </Button>
        </Col>
      </Row>

      {mensaje && (
        <Alert variant={tipoMensaje} onClose={() => setMensaje("")} dismissible>
          {mensaje}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit} noValidate>
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formNombre">
                <Form.Label>Nombre Producto</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formPrecio">
                <Form.Label>Precio (CLP)</Form.Label>
                <Form.Control type="number" name="precio" value={formData.precio} onChange={handleChange} required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Select name="categoria" value={formData.categoria} onChange={handleChange} required>
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}

                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formStock">
                <Form.Label>Stock Inicial</Form.Label>
                <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formImg">
                <Form.Label>URL Imagen</Form.Label>
                <Form.Control type="text" name="img" placeholder="http://ejemplo.com/imagen.jpg" value={formData.img} onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formDetalle">
                <Form.Label>URL Detalle (Slug)</Form.Label>
                <Form.Control type="text" name="detalle" placeholder="/nombre-producto" value={formData.detalle} onChange={handleChange} />
              </Form.Group>
            </Row>
            <div className="text-end">
              <Button variant="primary" type="submit">Guardar Producto</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}