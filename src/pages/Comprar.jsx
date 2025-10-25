// src/pages/Comprar.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../components/CarritoContext'; // Asegúrate que la ruta sea correcta
import { agregarOrden } from '../data/usersData'; // Asegúrate que la ruta sea correcta
import { useAuth } from '../context/AuthContext'; // Asegúrate que la ruta sea correcta
import { getRegiones, getComunas } from '../data/datos'; // Asegúrate que la ruta sea correcta

export default function Comprar() {
  // Obtiene datos del carrito, usuario y navegación
  const { carrito, montoSubtotal, montoDescuento, montoTotal, vaciarCarrito } = useCarrito();
  const { usuarioLogueado, codigoDescuentoUsado } = useAuth();
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', correo: '', calle: '',
    departamento: '', region: '', comuna: '', indicaciones: ''
  });
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const [regionesList, setRegionesList] = useState([]);
  const [comunasList, setComunasList] = useState([]);
  // Mantenemos el estado para simular fallo (puedes borrar esto y la lógica relacionada si prefieres 50/50)
  const [simularFallo, setSimularFallo] = useState(false);

  // Efecto para cargar regiones
  useEffect(() => { setRegionesList(getRegiones()); }, []);

  // Efecto para cargar comunas al cambiar región
  useEffect(() => {
    if (formData.region) { setComunasList(getComunas(formData.region)); }
    else { setComunasList([]); }
  }, [formData.region]);

  // Efecto para autocompletar formulario
  useEffect(() => {
    if (usuarioLogueado) {
      const userRegion = usuarioLogueado.region || '';
      const userComuna = usuarioLogueado.comuna || '';
      const regionValida = getRegiones().includes(userRegion);

      setFormData(prev => ({
        ...prev,
        nombre: usuarioLogueado.nombre?.split(' ')[0] || '',
        apellidos: usuarioLogueado.nombre?.split(' ').slice(1).join(' ') || '',
        correo: usuarioLogueado.email || '',
        calle: usuarioLogueado.direccion || '',
        region: regionValida ? userRegion : '',
        comuna: '', // Se setea después si la región es válida
        departamento: prev.departamento || '',
        indicaciones: prev.indicaciones || '',
      }));

      if (regionValida) {
         const comunasDeRegion = getComunas(userRegion);
         setComunasList(comunasDeRegion);
         if (comunasDeRegion.includes(userComuna)){
             setTimeout(() => { // Delay para asegurar que comunasList se actualice
                 setFormData(prev => ({ ...prev, comuna: userComuna }));
             }, 0);
         }
      }
    } else {
         // Limpia el formulario si no hay usuario (ej. si cierra sesión)
         setFormData({
            nombre: '', apellidos: '', correo: '', calle: '',
            departamento: '', region: '', comuna: '', indicaciones: ''
         });
    }
  }, [usuarioLogueado]);

  // Manejador de cambios (incluye checkbox 'simularFallo')
  const handleChange = (e) => {
    setError('');
    const { name, value, type, checked } = e.target;
    if (name === 'simularFallo') { setSimularFallo(checked); return; } // Maneja checkbox
    setFormData(prev => { // Maneja resto de campos
        const newState = { ...prev, [name]: value };
        if (name === 'region') { newState.comuna = ''; } // Resetea comuna
        return newState;
    });
  };

  // Manejador de envío (con simulación controlada o aleatoria)
  const handleSubmit = (event) => {
     event.preventDefault(); event.stopPropagation(); setError('');
     const form = event.currentTarget;
     if (form.checkValidity() === false || !formData.region || !formData.comuna) {
       setValidated(true); setError('Por favor, completa campos requeridos (región y comuna).'); return;
     }
     setValidated(true);
     // --- SIMULACIÓN DE PAGO CONTROLADA ---
     const orderNumber = `ORD-${Date.now()}`;
     
     
    const paymentSuccess = Math.random() > 0.5;
     // ------------------------------------
     const orderDetails = { orderNumber, customerInfo: formData, items: carrito, total: montoTotal };
     if (paymentSuccess) {
       try { agregarOrden(orderDetails); } catch (e) { console.error("Error al guardar:", e); }
       vaciarCarrito();
       navigate('/pago-exitoso', { state: { orderDetails } });
     } else {
       navigate('/pago-fallido', { state: { orderDetails } });
     }
  };

  // Formato moneda (más robusto)
  const formatPesoChileno = (valor) => {
    if (typeof valor !== 'number' || isNaN(valor)) {
        return '$ -.---'; // Placeholder si el valor no es válido
    }
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  // --- JSX DEL COMPONENTE ---
  return (
    <Container className="my-5">
      {/* Breadcrumb y Título */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/Carrito">Carrito</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Comprar</li>
        </ol>
      </nav>
      <h2>Finalizar Compra</h2>
      <p className="text-muted mb-4">Completa tu información para procesar el pedido.</p>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          {/* Columna Resumen Carrito (con desglose) */}
          <Col md={5} lg={4} className="order-md-last mb-4">
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Resumen</h4>
                <Badge bg="secondary" pill>{carrito.length} items</Badge>
              </Card.Header>
              <ListGroup variant="flush">
                {carrito.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between lh-sm py-2 px-3">
                    <div>
                      <h6 className="my-0">{item.nombre} <small className="text-muted">(x{item.cantidad})</small></h6>
                    </div>
                    <span className="text-muted">{formatPesoChileno(item.precio * item.cantidad)}</span>
                  </ListGroup.Item>
                ))}
                {/* Desglose de Totales */}
                {montoDescuento > 0 && (
                  <ListGroup.Item className="d-flex justify-content-between py-2 px-3 text-muted">
                    <span>Subtotal</span>
                    <span>{formatPesoChileno(montoSubtotal)}</span>
                  </ListGroup.Item>
                )}
                {montoDescuento > 0 && (
                   <ListGroup.Item className="d-flex justify-content-between py-2 px-3 text-success">
                    <span>Descuento ({codigoDescuentoUsado || `${(montoDescuento/montoSubtotal*100).toFixed(0)}%`})</span>
                    <span>-{formatPesoChileno(montoDescuento)}</span>
                  </ListGroup.Item>
                )}
                <ListGroup.Item className="d-flex justify-content-between py-3 px-3">
                  <strong className="fs-5">Total a Pagar</strong>
                  <strong className="fs-5">{formatPesoChileno(montoTotal)}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          {/* Columna Formulario */}
          <Col md={7} lg={8}>
             <Card className="shadow-sm">
                <Card.Body className="p-4">
                  {/* Info Cliente */}
                  <h4 className="mb-3">Información del cliente</h4>
                  {usuarioLogueado && <Alert variant='info' size='sm'>Campos pre-llenados...</Alert>}
                  <Row className="g-3">
                    <Col sm={6}><Form.Group controlId="nombre"><Form.Label>Nombre</Form.Label><Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required /><Form.Control.Feedback type="invalid">Requerido.</Form.Control.Feedback></Form.Group></Col>
                    <Col sm={6}><Form.Group controlId="apellidos"><Form.Label>Apellidos</Form.Label><Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required /><Form.Control.Feedback type="invalid">Requerido.</Form.Control.Feedback></Form.Group></Col>
                    <Col sm={12}><Form.Group controlId="correo"><Form.Label>Correo</Form.Label><Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="tu@ejemplo.com" required /><Form.Control.Feedback type="invalid">Requerido.</Form.Control.Feedback></Form.Group></Col>
                  </Row>
                  <hr className="my-4" />
                  {/* Dirección */}
                  <h4 className="mb-3">Dirección de entrega</h4>
                  <Row className="g-3">
                    <Col sm={9}><Form.Group controlId="calle"><Form.Label>Calle y Número</Form.Label><Form.Control type="text" name="calle" value={formData.calle} onChange={handleChange} placeholder="Ej: Av. Pajaritos 123" required /><Form.Control.Feedback type="invalid">Requerido.</Form.Control.Feedback></Form.Group></Col>
                    <Col sm={3}><Form.Group controlId="departamento"><Form.Label>Depto <span className="text-muted">(Opc.)</span></Form.Label><Form.Control type="text" name="departamento" value={formData.departamento} onChange={handleChange} placeholder="101"/></Form.Group></Col>
                    <Col md={6}><Form.Group controlId="region"><Form.Label>Región</Form.Label><Form.Select name="region" value={formData.region} onChange={handleChange} required aria-label="Región"><option value="">Seleccione...</option>{regionesList.map(r => (<option key={r} value={r}>{r}</option>))}</Form.Select><Form.Control.Feedback type="invalid">Requerido.</Form.Control.Feedback></Form.Group></Col>
                    <Col md={6}><Form.Group controlId="comuna"><Form.Label>Comuna</Form.Label><Form.Select name="comuna" value={formData.comuna} onChange={handleChange} required disabled={!formData.region || comunasList.length === 0} aria-label="Comuna"><option value="">{formData.region ? 'Seleccione...' : 'Región primero'}</option>{comunasList.map(c => (<option key={c} value={c}>{c}</option>))}</Form.Select><Form.Control.Feedback type="invalid">Requerido.</Form.Control.Feedback></Form.Group></Col>
                    <Col sm={12}><Form.Group controlId="indicaciones"><Form.Label>Indicaciones <span className="text-muted">(Opc.)</span></Form.Label><Form.Control as="textarea" rows={3} name="indicaciones" value={formData.indicaciones} onChange={handleChange} placeholder="Ej: Dejar en conserjería..."/></Form.Group></Col>
                  </Row>
         
                  <hr className="my-4" />
                  {/* Botón Pagar */}
                  <div className="d-grid">
                    <Button type="submit" variant="success" size="lg" disabled={carrito.length === 0}>
                       {carrito.length === 0 ? "Tu carrito está vacío" : `Pagar ahora ${formatPesoChileno(montoTotal)}`}
                    </Button>
                  </div>
                </Card.Body>
             </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}