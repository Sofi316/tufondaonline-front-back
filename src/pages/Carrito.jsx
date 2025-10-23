import React from "react";
import { useCarrito } from "../components/CarritoContext";
import { Link } from 'react-router-dom';

function Carrito() {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, totalProductos } = useCarrito();

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  return (
    <div className="container mt-4">
        {/* Breadcrumb */}
        <div className="breadcrumb">
        <Link to="/">Inicio</Link> /<Link to="/categorias">Categorias</Link> /
        </div>
      <h2>Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <p>Tu carrito está vacío</p>
          <Link to="/productos" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table">
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
                {carrito.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.img} 
                          alt={item.nombre} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="me-3"
                        />
                        {item.nombre}
                      </div>
                    </td>
                    <td>${item.precio.toLocaleString('es-CL')}</td>
                    <td>
                      <div className="input-group" style={{ width: '120px' }}>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => actualizarCantidad(item.nombre, item.cantidad - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.cantidad}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
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
                        onClick={() => eliminarDelCarrito(item.nombre)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>
            </div>
            <div className="col-md-6 text-end">
              <h4>Total: ${calcularTotal().toLocaleString('es-CL')}</h4>
              <button className="btn btn-success mt-2">
                Proceder al Pago
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;