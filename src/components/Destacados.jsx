import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCarrito } from '../components/CarritoContext';
import api from '../config/api'; 

export default function Destacados() {
  const { agregarAlCarrito } = useCarrito();
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        const response = await api.get('/api/productos');
        
        // LÓGICA DE NEGOCIO: ¿Cuáles son destacados?
        // Opción A: Los primeros 3
        // Opción B: Filtrar por un campo boolean "destacado" si lo agregaste a la BD
        // Aquí tomaremos los primeros 3 como ejemplo
        const seleccion = response.data.slice(0, 3);
        
        setProductosDestacados(seleccion);
      } catch (error) {
        console.error("Error cargando destacados:", error);
      }
    };
    cargarDestacados();
  }, []);

  if (productosDestacados.length === 0) return null;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Favoritos de la Fonda</h2>
      <Row xs={1} md={3} className="g-4">
        {productosDestacados.map((prod) => (
          <Col key={prod.id}>
            <Card className="h-100 shadow-sm border-0">
              <div style={{height: '200px', overflow: 'hidden'}}>
                <Card.Img 
                  variant="top" 
                  src={prod.img} 
                  style={{objectFit: 'cover', height: '100%'}}
                />
              </div>
              <Card.Body className="d-flex flex-column text-center">
                <Card.Title>{prod.nombre}</Card.Title>
                <Card.Text className="text-muted fw-bold">
                  ${prod.precio.toLocaleString('es-CL')}
                </Card.Text>
                <div className="mt-auto">
                   <Button 
                    variant="outline-success" 
                    size="sm"
                    onClick={() => {
                        agregarAlCarrito(prod);
                        alert("¡Producto agregado al carrito!"); 
                    }}
                  >
                    <i className="bi bi-cart-plus"></i> Agregar
                  </Button>
                   <Link to={`/detalle/${prod.id}`} className="btn btn-outline-secondary">
                     Ver
                   </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}