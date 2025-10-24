
import React from "react";
import { useCarrito } from "../components/CarritoContext"; // Asegúrate que la ruta sea correcta
import { Link } from 'react-router-dom';

function Carrito() {
  // Obtenemos montoTotal del contexto
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, montoTotal } = useCarrito();

  return (
    <div className="container mt-4">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-4"> {/* Añadido margen inferior */}
            <Link to="/" className="text-decoration-none text-muted">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/productos" className="text-decoration-none text-muted">Productos</Link>
            <span className="mx-2">/</span>
            <span className="fw-bold">Carrito</span>
        </div>
      <h2>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <p>Tu carrito está vacío</p>
          <Link to="/categorias" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle"> {/* align-middle para centrar verticalmente */}
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Usamos item.id como key */}
                {carrito.map((item) => (
                  <tr key={item.id}> {/* Usamos id como key */}
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.img}
                          alt={item.nombre}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          className="me-3 rounded" // Añadido rounded
                        />
                        {item.nombre}
                      </div>
                    </td>
                    <td>${item.precio.toLocaleString('es-CL')}</td>
                    <td>
                      <div className="input-group" style={{ width: '130px' }}> {/* Un poco más ancho */}
                        <button
                          className="btn btn-outline-secondary btn-sm" // btn-sm
                          // Pasamos item.nombre a actualizarCantidad
                          onClick={() => actualizarCantidad(item.nombre, item.cantidad - 1)}
                        >
                          -
                        </button>
                        <input
                          type="text" // Cambiado a text para evitar flechas
                          className="form-control form-control-sm text-center" // form-control-sm
                          value={item.cantidad}
                          readOnly // Mantenemos readonly
                          style={{maxWidth: '40px'}} // Ancho fijo para el número
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm" // btn-sm
                          // Pasamos item.nombre a actualizarCantidad
                          onClick={() => actualizarCantidad(item.nombre, item.cantidad + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        // Pasamos item.nombre a eliminarDelCarrito
                        onClick={() => eliminarDelCarrito(item.nombre)}
                      >
                        <i className="bi bi-trash"></i> {/* Icono opcional */} Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row mt-4 align-items-center"> {/* align-items-center */}
            <div className="col-md-6">
              <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>
            </div>
            <div className="col-md-6 text-end">
              {/* Usamos montoTotal del contexto */}
              <h4 className="mb-3">Total: ${montoTotal.toLocaleString('es-CL')}</h4>
             <Link to="/comprar" className="btn btn-success btn-lg"> 
                Proceder al Pago
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;