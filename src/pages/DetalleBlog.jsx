import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Card } from 'react-bootstrap';
import api from '../config/api';

export default function DetalleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const response = await api.get(`/api/publicaciones/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Publicación no encontrada");
        setLoading(false);
      }
    };
    cargarDetalle();
  }, [id]);

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  if (error || !post) {
    return (
      <Container className="text-center mt-5">
        <h3>{error || "Noticia no encontrada"}</h3>
        <Button variant="secondary" onClick={() => navigate('/blogs')}>Volver a Noticias</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-2"></i> Volver
      </Button>

      <Card className="border-0 shadow-sm overflow-hidden">
        <Card.Img 
            variant="top" 
            src={post.imagen} 
            alt={post.titulo}
            style={{ maxHeight: '400px', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Sin+Imagen'; }}
        />
        <Card.Body className="p-4 p-md-5">
            <h1 className="display-5 fw-bold mb-3 texto-azul">{post.titulo}</h1>
            
            <div className="text-muted mb-4 border-bottom pb-3">
                <i className="bi bi-calendar-event me-2"></i>
                {post.fecha ? new Date(post.fecha).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Fecha no disponible'}
            </div>

            <div className="lead mb-4 fst-italic text-secondary">
                {post.bajada}
            </div>

            <div className="blog-content" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                {post.contenido}
            </div>
        </Card.Body>
      </Card>
    </Container>
  );
}