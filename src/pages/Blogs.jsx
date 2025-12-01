import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../config/api'; 

export default function Blogs() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const response = await api.get('/publicaciones');
        setPublicaciones(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando blog:", err);
        setError("No se pudieron cargar las noticias.");
        setLoading(false);
      }
    };
    cargarPublicaciones();
  }, []);

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;
  
  if (error) return <Container className="mt-5"><Alert variant="warning">{error}</Alert></Container>;

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Noticias Dieciocheras</h1>
        <p className="lead text-muted">Novedades, recetas y cultura</p>
      </div>

      {publicaciones.length === 0 ? (
        <div className="text-center">
            <p>No hay publicaciones disponibles por el momento.</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {publicaciones.map((post) => (
            <Col key={post.id}>
              <Card className="h-100 shadow-sm hover-card">
                <div style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img 
                      variant="top" 
                      src={post.img || "https://via.placeholder.com/400x200?text=Sin+Imagen"} 
                      style={{ height: '100%', objectFit: 'cover' }} 
                    />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{post.titulo}</Card.Title>
                  <Card.Text className="text-muted small">
                    {post.fecha && new Date(post.fecha).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>
                    {post.bajada}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button as={Link} to={`/blog/${post.id}`} variant="outline-danger">
                      Leer más
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}