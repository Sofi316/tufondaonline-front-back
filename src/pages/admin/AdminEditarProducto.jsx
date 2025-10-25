// src/pages/admin/AdminEditarProducto.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById as obtenerProducto, actualizarProducto, obtenerCategorias } from '../../data/productosData.js'; // Asegúrate que la ruta sea correcta

export default function AdminEditarProducto() {

  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({}); // Empezamos vacío hasta cargar
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  // Carga los datos del producto existente y las categorías
  useEffect(() => {
    const productoExistente = obtenerProducto(id);
    if (productoExistente) {
      // Inicializa el estado con los datos del producto, asegurando valores iniciales
      setFormData({
        id: productoExistente.id,
        nombre: productoExistente.nombre || '',
        precio: productoExistente.precio || '',
        categoria: productoExistente.categoria || '',
        stock: productoExistente.stock || '',
        img: productoExistente.img || '',
        detalle: productoExistente.detalle || '',
        descripcion: productoExistente.descripcion || '', // Añadido
        enOferta: productoExistente.enOferta || false, // Añadido
        precioOferta: productoExistente.precioOferta || '' // Añadido
      });
    } else {
      // Si el producto no existe, muestra error o redirige
      setMensaje("Error: Producto no encontrado.");
      setTipoMensaje("danger");
      // O podrías redirigir: navigate('/admin/productos');
    }
    // Carga las categorías disponibles
    setCategorias(obtenerCategorias());
  }, [id, navigate]); // Depende del ID y navigate

  // Maneja cambios en los inputs (igual que en Crear)
  const handleChange = (e) => {
    setMensaje("");
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
             (name === 'precio' || name === 'stock' || name === 'precioOferta') ? (value === '' ? '' : Number(value)) :
             value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    // --- VALIDACIONES (Iguales que en Crear) ---
    if (!formData.nombre || formData.precio === '' || !formData.categoria || formData.stock === '') {
        setTipoMensaje("danger");
        setMensaje("Error: Nombre, Precio, Categoría y Stock son obligatorios.");
        return;
    }
     if (isNaN(formData.precio) || isNaN(formData.stock) || (formData.enOferta && isNaN(formData.precioOferta)) ) {
        setTipoMensaje("danger");
        setMensaje("Error: Precio, Stock y Precio Oferta (si aplica) deben ser números.");
        return;
    }
     if (formData.enOferta && (!formData.precioOferta || Number(formData.precioOferta) <= 0)) {
        setTipoMensaje("danger");
        setMensaje("Error: Si el producto está en oferta, debe indicar un Precio Oferta válido mayor a 0.");
        return;
     }
      if (formData.enOferta && Number(formData.precioOferta) >= Number(formData.precio)) {
        setTipoMensaje("warning");
        setMensaje("Advertencia: El Precio Oferta es igual o mayor al Precio normal.");
    }
    // --- FIN VALIDACIONES ---

    try {
       // Prepara los datos a enviar (asegura números y null para precioOferta)
      const datosParaActualizar = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        // Si no está en oferta, asegúrate de que precioOferta sea null o undefined
        // para que no se guarde un valor inválido.
        precioOferta: formData.enOferta ? Number(formData.precioOferta) : null
      };

      actualizarProducto(id, datosParaActualizar); // Llama a la función de tus datos
      setTipoMensaje("success");
      setMensaje("¡Producto actualizado exitosamente!");
      // Redirige de vuelta a la lista principal de productos
      setTimeout(() => navigate('/admin/productos'), 1500);

    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al actualizar el producto: " + (error.message || "Ocurrió un error inesperado"));
    }
  };

   // Muestra cargando si los datos aún no están listos y no hay error
   if (!formData.id && !mensaje.includes("Error: Producto no encontrado")) {
    return <Container fluid><p>Cargando datos del producto...</p></Container>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Editar Producto: {formData.nombre || 'Cargando...'}</h2>
           {/* Botón Volver a la Lista */}
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

      {/* Solo muestra el formulario si el producto se cargó */}
      {formData.id && (
        <Card className="shadow-sm">
          <Card.Body>
            <Form onSubmit={handleSubmit} noValidate>
              {/* --- FILA 1: Nombre y Precio Normal --- */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6} controlId="formNombre">
                  <Form.Label>Nombre Producto</Form.Label>
                  <Form.Control type="text" name="nombre" value={formData.nombre || ''} onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="formPrecio">
                  <Form.Label>Precio Normal (CLP)</Form.Label>
                  <Form.Control type="number" name="precio" value={formData.precio || ''} onChange={handleChange} required min="0"/>
                </Form.Group>
              </Row>

               {/* --- FILA 2: Categoría y Stock --- */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6} controlId="formCategoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select name="categoria" value={formData.categoria || ''} onChange={handleChange} required>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                     {/* Muestra la categoría actual si no está en la lista estándar */}
                     {!categorias.includes(formData.categoria) && formData.categoria && (
                        <option value={formData.categoria}>** {formData.categoria} **</option>
                    )}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="formStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" name="stock" value={formData.stock || ''} onChange={handleChange} required min="0"/>
                </Form.Group>
              </Row>

               {/* --- FILA 3: Oferta --- */}
              <Row className="mb-3 align-items-end">
                 <Form.Group as={Col} md={6} controlId="formEnOferta">
                    <Form.Check
                        type="switch"
                        id="enOfertaSwitch"
                        label="¿Producto en Oferta?"
                        name="enOferta"
                        checked={formData.enOferta || false} // Asegura que sea boolean
                        onChange={handleChange}
                    />
                 </Form.Group>
                 {formData.enOferta && (
                    <Form.Group as={Col} md={6} controlId="formPrecioOferta">
                        <Form.Label>Precio Oferta (CLP)</Form.Label>
                        <Form.Control
                            type="number"
                            name="precioOferta"
                            value={formData.precioOferta || ''} // Muestra vacío si es null o undefined
                            onChange={handleChange}
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

              {/* --- FILA 4: Imagen y Detalle URL --- */}
              <Row className="mb-3">
                <Form.Group as={Col} md={6} controlId="formImg">
                  <Form.Label>URL Imagen</Form.Label>
                   {formData.img && (
                        <div className="mb-2 text-center">
                            <img src={formData.img} alt="Previsualización" style={{maxWidth: '100px', maxHeight: '100px', objectFit:'contain', border:'1px solid #ccc', borderRadius:'4px'}}/>
                        </div>
                   )}
                  <Form.Control type="text" name="img" placeholder="http://ejemplo.com/imagen.jpg" value={formData.img || ''} onChange={handleChange} />
                   <Form.Text muted>Pega la URL completa de la imagen.</Form.Text>
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="formDetalle">
                  <Form.Label>URL Detalle (Slug)</Form.Label>
                  <Form.Control type="text" name="detalle" placeholder="/nombre-producto" value={formData.detalle || ''} onChange={handleChange} />
                   <Form.Text muted>Ej: /empanada-pino.</Form.Text>
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
                        value={formData.descripcion || ''}
                        onChange={handleChange}
                    />
                 </Form.Group>
               </Row>

              {/* --- Botón Guardar --- */}
              <div className="text-end mt-4">
                <Button variant="primary" type="submit">Guardar Cambios</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}