
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerCategorias } from '../../data/productosData.js'; 
export default function AdminCategorias() {
  
  const [categorias, setCategorias] = useState([]);

  
  useEffect(() => {
    setCategorias(obtenerCategorias());
  }, []);

  
  const handleEliminarCategoria = (categoriaAEliminar) => {
      if (window.confirm(`¿Estás seguro de eliminar la categoría "${categoriaAEliminar}"? Esto no eliminará los productos asociados.`)) {
          
          setCategorias(categorias.filter(cat => cat !== categoriaAEliminar));
      }
  }

  return (
    <Container fluid>
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Gestión de Categorías</h2>
          <p className="text-muted">Administra las categorías de productos.</p>
        </Col>
        <Col xs="auto" className="text-end">
          <Button as={Link} to="/admin/categorias/crear" variant="primary">
            <i className="bi bi-plus-lg me-2"></i> Nueva Categoría
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={8} lg={6} className="mx-auto"> 
            {categorias.length > 0 ? (
                <ListGroup>
                {categorias.map((categoria, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {categoria}
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => handleEliminarCategoria(categoria)}
                        title="Eliminar categoría (simulado)"
                    >
                        <i className="bi bi-trash-fill"></i>
                    </Button>
                    </ListGroup.Item>
                ))}
                </ListGroup>
            ) : (
                <p className="text-center text-muted">No hay categorías definidas en los productos.</p>
            )}
        </Col>
      </Row>
    </Container>
  );
}