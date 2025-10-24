import React, { useState } from "react";
import { useCarrito } from "../components/CarritoContext";
import { Link, useNavigate } from 'react-router-dom';
import { regionesYComunas } from '../data/datos';

function Checkout() {
  const { carrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
    indicaciones: ''
  });

  // Actualizar comunas cuando cambia la región
  const handleRegionChange = (e) => {
    const nuevaRegion = e.target.value;
    const comunasDeRegion = regionesYComunas[nuevaRegion] || [];
    
    setFormData(prevState => ({
      ...prevState,
      region: nuevaRegion,
      comuna: comunasDeRegion[0] || '' // Seleccionar la primera comuna por defecto
    }));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar solo los campos requeridos
    if (!formData.nombre || !formData.apellido || !formData.correo || !formData.calle || !formData.region || !formData.comuna) {
      alert('Por favor completa todos los campos requeridos (*)');
      return;
    }

    // Datos de la compra para pasar a la página de éxito
    const compraData = {
      numeroOrden: `#${Math.floor(10000000 + Math.random() * 90000000)}`,
      cliente: {
        ...formData,
        // Asegurar que los campos opcionales tengan valores por defecto si están vacíos
        departamento: formData.departamento || 'No especificado',
        indicaciones: formData.indicaciones || ''
      },
      productos: carrito,
      total: calcularTotal()
    };

    // Simular procesamiento de pago (50% de probabilidad de éxito o fallo)
    const pagoExitoso = Math.random() > 0.5; // 50% de probabilidad

    if (pagoExitoso) {
      navigate('/compraexitosa', { state: compraData });
      vaciarCarrito();
    } else {
      navigate('/pagofallido', { state: compraData }); // Pasa los datos también al pago fallido
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <h2>No hay productos en el carrito</h2>
          <p>Agrega productos al carrito antes de proceder al pago</p>
          <Link to="/categorias" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-4">
        <Link to="/">Inicio</Link> / <Link to="/carrito">Carrito</Link> / Checkout
      </div>

      <h2>Carrito de compra</h2>
      <p className="text-muted">Completa la siguiente información</p>

      <div className="row">
        {/* Resumen del Carrito */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Productos en el carrito</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img 
                            src={item.img} 
                            alt={item.nombre}
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>{item.nombre}</td>
                        <td>${item.precio.toLocaleString('es-CL')}</td>
                        <td>{item.cantidad}</td>
                        <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Checkout */}
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            {/* Información del Cliente */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Información del cliente</h5>
                <p className="text-muted">Completa la siguiente información</p>
                
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo*</label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dirección de Entrega */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Dirección de entrega de los productos</h5>
                <p className="text-muted">Ingrese dirección de forma detallada</p>
                
                <div className="row mb-3">
                  <div className="col-8">
                    <label htmlFor="calle" className="form-label">Calle*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="calle"
                      name="calle"
                      value={formData.calle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="departamento" className="form-label">Departamento (opcional)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="departamento"
                      name="departamento"
                      placeholder="Ej: 603"
                      value={formData.departamento}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="region" className="form-label">Región*</label>
                    <select
                      className="form-select"
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleRegionChange}
                      required
                    >
                      {Object.keys(regionesYComunas).map(region => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="comuna" className="form-label">Comuna*</label>
                    <select
                      className="form-select"
                      id="comuna"
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleInputChange}
                      required
                    >
                      {regionesYComunas[formData.region]?.map(comuna => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="indicaciones" className="form-label">Indicaciones para la entrega (opcional)</label>
                  <textarea
                    className="form-control"
                    id="indicaciones"
                    name="indicaciones"
                    rows="3"
                    placeholder="Ej: Entre calles, color del edificio, no tiene timbre."
                    value={formData.indicaciones}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Total y Botón de Pago */}
            <div className="card">
              <div className="card-body">
                <h4 className="text-center mb-4">Total a pagar: ${calcularTotal().toLocaleString('es-CL')}</h4>
                <button type="submit" className="btn btn-success w-100 btn-lg">
                  Pagar ahora ${calcularTotal().toLocaleString('es-CL')}
                </button>
                <div className="text-center mt-2">
                  <small className="text-muted">
                    Nota: Para testing, hay 50% de probabilidad de pago exitoso o fallido
                  </small>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;