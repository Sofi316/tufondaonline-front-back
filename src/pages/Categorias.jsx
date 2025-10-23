import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { productos } from "../data/productosData";
import { useCarrito } from "../components/CarritoContext";
import FiltroCategorias from "../components/Filtrado";

function Productos() {
  const { agregarAlCarrito } = useCarrito();
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos los productos');

  const productosFiltrados = categoriaFiltro === 'Todos los productos' 
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
    <div className="pagina-productos">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/">Inicio</Link>
            </div>
      <br />
      <center>
        <h1>Todos los productos</h1>
      </center>
      <br />
      
      {/* Componente de filtro */}
      <FiltroCategorias onFiltroChange={handleFiltroChange} />
      
      {/* Indicador de categoría activa */}
      <div className="categoria-activa">
        <center>
          <h3>
            {categoriaFiltro === 'Todos los productos' 
              ? 'Productos para su mesa' 
              : `Categoría: ${categoriaFiltro}`
            }
          </h3>
        </center>
      </div>

      {/* CONTENEDOR ESPECÍFICO PARA EL GRID DE PRODUCTOS */}
      <div className="contenedor-productos">
        {productosFiltrados.map((producto) => (
          <div 
            className="recuadro" 
            data-categoria={producto.categoria} 
            key={producto.nombre}
          >
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
          <center>
            <h3>No hay productos en esta categoría</h3>
          </center>
        </div>
      )}
    </div>
  );
}

export default Productos;