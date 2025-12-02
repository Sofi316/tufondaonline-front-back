import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config/api';

export default function AdminEditarProducto() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    img: '',
    descripcion: '',
    categoriaId: '', 
    enOferta: false,
    precioOferta: ''
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get(`/api/productos/${id}`),
          api.get('/api/categorias')
        ]);

        const p = prodRes.data;

        setFormData({
          nombre: p.nombre,
          precio: p.precio,
          stock: p.stock,
          img: p.img,
          descripcion: p.descripcion,
          categoriaId: p.categoria.idCategoria,  
          enOferta: p.enOferta,
          precioOferta: p.precioOferta ?? ''
        });

        setCategorias(catRes.data);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setError("Error cargando el producto.");
        setLoading(false);
      }
    };
    
    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: formData.nombre,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      img: formData.img,
      descripcion: formData.descripcion,
      enOferta: formData.enOferta,
      precioOferta: formData.enOferta ? Number(formData.precioOferta) : null,
      categoria: {
        idCategoria: Number(formData.categoriaId)
      }
    };

    try {
      await api.put(`/api/productos/${id}`, payload);
      alert("Producto actualizado correctamente");
      navigate('/admin/productos');

    } catch (err) {
      console.error(err);
      setError("Error al actualizar producto. Revise los campos.");
    }
  };

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" />
    </Container>
  );

  return (
    <Container className="my-4">
       <Row className="justify-content-center">
         <Col md={10} lg={8}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Editar Producto #{id}</h2>
                <Button variant="secondary" size="sm" onClick={() => navigate('/admin/productos')}>
                    Cancelar
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Card className="shadow-sm">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Precio Normal</Form.Label>
                                <Form.Control type="number" name="precio" value={formData.precio} onChange={handleChange} required />
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
                                  {categorias.map(c => (
                                    <option key={c.idCategoria} value={c.idCategoria}>
                                      {c.nombre}
                                    </option>
                                  ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>URL Imagen</Form.Label>
                                <Form.Control type="text" name="img" value={formData.img} onChange={handleChange} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" rows={3} name="descripcion" value={formData.descripcion} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        
                        <div className="bg-light p-3 rounded mb-3">
                            <Form.Check 
                                type="switch"
                                label="¿Producto en Oferta?"
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
                                    />
                                </Form.Group>
                            )}
                        </div>

                        <div className="d-grid">
                            <Button variant="primary" type="submit">Guardar Cambios</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
         </Col>
       </Row>
    </Container>
  );
}
