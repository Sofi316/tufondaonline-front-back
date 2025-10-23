import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { productos } from "../data/productosData";
import { useCarrito } from "../components/CarritoContext";
import FiltroCategorias from "../components/Filtrado";

function Productos() {
  const { agregarAlCarrito } = useCarrito();
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados = categoriaFiltro === 'Todas' 
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaFiltro);

  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto.nombre, producto.precio, producto.img);
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  const handleFiltroChange = (categoria) => {
    setCategoriaFiltro(categoria);
  };

  return (
    <div className="contenedor-productos">
      <br />
      
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / <Link to="/productos">Productos</Link> /
      </div>
      
      <center>
        <h1>Productos para su mesa</h1>
      </center>
      <br />

      {/* Componente de filtro */}
      <FiltroCategorias onFiltroChange={handleFiltroChange} />

      {/* Grid de productos */}
      <div className="grid-productos">
        {productosFiltrados.map((producto) => (
          <div className="recuadro" data-categoria={producto.categoria} key={producto.nombre}>
            <Link to={producto.detalle}>
              <img src={producto.img} alt={producto.nombre} />
            </Link>
            <h2>
              <Link to={producto.detalle}>{producto.nombre}</Link>
            </h2>
            <p>${producto.precio.toLocaleString("es-CL")}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleAgregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay productos */}
      {productosFiltrados.length === 0 && (
        <div className="no-productos">
          <h3>No hay productos en esta categoría</h3>
        </div>
      )}
    </div>
  );
}

export default Productos;