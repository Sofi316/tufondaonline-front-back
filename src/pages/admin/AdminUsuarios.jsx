import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Badge, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getUsuarios, updateUsuario, deleteUsuario, getOrdenesPorUsuario } from '../../data/usersData.js';
import { getRegiones, getComunas } from '../../data/datos.js';


export default function AdminUsuarios() {

  const [usuarios, setUsuarios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [historialCompras, setHistorialCompras] = useState([]);

  useEffect(() => {
    setUsuarios(getUsuarios());
    setRegiones(getRegiones());
  }, []);

  useEffect(() => {
    if (editFormData.region) {
      setComunas(getComunas(editFormData.region));
    } else {
      setComunas([]);
    }
  }, [editFormData.region]);


  
  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setHistorialCompras(getOrdenesPorUsuario(user.id));  
    setShowDetailsModal(true);
  };
  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setHistorialCompras([]); 
  }

  const handleShowEdit = (user) => {
    setSelectedUser(user);
    setEditFormData(user);
    setComunas(getComunas(user.region));
    setShowDetailsModal(false);
    setShowEditModal(true);
  };
  const handleCloseEdit = () => setShowEditModal(false);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUsuario(selectedUser.id, editFormData);
    setUsuarios(getUsuarios());
    handleCloseEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      deleteUsuario(id);
      setUsuarios(getUsuarios());
    }
  };

  const formatPesoChileno = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };


  return (
    <Container fluid>

      <Row className="align-items-center mb-3">
        <Col>
          <h2>Gestión de Usuarios</h2>
          <p className="text-muted">Administra los usuarios del sistema.</p>
        </Col>
        <Col xs="auto" className="text-end">
          <Button as={Link} to="/admin/usuarios/crear" variant="primary">
            <i className="bi bi-plus-lg me-2"></i>
            Nuevo Usuario
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
         <thead className="table-dark">
          <tr>
            <th>RUT</th><th>Nombre</th><th>Email</th><th>Tipo (Rol)</th>
            <th>Región</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.rut}</td><td>{user.nombre}</td><td>{user.email}</td>
              <td>{user.role}</td><td>{user.region}</td>
              <td><Badge bg={user.activo ? 'success' : 'danger'}>{user.activo ? 'Activo' : 'Inactivo'}</Badge></td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleShowDetails(user)}><i className="bi bi-eye-fill"></i></Button>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowEdit(user)}><i className="bi bi-pencil-fill"></i></Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}><i className="bi bi-trash-fill"></i></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal show={showDetailsModal} onHide={handleCloseDetails} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Row>
      
              <Col md={6}>
                <h5>Información Personal</h5>
                <div className="detalles-usuario mb-3">
                  <p><strong>RUT:</strong> {selectedUser.rut}</p>
                  <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Rol:</strong> {selectedUser.role}</p>
                  <p><strong>Región:</strong> {selectedUser.region}</p>
                  <p><strong>Comuna:</strong> {selectedUser.comuna}</p>
                  <p><strong>Estado:</strong>
                    <Badge bg={selectedUser.activo ? 'success' : 'danger'} className="ms-2">
                      {selectedUser.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </p>
                  <p><strong>Miembro desde:</strong> {selectedUser.fechaRegistro}</p>
                </div>
              </Col>

              <Col md={6}>
                <h5>Historial de Compras ({historialCompras.length})</h5>
                {historialCompras.length > 0 ? (
                  <ListGroup variant="flush" style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {historialCompras.map(orden => (
                      <ListGroup.Item key={orden.id} className="d-flex justify-content-between align-items-start">
                        <div>
                          <Link to={`/admin/ordenes/${orden.id}`} onClick={handleCloseDetails}><strong>Orden #{orden.id}</strong></Link>
                          <small className="d-block text-muted">{orden.fecha}</small>
                        </div>
                        <Badge bg="secondary" pill>{formatPesoChileno(orden.total)}</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted">Este usuario no tiene órdenes registradas.</p>
                )}
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>Cerrar</Button>
          <Button variant="warning" onClick={() => handleShowEdit(selectedUser)}>Editar Usuario</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editFormData && (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="editRut"><Form.Label>RUT</Form.Label><Form.Control type="text" name="rut" value={editFormData.rut || ''} onChange={handleEditFormChange} readOnly /></Form.Group>
              <Form.Group className="mb-3" controlId="editNombre"><Form.Label>Nombre</Form.Label><Form.Control type="text" name="nombre" value={editFormData.nombre || ''} onChange={handleEditFormChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="editEmail"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={editFormData.email || ''} onChange={handleEditFormChange} required /></Form.Group>
              <Form.Group className="mb-3" controlId="editRole"><Form.Label>Tipo (Rol)</Form.Label><Form.Select name="role" value={editFormData.role || ''} onChange={handleEditFormChange} required><option value="cliente">Cliente</option><option value="vendedor">Vendedor</option><option value="administrador">Administrador</option></Form.Select></Form.Group>
              <Form.Group className="mb-3" controlId="editEstado"><Form.Label>Estado</Form.Label><Form.Select name="activo" value={editFormData.activo || false} onChange={handleEditFormChange} required><option value={true}>Activo</option><option value={false}>Inactivo</option></Form.Select></Form.Group>
              <Form.Group className="mb-3" controlId="editRegion"><Form.Label>Región</Form.Label><Form.Select name="region" value={editFormData.region || ''} onChange={handleEditFormChange}><option value="">Seleccione una región</option>{regiones.map(r => <option key={r} value={r}>{r}</option>)}</Form.Select></Form.Group>
              <Form.Group className="mb-3" controlId="editComuna"><Form.Label>Comuna</Form.Label><Form.Select name="comuna" value={editFormData.comuna || ''} onChange={handleEditFormChange} disabled={comunas.length === 0}><option value="">Seleccione una comuna</option>{comunas.map(c => <option key={c} value={c}>{c}</option>)}</Form.Select></Form.Group>
              <Button variant="primary" type="submit">Guardar Cambios</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

    </Container>
  );
}