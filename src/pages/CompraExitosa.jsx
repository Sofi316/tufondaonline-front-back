import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CompraExitosa() {
  const location = useLocation();
  
  // Datos por defecto en caso de que no se pasen datos por el state
  const defaultData = {
    numeroOrden: `#${Math.floor(10000000 + Math.random() * 90000000)}`,
    cliente: {
      nombre: 'No especificado',
      apellido: 'No especificado',
      correo: 'No especificado',
      calle: 'No especificado',
      departamento: '',
      region: 'No especificado',
      comuna: 'No especificado',
      indicaciones: ''
    },
    productos: [
      { nombre: 'Producto no disponible', precio: 0, cantidad: 1, subtotal: 0 }
    ],
    total: 0
  };

  const compraData = location.state || defaultData;

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-4">
        <Link to="/">Inicio</Link> / <Link to="/carrito">Carrito</Link> / <Link to="/checkout">Checkout</Link> / Compra Exitosa
      </div>

      <div className="card">
        <div className="card-body">
          {/* Encabezado de confirmación */}
          <div className="text-center mb-4">
            <div className="text-success mb-3">
              <i className="fas fa-check-circle fa-5x"></i>
            </div>
            <h1 className="card-title">Se ha realizado la compra. nro {compraData.numeroOrden}</h1>
          </div>

          <h3 className="mb-3">Completa la siguiente información</h3>

          {/* Información del Cliente */}
          <div className="row mb-4">
            <div className="col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Nombre*</th>
                    <th>Apellido*</th>
                    <th>Correo*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{compraData.cliente.nombre}</td>
                    <td>{compraData.cliente.apellido}</td>
                    <td>{compraData.cliente.correo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dirección de Entrega */}
          <h5 className="mb-3">Dirección de entrega de los productos</h5>
          <div className="row mb-4">
            <div className="col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Calle*</th>
                    <th>Departamento (opcional)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{compraData.cliente.calle}</td>
                    <td>{compraData.cliente.departamento || 'No especificado'}</td>
                  </tr>
                </tbody>
              </table>
              
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>Región*</th>
                    <th>Comuna*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{compraData.cliente.region}</td>
                    <td>{compraData.cliente.comuna}</td>
                  </tr>
                </tbody>
              </table>

              {compraData.cliente.indicaciones && (
                <div className="mt-3">
                  <strong>Indicaciones para la entrega (opcional)</strong>
                  <p className="mb-0">{compraData.cliente.indicaciones}</p>
                </div>
              )}
            </div>
          </div>

          <hr />

          {/* Productos Comprados */}
          <h5 className="mb-3">Productos comprados</h5>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {compraData.productos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio.toLocaleString('es-CL')}</td>
                    <td>{producto.cantidad}</td>
                    <td>${((producto.precio || 0) * (producto.cantidad || 0)).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <hr />

          {/* Total Pagado */}
          <div className="text-end">
            <h3>Total pagado: ${compraData.total.toLocaleString('es-CL')}</h3>
          </div>

          {/* Botones de acción */}
          <div className="row mt-4">
            <div className="col-md-6">
              <Link to="/" className="btn btn-outline-primary w-100">
                <i className="fas fa-home me-2"></i>
                Volver al Inicio
              </Link>
            </div>
            <div className="col-md-6">
              <button 
                className="btn btn-success w-100"
                onClick={() => window.print()}
              >
                <i className="fas fa-print me-2"></i>
                Imprimir Comprobante
              </button>
            </div>
          </div>

          {/* Información adicional */}
          <div className="alert alert-info mt-4">
            <h6 className="alert-heading">¡Gracias por tu compra!</h6>
            <p className="mb-0">
              Hemos enviado un correo de confirmación a <strong>{compraData.cliente.correo}</strong>. 
              Recibirás una notificación cuando tu pedido sea enviado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompraExitosa;