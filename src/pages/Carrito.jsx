// src/pages/Carrito.jsx
import React, { useState } from "react"; // Necesitas useState para el input del código
import { useCarrito } from "../components/CarritoContext"; // Asegúrate que la ruta sea correcta
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup, Alert, Table } from 'react-bootstrap'; // Importa componentes necesarios
// Importa useAuth para llamar a aplicarCodigoDescuento
import { useAuth } from "../context/AuthContext"; // Asegúrate que la ruta sea correcta

function Carrito() {
  // Obtiene valores y funciones del CarritoContext
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, montoSubtotal, montoDescuento, montoTotal } = useCarrito();
  // Obtiene la función para aplicar código y el código ya usado del AuthContext
  const { aplicarCodigoDescuento, codigoDescuentoUsado } = useAuth();

  // Estado local para el valor del input del código de descuento
  const [codigoInput, setCodigoInput] = useState('');
  // Estado local para mostrar mensajes relacionados al código (éxito/error)
  const [mensajeCodigo, setMensajeCodigo] = useState('');
  const [tipoMensajeCodigo, setTipoMensajeCodigo] = useState('success'); // 'success' o 'danger'

  // Función que se ejecuta al presionar el botón "Aplicar"
  const handleAplicarCodigo = () => {
    // Llama a la función del AuthContext para validar y aplicar el código
    const resultado = aplicarCodigoDescuento(codigoInput);
    setMensajeCodigo(resultado.message); // Muestra el mensaje devuelto
    setTipoMensajeCodigo(resultado.success ? 'success' : 'danger'); // Ajusta el color del mensaje
    // Si el código no fue válido, limpia el input para que pueda intentar de nuevo
    if (!resultado.success) {
        setCodigoInput('');
    }
  };

   // Función para formatear a peso chileno (opcional, podrías tenerla global)
   const formatPesoChileno = (valor) => {
    if (typeof valor !== 'number') return '$NaN';
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <div className="container mt-4">
        {/* Breadcrumb de navegación */}
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
              {/* Ajusta esta ruta si tu página de productos ahora es /categorias */}
              <li className="breadcrumb-item"><Link to="/categorias">Productos</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Carrito</li>
            </ol>
        </nav>
      <h2>Carrito de Compras</h2>

      {/* Muestra mensaje si el carrito está vacío */}
      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x" style={{fontSize: '4rem', color: '#6c757d'}}></i> {/* Icono carrito vacío */}
          <p className="lead mt-3">Tu carrito está vacío.</p>
          <Link to="/categorias" className="btn btn-primary"> {/* Enlace a Categorías */}
            <i className="bi bi-arrow-left me-2"></i> Volver a Productos
          </Link>
        </div>
      ) : (
        // Muestra la tabla y totales si hay items
        <>
          {/* Tabla con los productos del carrito */}
          <div className="table-responsive shadow-sm"> {/* Añadido shadow */}
            <Table hover className="align-middle"> {/* hover effect */}
              <thead className="table-light"> {/* Fondo claro para header */}
                <tr>
                  <th style={{width: '40%'}}>Producto</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapea cada item del carrito a una fila de la tabla */}
                {carrito.map((item) => (
                  <tr key={item.id}> {/* Usa id como key */}
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.img}
                          alt={item.nombre}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          className="me-3 rounded"
                        />
                        <span>{item.nombre}</span> {/* Span para mejor alineación */}
                      </div>
                    </td>
                    <td className="text-end">{formatPesoChileno(item.precio)}</td>
                    <td className="text-center">
                      {/* Grupo de botones para +/- cantidad */}
                      <InputGroup size="sm" style={{ width: '100px', margin:'auto' }}> {/* size="sm", centrado */}
                        <Button
                          variant="outline-secondary"
                          onClick={() => actualizarCantidad(item.nombre, item.cantidad - 1)} // Usa nombre
                          disabled={item.cantidad <= 1} // Deshabilita si es 1
                        >
                          -
                        </Button>
                        <Form.Control
                          type="text"
                          className="text-center"
                          value={item.cantidad}
                          readOnly
                          style={{maxWidth: '40px'}}
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => actualizarCantidad(item.nombre, item.cantidad + 1)} // Usa nombre
                        >
                          +
                        </Button>
                      </InputGroup>
                    </td>
                    <td className="text-end fw-bold">{formatPesoChileno(item.precio * item.cantidad)}</td> {/* fw-bold */}
                    <td className="text-center">
                      {/* Botón para eliminar item */}
                      <Button
                        variant="outline-danger" // outline
                        size="sm"
                        onClick={() => eliminarDelCarrito(item.nombre)} // Usa nombre
                        title="Eliminar producto" // Tooltip
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* --- SECCIÓN CÓDIGO DE DESCUENTO Y TOTALES --- */}
          <div className="row mt-4 justify-content-between"> {/* justify-content-between */}
            {/* Columna para Código de Descuento */}
            <div className="col-md-6 col-lg-5 mb-3">
              <h5>¿Tienes un código de descuento?</h5>
              {codigoDescuentoUsado ? (
                // Muestra si ya hay un código aplicado
                <Alert variant="info" className="py-2 px-3"> {/* Padding ajustado */}
                  Código <strong>"{codigoDescuentoUsado}"</strong> aplicado ({montoDescuento > 0 ? `${(montoDescuento / montoSubtotal * 100).toFixed(0)}%` : '0%'} dto).
                </Alert>
              ) : (
                // Muestra input para aplicar código
                <>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Ej: FELICES8"
                      value={codigoInput}
                      onChange={(e) => {
                          setCodigoInput(e.target.value.toUpperCase()); // Guarda en mayúsculas
                          setMensajeCodigo(''); // Limpia mensaje al escribir
                      }}
                      aria-label="Código de descuento"
                    />
                    <Button variant="outline-secondary" onClick={handleAplicarCodigo} disabled={!codigoInput}>
                      Aplicar
                    </Button>
                  </InputGroup>
                  {/* Muestra mensaje de éxito/error al aplicar código */}
                  {mensajeCodigo && <Alert variant={tipoMensajeCodigo} className="mt-2 py-1 px-2 small">{mensajeCodigo}</Alert>}
                </>
              )}
               {/* Botón Vaciar Carrito (movido aquí) */}
              <Button variant="outline-danger" onClick={vaciarCarrito} className="mt-3">
                Vaciar Carrito
              </Button>
            </div>

            {/* Columna para Totales y Botón Pagar */}
            <div className="col-md-6 col-lg-5 text-end">
              {/* Muestra desglose solo si hay descuento */}
              {montoDescuento > 0 && (
                <>
                  <h5>Subtotal: {formatPesoChileno(montoSubtotal)}</h5>
                  <h5 className="text-success">Descuento ({codigoDescuentoUsado}): -{formatPesoChileno(montoDescuento)}</h5>
                  <hr className="my-2"/> {/* Separador más pequeño */}
                </>
              )}
              {/* Muestra el TOTAL FINAL */}
              <h3 className="mb-3">Total: {formatPesoChileno(montoTotal)}</h3>
              {/* Botón Proceder al Pago */}
                 <Link to="/comprar" className="btn btn-success btn-lg">
                    Proceder al Pago <i className="bi bi-arrow-right ms-1"></i> {/* Icono opcional */}
                  </Link>
            </div>
          </div>
          {/* --- FIN SECCIÓN --- */}
        </>
      )}
    </div>
  );
}

export default Carrito;