// src/pages/admin/AdminEditarProducto.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProducto, actualizarProducto, obtenerCategorias } from '../../data/productosData.js'; // Ajusta ruta

export default function AdminEditarProducto() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({}); // Empezamos vacío
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  // Carga los datos del producto y las categorías
  useEffect(() => {
    const productoExistente = obtenerProducto(id);
    if (productoExistente) {
      setFormData(productoExistente);
    } else {
      navigate('/admin/productos'); // Si no existe, vuelve a la lista
    }
    setCategorias(obtenerCategorias());
  }, [id, navigate]);

  const handleChange = (e) => {
    setMensaje("");
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    // Validación simple
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
      actualizarProducto(id, formData);
      setTipoMensaje("success");
      setMensaje("¡Producto actualizado exitosamente!");
      setTimeout(() => navigate(`/admin/productos/${id}`), 1500); // Vuelve al detalle

    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al actualizar el producto: " + error.message);
    }
  };

   if (!formData.id) { // Mientras carga los datos
    return <Container fluid><p>Cargando datos del producto...</p></Container>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Editar Producto: {formData.nombre}</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate(`/admin/productos/${id}`)}>
            <i className="bi bi-arrow-left me-1"></i> Volver al Detalle
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
                <Form.Control type="text" name="nombre" value={formData.nombre || ''} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formPrecio">
                <Form.Label>Precio (CLP)</Form.Label>
                <Form.Control type="number" name="precio" value={formData.precio || ''} onChange={handleChange} required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Select name="categoria" value={formData.categoria || ''} onChange={handleChange} required>
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name="stock" value={formData.stock || ''} onChange={handleChange} required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formImg">
                <Form.Label>URL Imagen</Form.Label>
                <Form.Control type="text" name="img" placeholder="http://ejemplo.com/imagen.jpg" value={formData.img || ''} onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formDetalle">
                <Form.Label>URL Detalle (Slug)</Form.Label>
                <Form.Control type="text" name="detalle" placeholder="/nombre-producto" value={formData.detalle || ''} onChange={handleChange} />
              </Form.Group>
            </Row>
            <div className="text-end">
              <Button variant="primary" type="submit">Guardar Cambios</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}