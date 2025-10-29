import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { productos } from "../data/productosData";
import { useCarrito } from "../components/CarritoContext";
import FiltroCategorias from "../components/Filtrado";

function Categorias() {
  const { agregarAlCarrito } = useCarrito();
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos los productos');

  const productosFiltrados = categoriaFiltro === 'Todos los productos'
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaFiltro); 

  const handleAgregarAlCarrito = (producto) => {
    const precioAAgregar = producto.enOferta ? producto.precioOferta : producto.precio;
    const esOferta = producto.enOferta; 

    agregarAlCarrito(producto.id, producto.nombre, precioAAgregar, producto.img);

    alert(`✅ ${producto.nombre} ${esOferta ? '(Oferta)' : ''} agregado al carrito`);
  };

  const handleFiltroChange = (categoriaSeleccionada) => {
    setCategoriaFiltro(categoriaSeleccionada);
  };

  return (
    <div className="container my-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Categorías</li>
        </ol>
      </nav>
      <div className="text-center mb-4">
        <h1>Explora por Categoría</h1>
      </div>
      <FiltroCategorias onFiltroChange={handleFiltroChange} />
      <div className="text-center my-4 ">
          <h2 className="texto-azul">
            {categoriaFiltro === 'Todos los productos'
              ? 'Todos los productos'
              : `${categoriaFiltro}`
            }
          </h2>
      </div>
      <div className="contenedor-productos">
        {productosFiltrados.map((producto) => (
          <div
            className="recuadro"
            key={producto.id}
          >
            <Link to={producto.detalle}>
              <img src={producto.img} alt={producto.nombre} />
            </Link>
            <h2>
              <Link to={producto.detalle} className="link-detalle">{producto.nombre}</Link>
            </h2>
            {producto.enOferta ? (
                <p>
                  <span className="text-danger fw-bold me-2">
                    ${producto.precioOferta.toLocaleString("es-CL")}
                  </span>
                  <del className="text-muted small">
                    ${producto.precio.toLocaleString("es-CL")}
                  </del>
                </p>
              ) : (
                <p>${producto.precio.toLocaleString("es-CL")}</p>
              )}
            <button
              className="btn btn-danger"
              onClick={() => handleAgregarAlCarrito(producto)}
            >
              <i className="bi bi-cart-plus me-1"></i>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
      {productosFiltrados.length === 0 && (
        <div className="alert alert-warning text-center mt-4" role="alert">
            Ups... No hay productos disponibles en la categoría "{categoriaFiltro}".
        </div>
      )}
    </div>
  );
}

export default Categorias;