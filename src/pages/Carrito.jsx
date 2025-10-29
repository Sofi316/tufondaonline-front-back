import React, { useState } from "react";
import { useCarrito } from "../components/CarritoContext";
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup, Alert, Table } from 'react-bootstrap';
import { useAuth } from "../context/AuthContext";

function Carrito() {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, montoSubtotal, montoDescuento, montoTotal } = useCarrito();
  const { aplicarCodigoDescuento, codigoDescuentoUsado } = useAuth();
  const [codigoInput, setCodigoInput] = useState('');
  const [mensajeCodigo, setMensajeCodigo] = useState('');
  const [tipoMensajeCodigo, setTipoMensajeCodigo] = useState('success');

  const handleAplicarCodigo = () => {
    const resultado = aplicarCodigoDescuento(codigoInput);
    setMensajeCodigo(resultado.message);
    setTipoMensajeCodigo(resultado.success ? 'success' : 'danger');
    if (!resultado.success) {
        setCodigoInput('');
    }
  };

  const formatPesoChileno = (valor) => {
    if (typeof valor !== 'number') return '$NaN';
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <div className="container mt-4">
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
              <li className="breadcrumb-item"><Link to="/categorias">Categorias</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Carrito</li>
            </ol>
        </nav>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x" style={{fontSize: '4rem', color: '#6c757d'}}></i>
          <p className="lead mt-3">Tu carrito está vacío.</p>
          <Link to="/categorias" className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i> Volver a Productos
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive shadow-sm">
            <Table hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{width: '40%'}}>Producto</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.img}
                          alt={item.nombre}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          className="me-3 rounded"
                        />
                        <span>{item.nombre}</span>
                      </div>
                    </td>
                    <td className="text-end">{formatPesoChileno(item.precio)}</td>
                    <td className="text-center">
                      <InputGroup size="sm" style={{ width: '100px', margin:'auto' }}>
                        <Button
                          variant="outline-secondary"
                          onClick={() => actualizarCantidad(item.nombre, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
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
                          onClick={() => actualizarCantidad(item.nombre, item.cantidad + 1)}
                        >
                          +
                        </Button>
                      </InputGroup>
                    </td>
                    <td className="text-end fw-bold">{formatPesoChileno(item.precio * item.cantidad)}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarDelCarrito(item.nombre)}
                        title="Eliminar producto"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="row mt-4 justify-content-between">
            <div className="col-md-6 col-lg-5 mb-3">
              <h5>¿Tienes un código de descuento?</h5>
              {codigoDescuentoUsado ? (
                <Alert variant="info" className="py-2 px-3">
                  Código <strong>"{codigoDescuentoUsado}"</strong> aplicado ({montoDescuento > 0 ? `${(montoDescuento / montoSubtotal * 100).toFixed(0)}%` : '0%'} dto).
                </Alert>
              ) : (
                <>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Ej: FELICES8"
                      value={codigoInput}
                      onChange={(e) => {
                          setCodigoInput(e.target.value.toUpperCase());
                          setMensajeCodigo('');
                      }}
                      aria-label="Código de descuento"
                    />
                    <Button variant="outline-secondary" onClick={handleAplicarCodigo} disabled={!codigoInput}>
                      Aplicar
                    </Button>
                  </InputGroup>
                  {mensajeCodigo && <Alert variant={tipoMensajeCodigo} className="mt-2 py-1 px-2 small">{mensajeCodigo}</Alert>}
                </>
              )}
              <Button variant="outline-danger" onClick={vaciarCarrito} className="mt-3">
                Vaciar Carrito
              </Button>
            </div>
            <div className="col-md-6 col-lg-5 text-end">
              {montoDescuento > 0 && (
                <>
                  <h5>Subtotal: {formatPesoChileno(montoSubtotal)}</h5>
                  <h5 className="text-success">Descuento ({codigoDescuentoUsado}): -{formatPesoChileno(montoDescuento)}</h5>
                  <hr className="my-2"/>
                </>
              )}
              <h3 className="mb-3">Total: {formatPesoChileno(montoTotal)}</h3>
                 <Link to="/comprar" className="btn btn-success btn-lg">
                    Proceder al Pago <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;