// src/pages/admin/AdminCrearProducto.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { agregarProducto, obtenerCategorias } from '../../data/productosData.js'; // Asegúrate que la ruta sea correcta

export default function AdminCrearProducto() {

  const navigate = useNavigate();
  // Estado inicial incluyendo campos de oferta
  const initialState = {
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    img: '',
    detalle: '',
    descripcion: '', // Añadido campo descripción
    enOferta: false, // Añadido campo enOferta (inicia false)
    precioOferta: '' // Añadido campo precioOferta
  };
  const [formData, setFormData] = useState(initialState);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  // Carga las categorías al montar el componente
  useEffect(() => {
    setCategorias(obtenerCategorias());
  }, []);

  // Maneja cambios en todos los inputs
  const handleChange = (e) => {
    setMensaje(""); // Limpia mensajes al escribir
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      // Si es checkbox usa 'checked', si no, usa 'value'
      // Convierte precio, stock y precioOferta a número si no están vacíos
      [name]: type === 'checkbox' ? checked :
             (name === 'precio' || name === 'stock' || name === 'precioOferta') ? (value === '' ? '' : Number(value)) :
             value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    // --- VALIDACIONES ---
    if (!formData.nombre || formData.precio === '' || !formData.categoria || formData.stock === '') {
        setTipoMensaje("danger");
        setMensaje("Error: Nombre, Precio, Categoría y Stock son obligatorios.");
        return;
    }
    if (isNaN(formData.precio) || isNaN(formData.stock)) {
        setTipoMensaje("danger");
        setMensaje("Error: Precio y Stock deben ser números.");
        return;
    }
    // Validación de Oferta
    if (formData.enOferta && (!formData.precioOferta || formData.precioOferta <= 0)) {
        setTipoMensaje("danger");
        setMensaje("Error: Si el producto está en oferta, debe indicar un Precio Oferta válido mayor a 0.");
        return;
    }
     if (formData.enOferta && Number(formData.precioOferta) >= Number(formData.precio)) {
        setTipoMensaje("warning"); // Solo advertencia, permite guardar
        setMensaje("Advertencia: El Precio Oferta es igual o mayor al Precio normal.");
        // Podrías añadir lógica aquí para detener si quieres que sea error
    }
    // Genera detalle automático si está vacío (opcional)
    if (!formData.detalle) {
        formData.detalle = `/${formData.nombre.toLowerCase().replace(/\s+/g, '-')}`;
    }

    // --- FIN VALIDACIONES ---

    try {
      // Prepara los datos a enviar (asegura números y null para precioOferta si no aplica)
      const datosParaGuardar = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        precioOferta: formData.enOferta ? Number(formData.precioOferta) : null // Guarda null si no está en oferta
      };

      agregarProducto(datosParaGuardar); // Llama a la función de tus datos
      setTipoMensaje("success");
      setMensaje("¡Producto creado exitosamente!");
      setFormData(initialState); // Limpia el formulario
      setTimeout(() => navigate('/admin/productos'), 1500); // Redirige a la lista

    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al crear el producto: " + (error.message || "Ocurrió un error inesperado"));
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

      {/* Muestra mensajes de éxito o error */}
      {mensaje && (
        <Alert variant={tipoMensaje} onClose={() => setMensaje("")} dismissible>
          {mensaje}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit} noValidate>
            {/* --- FILA 1: Nombre y Precio Normal --- */}
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formNombre">
                <Form.Label>Nombre Producto</Form.Label>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formPrecio">
                <Form.Label>Precio Normal (CLP)</Form.Label>
                <Form.Control type="number" name="precio" value={formData.precio} onChange={handleChange} required min="0"/>
              </Form.Group>
            </Row>

            {/* --- FILA 2: Categoría y Stock --- */}
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Select name="categoria" value={formData.categoria} onChange={handleChange} required>
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  {/* Puedes añadir una opción para 'Nueva Categoría' si quieres */}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formStock">
                <Form.Label>Stock Inicial</Form.Label>
                <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0"/>
              </Form.Group>
            </Row>

            {/* --- FILA 3: Oferta (Switch y Precio Oferta Condicional) --- */}
            <Row className="mb-3 align-items-end"> {/* align-items-end para alinear mejor */}
               <Form.Group as={Col} md={6} controlId="formEnOferta">
                  <Form.Check
                      type="switch"
                      id="enOfertaSwitch"
                      label="¿Producto en Oferta?"
                      name="enOferta" // Nombre coincide con el estado
                      checked={formData.enOferta} // Controlado por el estado
                      onChange={handleChange} // Usa el manejador general
                  />
               </Form.Group>
               {/* Mostrar campo Precio Oferta solo si enOferta es true */}
               {formData.enOferta && (
                  <Form.Group as={Col} md={6} controlId="formPrecioOferta">
                      <Form.Label>Precio Oferta (CLP)</Form.Label>
                      <Form.Control
                          type="number"
                          name="precioOferta" // Nombre coincide con el estado
                          value={formData.precioOferta} // Controlado por el estado
                          onChange={handleChange}
                          required={formData.enOferta} // Requerido si está en oferta
                          min="1" // Precio oferta debe ser mayor a 0
                          // Añade validación visual de Bootstrap
                          isInvalid={formData.enOferta && (!formData.precioOferta || Number(formData.precioOferta) <= 0)}
                      />
                       <Form.Control.Feedback type="invalid">
                          El precio de oferta es requerido y debe ser mayor a 0.
                      </Form.Control.Feedback>
                  </Form.Group>
               )}
            </Row>

            {/* --- FILA 4: Imagen y Detalle URL --- */}
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formImg">
                <Form.Label>URL Imagen</Form.Label>
                <Form.Control type="text" name="img" placeholder="http://ejemplo.com/imagen.jpg" value={formData.img} onChange={handleChange} />
                <Form.Text muted>Pega la URL completa de la imagen.</Form.Text>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formDetalle">
                <Form.Label>URL Detalle (Slug)</Form.Label>
                <Form.Control type="text" name="detalle" placeholder="/nombre-producto" value={formData.detalle} onChange={handleChange} />
                 <Form.Text muted>Ej: /empanada-pino (si se deja vacío, se genera automáticamente).</Form.Text>
              </Form.Group>
            </Row>

             {/* --- FILA 5: Descripción --- */}
             <Row className="mb-3">
               <Form.Group as={Col} controlId="formDescripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                      as="textarea"
                      rows={3}
                      name="descripcion"
                      placeholder="Describe brevemente el producto..."
                      value={formData.descripcion}
                      onChange={handleChange}
                  />
               </Form.Group>
             </Row>

            {/* --- Botón Guardar --- */}
            <div className="text-end mt-4"> {/* Añadido margen superior */}
              <Button variant="primary" type="submit">Guardar Producto</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}