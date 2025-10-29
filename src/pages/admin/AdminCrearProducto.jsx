import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { agregarProducto, obtenerCategorias } from '../../data/productosData.js';
import '../../utils/AdminCrearProducto.logic.js'; // <-- Importa la lógica externa

export default function AdminCrearProducto() {

  const navigate = useNavigate();

  const initialState = {
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    img: '',
    detalle: '',
    descripcion: '',
    enOferta: false,
    precioOferta: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    setCategorias(obtenerCategorias());
  }, []);

  // 🧠 Las funciones handleChange y handleSubmit ahora provienen de AdminCrearProducto.logic.js

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
          <Form
            onSubmit={(e) => {
              const result = window.AdminCrearProductoLogic.handleSubmit(
                e,
                formData,
                agregarProducto,
                navigate,
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
              <Form.Group as={Col} md={6} controlId="formNombre">
                <Form.Label>Nombre Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formPrecio">
                <Form.Label>Precio Normal (CLP)</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                  required
                  min="0"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formStock">
                <Form.Label>Stock Inicial</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                  required
                  min="0"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 align-items-end">
              <Form.Group as={Col} md={6} controlId="formEnOferta">
                <Form.Check
                  type="switch"
                  id="enOfertaSwitch"
                  label="¿Producto en Oferta?"
                  name="enOferta"
                  checked={formData.enOferta}
                  onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                />
              </Form.Group>

              {formData.enOferta && (
                <Form.Group as={Col} md={6} controlId="formPrecioOferta">
                  <Form.Label>Precio Oferta (CLP)</Form.Label>
                  <Form.Control
                    type="number"
                    name="precioOferta"
                    value={formData.precioOferta}
                    onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                    required={formData.enOferta}
                    min="1"
                    isInvalid={formData.enOferta && (!formData.precioOferta || Number(formData.precioOferta) <= 0)}
                  />
                  <Form.Control.Feedback type="invalid">
                    El precio de oferta es requerido y debe ser mayor a 0.
                  </Form.Control.Feedback>
                </Form.Group>
              )}
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formImg">
                <Form.Label>URL Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="img"
                  placeholder="http://ejemplo.com/imagen.jpg"
                  value={formData.img}
                  onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                />
                <Form.Text muted>Pega la URL completa de la imagen.</Form.Text>
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formDetalle">
                <Form.Label>URL Detalle (Slug)</Form.Label>
                <Form.Control
                  type="text"
                  name="detalle"
                  placeholder="/nombre-producto"
                  value={formData.detalle}
                  onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                />
                <Form.Text muted>Ej: /empanada-pino (si se deja vacío, se genera automáticamente).</Form.Text>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  placeholder="Describe brevemente el producto..."
                  value={formData.descripcion}
                  onChange={(e) => window.AdminCrearProductoLogic.handleChange(e, setFormData, setMensaje)}
                />
              </Form.Group>
            </Row>

            <div className="text-end mt-4">
              <Button variant="primary" type="submit">Guardar Producto</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
