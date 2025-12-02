import React, { useState, useEffect } from 'react';
import Filtrado from '../components/Filtrado';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCarrito } from '../components/CarritoContext';
import { Link } from 'react-router-dom';
import api from '../config/api'; 
import '../styles/styles.css';

function Categorias() {
  const { agregarAlCarrito } = useCarrito();
  
  
  const [datosProductos, setDatosProductos] = useState([]); 
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/api/productos'); 
        setDatosProductos(response.data);
        setProductosFiltrados(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);


  const manejarFiltros = (filtros) => {
    let resultado = [...datosProductos];


    if (filtros.categorias.length > 0) {
      resultado = resultado.filter(p => {
        const nombreCategoria = typeof p.categoria === 'object' ? p.categoria.nombre : p.categoria;
        return filtros.categorias.includes(nombreCategoria);
      });
    }

    if (filtros.precioMin !== '') {
      resultado = resultado.filter(p => p.precio >= parseInt(filtros.precioMin));
    }
    if (filtros.precioMax !== '') {
      resultado = resultado.filter(p => p.precio <= parseInt(filtros.precioMax));
    }

    setProductosFiltrados(resultado);
  };

  if (loading) return <div className="text-center mt-5">Cargando catálogo...</div>;

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <Filtrado onFiltrar={manejarFiltros} />
        </Col>

        <Col md={9}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {productosFiltrados.map((producto) => (
              <Col key={producto.id}>
                <Card className="h-100 shadow-sm">
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img 
                      variant="top" 
                      src={producto.img} 
                      style={{ objectFit: 'cover', height: '100%' }} 
                    />
                  </div>
                  <Card.Body className="d-flex flex-column texto-azul">
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text className="text-muted small">
                      {producto.descripcion ? producto.descripcion.substring(0, 50) + '...' : ''}
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="h5 mb-0 texto-azul">
                        ${producto.precio.toLocaleString('es-CL')}
                      </span>
                      <Button 
                        className="btn-azul"
                        size="sm"
                        onClick={() => {
                          agregarAlCarrito(producto);
                          alert("¡Producto agregado al carrito!");
                        }}
                      >
                        <i className="bi bi-cart-plus"></i> Agregar
                      </Button>
                    </div>
                  </Card.Body>
                  <Card.Footer 
                      className="bg-white border-top-0 d-flex justify-content-center"
                    >
                      <Link 
                        to={`/detalle${producto.detalle || '/' + producto.id}`} 
                        className="btn btn-danger"
                      >
                        Ver Detalle
                      </Link>
                    </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          {productosFiltrados.length === 0 && (
            <div className="text-center mt-4">
               <p>No se encontraron productos con esos filtros.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Categorias;