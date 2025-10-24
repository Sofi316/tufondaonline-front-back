// src/pages/Comprar.jsx
import React, { useState, useEffect } from 'react'; // Necesitas useEffect
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../components/CarritoContext'; // Asegúrate que la ruta sea correcta
import { agregarOrden } from '../data/usersData'; // Importa función para guardar orden (Asegúrate que la ruta sea correcta)
import { useAuth } from '../context/AuthContext'; // Importa useAuth para obtener el usuario (Asegúrate que la ruta sea correcta)
// 1. IMPORTA las funciones de tu archivo de datos
import { getRegiones, getComunas } from '../data/datos'; // Asegúrate que la ruta sea correcta

export default function Comprar() {
  const { carrito, montoTotal, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();
  // Obtén el usuario logueado del contexto
  const { usuarioLogueado } = useAuth();

  // Estado inicial del formulario (vacío)
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: '', // Empieza vacío
    comuna: '', // Empieza vacío
    indicaciones: ''
  });
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false); // Para estilos de validación de Bootstrap

  // --- NUEVOS ESTADOS para las listas desplegables ---
  const [regionesList, setRegionesList] = useState([]);
  const [comunasList, setComunasList] = useState([]);
  // --------------------------------------------------

  // --- EFECTO para cargar las REGIONES al montar ---
  useEffect(() => {
    setRegionesList(getRegiones()); // Llama a tu función y guarda las regiones
  }, []); // El array vacío [] asegura que solo se ejecute una vez al inicio
  // -----------------------------------------------

  // --- EFECTO para cargar las COMUNAS cuando cambia la REGIÓN ---
  useEffect(() => {
    if (formData.region) { // Solo si hay una región seleccionada
      console.log(`Cargando comunas para: ${formData.region}`); // Para depurar
      setComunasList(getComunas(formData.region)); // Llama a tu función y guarda las comunas
    } else {
      setComunasList([]); // Si no hay región, vacía la lista de comunas
    }
    // Este efecto depende de formData.region
  }, [formData.region]);
  // ----------------------------------------------------------

  // --- EFECTO PARA AUTOCOMPLETAR ---
  useEffect(() => {
    // Solo si hay un usuario logueado
    if (usuarioLogueado) {
      console.log("Usuario logueado detectado para autocompletar:", usuarioLogueado);
      // Rellena el estado del formulario con los datos del usuario logueado
      setFormData(prev => ({
        ...prev, // Mantiene lo que ya estaba
        nombre: usuarioLogueado.nombre?.split(' ')[0] || '',
        apellidos: usuarioLogueado.nombre?.split(' ').slice(1).join(' ') || '',
        correo: usuarioLogueado.email || '',
        calle: usuarioLogueado.direccion || '',
        // Valida y setea región/comuna del usuario
        region: getRegiones().includes(usuarioLogueado.region) ? usuarioLogueado.region : '',
        // La comuna se cargará por el efecto anterior si la región es válida
        comuna: '', // Inicia comuna vacía, el efecto de región la cargará si aplica
        departamento: prev.departamento || '',
        indicaciones: prev.indicaciones || '',
      }));
      // Carga comunas si la región del usuario se autocompletó correctamente
      if (getRegiones().includes(usuarioLogueado.region)) {
         setComunasList(getComunas(usuarioLogueado.region));
         // Intenta setear la comuna DESPUÉS de cargar la lista
         setTimeout(() => { // Pequeño delay para asegurar que comunasList se actualice
             if (getComunas(usuarioLogueado.region).includes(usuarioLogueado.comuna)){
                setFormData(prev => ({ ...prev, comuna: usuarioLogueado.comuna }));
             }
         }, 0);
      }

    } else {
       console.log("No hay usuario logueado para autocompletar.");
    }
  }, [usuarioLogueado]); // Dependencia: usuarioLogueado
  // --- FIN AUTOCOMPLETAR ---

  // Maneja cambios en TODOS los inputs/selects
  const handleChange = (e) => {
    setError(''); // Limpia mensajes de error al escribir
    const { name, value } = e.target;
    // Actualiza el estado del formulario campo por campo
    setFormData(prev => {
        const newState = { ...prev, [name]: value };
        // SI CAMBIA LA REGIÓN, resetea la comuna seleccionada
        if (name === 'region') {
            newState.comuna = ''; // Resetea comuna al cambiar región
            console.log("Región cambiada, reseteando comuna"); // Para depurar
        }
        return newState;
    });
  };

  // Maneja el envío del formulario (simulación de pago)
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue
    event.stopPropagation(); // Detiene la propagación del evento
    setError(''); // Limpia errores previos

    const form = event.currentTarget; // Obtiene el formulario
    // Valida campos requeridos + selects
    if (form.checkValidity() === false || !formData.region || !formData.comuna) {
      setValidated(true); // Activa los estilos de validación de Bootstrap
      setError('Por favor, completa todos los campos requeridos, incluyendo región y comuna.');
      return; // Detiene el envío si el formulario no es válido
    }
    setValidated(true); // Marca como validado para mostrar estilos (aunque sea válido)

    // --- SIMULACIÓN DE PAGO ---
    console.log("Procesando pago con datos:", formData);
    const orderNumber = `ORD-${Date.now()}`; // Genera un número de orden simple
    const paymentSuccess = Math.random() > 0.5; // Simula éxito 50% de las veces

    // Prepara los detalles completos de la orden
    const orderDetails = {
        orderNumber,
        customerInfo: { ...formData }, // Guarda la info del formulario
        items: [...carrito], // Guarda una copia de los items del carrito
        total: montoTotal // Guarda el total calculado
    };

    if (paymentSuccess) {
      console.log("Pago Exitoso. Orden:", orderNumber);
      try {
        agregarOrden(orderDetails); // Llama a la función de usersData.js para guardar
      } catch (error) {
        console.error("Error al guardar la orden:", error);
        // Considera mostrar un mensaje al usuario aquí
      }
      vaciarCarrito(); // Limpia el carrito de compras
      // Redirige a la página de éxito, pasando los detalles
      navigate('/pago-exitoso', { state: { orderDetails } });
    } else {
      console.log("Pago Fallido. Orden:", orderNumber);
      // Redirige a la página de fallo, pasando los detalles
      navigate('/pago-fallido', { state: { orderDetails } });
    }
    // --- FIN SIMULACIÓN DE PAGO ---
  };

  // Función para formatear números a peso chileno
   const formatPesoChileno = (valor) => {
    if (typeof valor !== 'number') return '$NaN'; // Manejo de errores
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <Container className="my-5"> {/* Margen vertical */}
      {/* Breadcrumb de navegación */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/Carrito">Carrito</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Comprar</li>
        </ol>
      </nav>

      <h2>Finalizar Compra</h2> {/* Título ajustado */}
      <p className="text-muted mb-4">Completa tu información para procesar el pedido.</p> {/* Texto ajustado */}

      {/* Muestra mensaje de error general si existe */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Formulario principal */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          {/* Columna Resumen del Carrito */}
          <Col md={5} lg={4} className="order-md-last mb-4">
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Tu Carrito</h4>
                <Badge bg="secondary" pill>{carrito.length} items</Badge>
              </Card.Header>
              <ListGroup variant="flush">
                {carrito.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between lh-sm py-2 px-3">
                    <div>
                      <h6 className="my-0">{item.nombre} <small className="text-muted"> (x{item.cantidad})</small></h6>
                    </div>
                    <span className="text-muted">{formatPesoChileno(item.precio * item.cantidad)}</span>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between py-3 px-3">
                  <strong className="fs-5">Total (CLP)</strong>
                  <strong className="fs-5">{formatPesoChileno(montoTotal)}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          {/* Columna Formulario de Checkout */}
          <Col md={7} lg={8}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                {/* --- Sección Información del cliente --- */}
                <h4 className="mb-3">Información del cliente</h4>
                 {usuarioLogueado && <Alert variant='info' size='sm'>Campos pre-llenados con tu información. Por favor, verifica.</Alert>}
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group controlId="nombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                      <Form.Control.Feedback type="invalid">Tu nombre es requerido.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="apellidos">
                      <Form.Label>Apellidos</Form.Label>
                      <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                       <Form.Control.Feedback type="invalid">Tus apellidos son requeridos.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                     <Form.Group controlId="correo">
                       <Form.Label>Correo</Form.Label>
                       <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="tu@ejemplo.com" required />
                        <Form.Control.Feedback type="invalid">Un correo válido es requerido.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-4" />

                {/* --- Sección Dirección de entrega --- */}
                <h4 className="mb-3">Dirección de entrega</h4>
                <Row className="g-3">
                   <Col sm={9}>
                     <Form.Group controlId="calle">
                       <Form.Label>Calle y Número</Form.Label>
                       <Form.Control type="text" name="calle" value={formData.calle} onChange={handleChange} placeholder="Ej: Av. Pajaritos 123" required />
                       <Form.Control.Feedback type="invalid">La calle y número son requeridos.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                   <Col sm={3}>
                     <Form.Group controlId="departamento">
                       <Form.Label>Depto <span className="text-muted">(Opc.)</span></Form.Label>
                       <Form.Control type="text" name="departamento" value={formData.departamento} onChange={handleChange} placeholder="101"/>
                    </Form.Group>
                  </Col>
                  {/* --- SELECT DE REGIÓN --- */}
                  <Col md={6}>
                    <Form.Group controlId="region">
                       <Form.Label>Región</Form.Label>
                       <Form.Select
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          required
                          aria-label="Seleccione una región"
                        >
                          <option value="">Seleccione una región...</option>
                          {regionesList.map(region => (
                            <option key={region} value={region}>{region}</option>
                          ))}
                       </Form.Select>
                       <Form.Control.Feedback type="invalid">Debes seleccionar una región.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* --- FIN SELECT REGIÓN --- */}
                  {/* --- SELECT DE COMUNA --- */}
                  <Col md={6}>
                     <Form.Group controlId="comuna">
                       <Form.Label>Comuna</Form.Label>
                       <Form.Select
                          name="comuna"
                          value={formData.comuna}
                          onChange={handleChange}
                          required
                          disabled={!formData.region || comunasList.length === 0} // Deshabilitado sin región
                          aria-label="Seleccione una comuna"
                        >
                          <option value="">{formData.region ? 'Seleccione una comuna...' : 'Seleccione una región primero'}</option>
                          {comunasList.map(comuna => (
                            <option key={comuna} value={comuna}>{comuna}</option>
                          ))}
                       </Form.Select>
                       <Form.Control.Feedback type="invalid">Debes seleccionar una comuna.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {/* --- FIN SELECT COMUNA --- */}
                  <Col sm={12}>
                     <Form.Group controlId="indicaciones">
                       <Form.Label>Indicaciones <span className="text-muted">(Opc.)</span></Form.Label>
                       <Form.Control as="textarea" rows={3} name="indicaciones" value={formData.indicaciones} onChange={handleChange} placeholder="Ej: Dejar en conserjería, casa con rejas blancas..."/>
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-4" />

                {/* --- BOTÓN ÚNICO DE PAGO --- */}
                <div className="d-grid">
                  <Button type="submit" variant="success" size="lg" disabled={carrito.length === 0}>
                    {carrito.length === 0 ? "Tu carrito está vacío" : `Pagar ahora ${formatPesoChileno(montoTotal)}`}
                  </Button>
                </div>
                {/* --------------------------- */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}