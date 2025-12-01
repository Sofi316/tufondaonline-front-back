import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

export default function AdminPerfil() {
  const { user, logout } = useAuth(); 

  if (!user) return <div className="text-center mt-5">No has iniciado sesión.</div>;

  return (
    <Container className="my-5">
      <h2 className="mb-4">Mi Perfil</h2>
      
      <Row>
        <Col md={4}>
          <Card className="shadow-sm text-center p-4">
             <div className="mb-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '100px', height: '100px', fontSize: '2.5rem'}}>
                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'A'}
                </div>
             </div>
             <h4>{user.nombre} {user.apellidos}</h4>
             <p className="text-muted text-uppercase small fw-bold">{user.rol}</p>
             <div className="d-grid mt-3">
                 <Button variant="outline-danger" onClick={logout}>
                     Cerrar Sesión
                 </Button>
             </div>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm h-100">
             <Card.Header className="bg-white fw-bold">Información Personal</Card.Header>
             <Card.Body>
                 <Row className="mb-3 border-bottom pb-2">
                     <Col sm={4} className="text-muted">RUT</Col>
                     <Col sm={8} className="fw-bold">{user.rut}</Col>
                 </Row>
                 <Row className="mb-3 border-bottom pb-2">
                     <Col sm={4} className="text-muted">Correo Electrónico</Col>
                     <Col sm={8} className="fw-bold">{user.email}</Col>
                 </Row>
                 <Row className="mb-3 border-bottom pb-2">
                     <Col sm={4} className="text-muted">Dirección</Col>
                     <Col sm={8} className="fw-bold">{user.direccion || "No registrada"}</Col>
                 </Row>
                 <Row className="mb-3 border-bottom pb-2">
                     <Col sm={4} className="text-muted">Comuna</Col>
                     <Col sm={8} className="fw-bold">{user.comuna?.nombre|| "No registrada"}</Col>
                 </Row>
                 <Row className="mb-3">
                     <Col sm={4} className="text-muted">Fecha de Nacimiento</Col>
                     <Col sm={8} className="fw-bold">{user.fechaNac || "No registrada"}</Col>
                 </Row>
             </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}