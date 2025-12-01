import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    try {
      const response = await api.get('/api/productos');
      setProductos(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await api.delete(` /api/productos/${id} `);
        setProductos(productos.filter(p => p.id !== id));
        alert("Producto eliminado.");
      } catch (error) {
        console.error(error);
        alert("Error al eliminar. Puede que tenga órdenes asociadas.");
      }
    }
  };

  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container fluid>
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <h2>Inventario de Productos</h2>
        </Col>
        <Col md={6} className="text-md-end">
          <Button as={Link} to="/admin/productos/nuevo" variant="success">
            <i className="bi bi-plus-lg me-2"></i>Nuevo Producto
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
            <Form.Control 
              placeholder="Buscar por nombre..." 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </InputGroup>

          <Table responsive hover className="align-middle">
            <thead className="bg-light">
              <tr>
                <th style={{width: '60px'}}>Img</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map(p => (
                <tr key={p.id}>
                  <td>
                    <img src={p.img} alt="" style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} 
                         onError={(e)=>{e.target.src='https://via.placeholder.com/40'}}/>
                  </td>
                  <td className="fw-bold">{p.nombre}</td>
                  <td>{p.categoria?.nombre || p.categoria || "General"}</td>
                  <td>
                    {p.enOferta ? (
                      <div>
                        <span className="text-danger fw-bold">${p.precioOferta}</span>
                        <br/>
                        <small className="text-decoration-line-through text-muted">${p.precio}</small>
                      </div>
                    ) : (
                      <span>${p.precio}</span>
                    )}
                  </td>
                  <td>
                    {p.stock < 10 ? <span className="text-danger fw-bold">{p.stock}</span> : p.stock}
                  </td>
                  <td>
                    {p.stock > 0 ? <Badge bg="success">Activo</Badge> : <Badge bg="danger">Agotado</Badge>}
                  </td>
                  <td className="text-end">
                    <Button 
                        variant="outline-info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => navigate(`/admin/productos/ver/${p.id}`)}
                    >
                      <i className="bi bi-eye"></i>
                    </Button>
                    <Button 
                        variant="outline-warning" 
                        size="sm" 
                        className="me-2"
                        as={Link} 
                        to={`/admin/productos/editar/${p.id}`}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleEliminar(p.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
              {productosFiltrados.length === 0 && (
                <tr><td colSpan="7" className="text-center">No se encontraron productos.</td></tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}