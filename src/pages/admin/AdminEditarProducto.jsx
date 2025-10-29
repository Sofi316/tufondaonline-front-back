
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById as obtenerProducto, actualizarProducto, obtenerCategorias } from '../../data/productosData.js'; 

export default function AdminEditarProducto() {

  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({}); 
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    const productoExistente = obtenerProducto(id);
    if (productoExistente) {
      setFormData({
        id: productoExistente.id,
        nombre: productoExistente.nombre || '',
        precio: productoExistente.precio || '',
        categoria: productoExistente.categoria || '',
        stock: productoExistente.stock || '',
        img: productoExistente.img || '',
        detalle: productoExistente.detalle || '',
        descripcion: productoExistente.descripcion || '', 
        enOferta: productoExistente.enOferta || false,
        precioOferta: productoExistente.precioOferta || '' 
      });
    } else {
   
      setMensaje("Error: Producto no encontrado.");
      setTipoMensaje("danger");
    }
    setCategorias(obtenerCategorias());
  }, [id, navigate]); 

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

    try {
      const datosParaActualizar = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
       
        precioOferta: formData.enOferta ? Number(formData.precioOferta) : null
      };

      actualizarProducto(id, datosParaActualizar);
      setTipoMensaje("success");
      setMensaje("¡Producto actualizado exitosamente!");
      setTimeout(() => navigate('/admin/productos'), 1500);

    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al actualizar el producto: " + (error.message || "Ocurrió un error inesperado"));
    }
  };

   if (!formData.id && !mensaje.includes("Error: Producto no encontrado")) {
    return <Container fluid><p>Cargando datos del producto...</p></Container>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Editar Producto: {formData.nombre || 'Cargando...'}</h2>
            
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

       
      {formData.id && (
        <Card className="shadow-sm">
          <Card.Body>
            <Form onSubmit={handleSubmit} noValidate>
               
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

                
              <Row className="mb-3">
                <Form.Group as={Col} md={6} controlId="formCategoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select name="categoria" value={formData.categoria || ''} onChange={handleChange} required>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      
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

                
              <Row className="mb-3 align-items-end">
                 <Form.Group as={Col} md={6} controlId="formEnOferta">
                    <Form.Check
                        type="switch"
                        id="enOfertaSwitch"
                        label="¿Producto en Oferta?"
                        name="enOferta"
                        checked={formData.enOferta || false} 
                        onChange={handleChange}
                    />
                 </Form.Group>
                 {formData.enOferta && (
                    <Form.Group as={Col} md={6} controlId="formPrecioOferta">
                        <Form.Label>Precio Oferta (CLP)</Form.Label>
                        <Form.Control
                            type="number"
                            name="precioOferta"
                            value={formData.precioOferta || ''}  
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