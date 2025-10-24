import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUsuario, updateUsuario } from '../../data/usersData.js'; 
const ADMIN_ID = 1; 

export default function AdminPerfil() {
  
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null); // Para guardar los datos del admin
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({}); // Para el formulario de edición
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    cargarDatosAdmin();
  }, []);

  const cargarDatosAdmin = () => {
    const data = getUsuario(ADMIN_ID);
    if (data) {
      setAdminData(data);
      setEditFormData({ 
        nombre: data.nombre, 
        email: data.email,
        rut: data.rut,

      }); 
    } else {

      setTipoMensaje("danger");
      setMensaje("Error: No se pudieron cargar los datos del perfil.");
    }
  };

 
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);


  const handleEditFormChange = (e) => {
    setMensaje(""); 
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejador para guardar los cambios del perfil
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    // Validación simple 
    if (!editFormData.nombre || !editFormData.email) {
      setTipoMensaje("danger");
      setMensaje("Error: Nombre y Email son obligatorios.");
      return;
    }
     if (!editFormData.email.includes("@")) { //Validación de email
        setTipoMensaje("danger");
        setMensaje("Error: El formato del correo electrónico no es válido.");
        return;
    }

    try {
      updateUsuario(ADMIN_ID, editFormData); // Llama a la función de actualización
      setTipoMensaje("success");
      setMensaje("¡Perfil actualizado exitosamente!");
      cargarDatosAdmin(); 
      handleCloseEditModal(); 
    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al actualizar el perfil: " + error.message);
    }
  };


  if (!adminData) {
    return <Container fluid><p>Cargando perfil...</p></Container>;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Mi Perfil</h2>
          <p className="text-muted">Administra tu información personal y de cuenta.</p>
        </Col>
      </Row>

      {mensaje && (
        <Alert variant={tipoMensaje} onClose={() => setMensaje("")} dismissible>
          {mensaje}
        </Alert>
      )}

      <Row>
        <Col md={8} lg={6} className="mx-auto"> 
          <Card className="shadow-sm">
            <Card.Header>
              <Card.Title as="h5">Información del Administrador</Card.Title>
            </Card.Header>
            <Card.Body>
              <p><strong>Nombre:</strong> {adminData.nombre}</p>
              <p><strong>Email:</strong> {adminData.email}</p>
              <p><strong>RUT:</strong> {adminData.rut || 'No especificado'}</p>
              <p><strong>Rol:</strong> <Badge bg="info">{adminData.role}</Badge></p>
              <p><strong>Región:</strong> {adminData.region || 'No especificada'}</p>
              <p><strong>Comuna:</strong> {adminData.comuna || 'No especificada'}</p>
              <p><strong>Miembro desde:</strong> {adminData.fechaRegistro}</p>
              
              <div className="text-end mt-3">
                <Button variant="warning" onClick={handleShowEditModal}>
                  <i className="bi bi-pencil-fill me-2"></i> Editar Perfil
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mi Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editFormData && (
            <Form onSubmit={handleEditSubmit} noValidate>
              <Form.Group className="mb-3" controlId="editNombrePerfil">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                  type="text" 
                  name="nombre" 
                  value={editFormData.nombre || ''} 
                  onChange={handleEditFormChange}
                  required 
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="editEmailPerfil">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={editFormData.email || ''} 
                  onChange={handleEditFormChange}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="editRutPerfil">
                <Form.Label>RUT</Form.Label>
                <Form.Control 
                  type="text" 
                  name="rut" 
                  value={editFormData.rut || ''} 
                  onChange={handleEditFormChange}
                  placeholder="Ej: 12345678-K"
                />
              </Form.Group>
            

              <div className="text-end">
                <Button variant="secondary" onClick={handleCloseEditModal} className="me-2">
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar Cambios
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

    </Container>
  );
}