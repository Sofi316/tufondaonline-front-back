import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormularioLogin from '../components/FormularioLogin'; 

export default function IniciarSesion() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <i className="bi bi-person-circle text-primary" style={{ fontSize: '3rem' }}></i>
                <h2 className="mt-2">Bienvenido</h2>
                <p className="text-muted">Inicia sesión para continuar</p>
              </div>

      
              <FormularioLogin />

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0">¿No tienes cuenta?</p>
                <Link to="/registro" className="btn btn-outline-secondary mt-2">
                  Crear Cuenta Nueva
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}