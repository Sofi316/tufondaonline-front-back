import React from "react";
import { Link } from 'react-router-dom';
import { productos } from "../data/productosData";
import { useCarrito } from "../components/CarritoContext";

function Productos() {
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto.nombre, producto.precio, producto.img);
    alert(`✅ ${producto.nombre} agregado al carrito`);
  };
  return (
    <div className="contenedor-productos">
      <br />
      <center>
        <h1>Productos para su mesa</h1>
      </center>
      <br />
      {productos.map((producto) => (
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
  );
}

export default Productos;