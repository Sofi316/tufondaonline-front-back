import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function PagoFallido() {
  const location = useLocation();
  
  // Intentar obtener los datos de la compra fallida del state, o usar datos por defecto
  const compraData = location.state || {
    numeroOrden: `#${Math.floor(10000000 + Math.random() * 90000000)}`,
    cliente: {
      nombre: 'No especificado',
      apellido: 'No especificado',
      correo: 'No especificado'
    },
    total: 0
  };

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-4">
        <Link to="/">Inicio</Link> / <Link to="/carrito">Carrito</Link> / <Link to="/checkout">Checkout</Link> / Pago Fallido
      </div>

      <div className="card">
        <div className="card-body">
          {/* Encabezado de error */}
          <div className="text-center mb-4">
            <div className="text-danger mb-3">
              <i className="fas fa-times-circle fa-5x"></i>
            </div>
            <h1 className="card-title">No se pudo procesar el pago de la compra nro {compraData.numeroOrden}</h1>
          </div>

          {/* Información de la transacción fallida */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-danger">
                <h5 className="alert-heading">¡Transacción rechazada!</h5>
                <p className="mb-0">
                  Lo sentimos, no pudimos procesar tu pago. Esto puede deberse a problemas con tu método de pago,
                  fondos insuficientes o errores temporales del sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Información del Cliente (si está disponible) */}
          <h5 className="mb-3">Información de la transacción</h5>
          <div className="row mb-4">
            <div className="col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Número de Orden</th>
                    <th>Cliente</th>
                    <th>Correo</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{compraData.numeroOrden}</td>
                    <td>{compraData.cliente.nombre} {compraData.cliente.apellido}</td>
                    <td>{compraData.cliente.correo}</td>
                    <td>${compraData.total.toLocaleString('es-CL')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Posibles causas y soluciones */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-warning text-dark">
                  <strong>Posibles causas</strong>
                </div>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>Fondos insuficientes en la cuenta</li>
                    <li>Tarjeta bloqueada o vencida</li>
                    <li>Límite de la tarjeta excedido</li>
                    <li>Error temporal del sistema bancario</li>
                    <li>Datos de la tarjeta incorrectos</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <strong>Recomendaciones</strong>
                </div>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>Verifica los datos de tu tarjeta</li>
                    <li>Contacta con tu entidad bancaria</li>
                    <li>Intenta con otro método de pago</li>
                    <li>Espera unos minutos y reintenta</li>
                    <li>Verifica que tienes fondos suficientes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <hr />

          {/* Botones de acción */}
          <div className="row mt-4">
            <div className="col-md-4">
              <Link to="/carrito" className="btn btn-outline-primary w-100">
                <i className="fas fa-shopping-cart me-2"></i>
                Volver al Carrito
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/checkout" className="btn btn-warning w-100">
                <i className="fas fa-redo me-2"></i>
                Reintentar Pago
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/" className="btn btn-outline-secondary w-100">
                <i className="fas fa-home me-2"></i>
                Volver al Inicio
              </Link>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="alert alert-info mt-4">
            <h6 className="alert-heading">¿Necesitas ayuda?</h6>
            <p className="mb-0">
              Si continúas teniendo problemas, por favor contacta a nuestro servicio al cliente 
              en <strong>soporte@tienda.com</strong> o al <strong>+56 2 2345 6789</strong>.
            </p>
          </div>

          {/* Información adicional para desarrollo */}
          {process.env.NODE_ENV === 'development' && location.state && (
            <div className="alert alert-dark mt-3">
              <h6 className="alert-heading">Información de Debug (Solo Desarrollo)</h6>
              <pre className="mb-0" style={{ fontSize: '0.8rem' }}>
                {JSON.stringify(location.state, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PagoFallido;