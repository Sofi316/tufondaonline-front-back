// src/pages/admin/AdminCrearUsuario.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { createUsuario } from '../../data/usersData.js'; 
import { getRegiones, getComunas } from '../../data/datos.js'; 

// --- FUNCIONES HELPER DE TU formulario.js ---
function validarRUT(rut) {
    rut = rut.replace(/[.-]/g, '').toUpperCase();
    return /^[0-9]{7,8}[0-9K]$/.test(rut);
}
// --- FIN FUNCIONES HELPER ---


export default function AdminCrearUsuario() {
  
  // Estado inicial del formulario
  const initialState = {
    rut: '', email: '', nombre: '', apellidos: '', fechaNac: '',
    direccion: '', region: '', comuna: '', contraseña: '', 
    contraseñaCon: '', tipo: 'cliente'
  };

  const [formData, setFormData] = useState(initialState);
  const [listaRegiones, setListaRegiones] = useState([]);
  const [listaComunas, setListaComunas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  useEffect(() => {
    setListaRegiones(getRegiones());
  }, []);

  useEffect(() => {
    if (formData.region) {
      setListaComunas(getComunas(formData.region));
    } else {
      setListaComunas([]);
    }
    setFormData(prev => ({ ...prev, comuna: '' }));
  }, [formData.region]);

  
  const handleChange = (e) => {
    setMensaje(""); // Limpia el mensaje al escribir
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // --- MANEJADOR ACTUALIZADO CON VALIDACIONES DE formulario.js ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje(""); 

    // --- INICIO DE VALIDACIONES ---
    const { rut, email, nombre, apellidos, fechaNac, direccion, contraseña, contraseñaCon } = formData;

    // 1. RUT
    if (!rut || !validarRUT(rut)) {
        setTipoMensaje("danger");
        setMensaje("El RUT es requerido y debe ser válido (ej: 12345678-K)");
        return;
    }
    
    // 2. Email (Validación CORREGIDA)
    // Ahora usa la misma regla que tu formulario.js
    if (!email || !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email)) {
        setTipoMensaje("danger");
        setMensaje("Correo requerido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com");
        return;
    }

    // 3. Nombre
    if (!nombre || nombre.length > 50) {
        setTipoMensaje("danger");
        setMensaje("Nombre requerido (máx. 50 caracteres)");
        return;
    }
    
    // 4. Apellidos
    if (!apellidos || apellidos.length > 100) {
        setTipoMensaje("danger");
        setMensaje("Apellidos requeridos (máx. 100 caracteres)");
        return;
    }

    // 5. Fecha de nacimiento
    if (!fechaNac) {
        setTipoMensaje("danger");
        setMensaje("Fecha de nacimiento requerida");
        return;
    }

    // 6. Dirección
    if (!direccion || direccion.length > 300) {
        setTipoMensaje("danger");
        setMensaje("Dirección requerida (máx. 300 caracteres)");
        return;
    }

    // 7. Contraseña
    if (!contraseña || contraseña.length < 4 || contraseña.length > 10) {
        setTipoMensaje("danger");
        setMensaje("Contraseña requerida (debe tener entre 4 y 10 caracteres)");
        return;
    }

    // 8. Confirmar Contraseña
    if (contraseña !== contraseñaCon) {
        setTipoMensaje("danger");
        setMensaje("Error: Las contraseñas no coinciden.");
        return;
    }
    
    // --- FIN DE VALIDACIONES ---
    
    try {
      createUsuario(formData); 
      setTipoMensaje("success");
      setMensaje("¡Usuario creado exitosamente!");
      setFormData(initialState); // Limpiamos el formulario

    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al crear el usuario: " + error.message);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Crear Nuevo Usuario</h2>
          <p className="text-muted">Complete el formulario para registrar un nuevo usuario en el sistema.</p>
        </Col>
      </Row>

      {/* Renderiza el Alert (solo si hay mensaje) */}
      {mensaje && (
        <Row>
          <Col lg={10} className="mx-auto">
            <Alert variant={tipoMensaje} onClose={() => setMensaje("")} dismissible>
              {mensaje}
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={10} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit} noValidate>
                 {/* Fila para RUT y Email */}
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formRut">
                    <Form.Label>RUT</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese RUT" name="rut" value={formData.rut} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese correo" name="email" value={formData.email} onChange={handleChange} />
                  </Form.Group>
                </Row>
                {/* Fila para Nombre y Apellidos */}
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formApellidos">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                  </Form.Group>
                </Row>
                {/* Fila para Fecha Nacimiento y Dirección */}
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formFechaNac">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control type="date" name="fechaNac" value={formData.fechaNac} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formDireccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
                  </Form.Group>
                </Row>
                {/* Fila para Región y Comuna */}
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="formRegion">
                    <Form.Label>Región</Form.Label>
                    <Form.Select name="region" value={formData.region} onChange={handleChange}>
                      <option value="">Seleccione una región</option>
                      {listaRegiones.map(region => (<option key={region} value={region}>{region}</option>))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formComuna">
                    <Form.Label>Comuna</Form.Label>
                    <Form.Select name="comuna" value={formData.comuna} onChange={handleChange} disabled={listaComunas.length === 0}>
                      <option value="">{formData.region ? "Seleccione una comuna" : "Seleccione una región"}</option>
                      {listaComunas.map(comuna => (<option key={comuna} value={comuna}>{comuna}</option>))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                {/* Fila para Contraseñas y Tipo de Usuario */}
                <Row className="mb-3">
                  <Form.Group as={Col} md={4} controlId="formPass1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="formPass2">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Confirme contraseña" name="contraseñaCon" value={formData.contraseñaCon} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="formTipo">
                    <Form.Label>Tipo de Usuario</Form.Label>
                    <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
                      <option value="cliente">Cliente</option>
                      <option value="vendedor">Vendedor</option>
                      <option value="administrador">Administrador</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                {/* Botón de envío */}
                <div className="text-end">
                  <Button variant="primary" type="submit">Crear Usuario</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}