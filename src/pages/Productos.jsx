import React from "react";
import { Link } from 'react-router-dom';
import { productos } from "../data/productosData";

function Productos({ agregarAlCarrito }) {
  return (
    <div className="contenedor-productos">
      <br />
      <center>
        <h1>Productos para su mesa</h1>
      </center>
      <br />
      {productos.map((producto) => (
        <div className="recuadro" data-categoria={producto.categoria} key={producto.nombre}>
          <a href={producto.detalle}>
            <img src={producto.img} alt={producto.nombre} />
          </a>
          <h2>
            <a href={producto.detalle}>{producto.nombre}</a>
          </h2>
          <p>${producto.precio.toLocaleString("es-CL")}</p>
          <button className="btn btn-danger" onClick={() => agregarAlCarrito(producto.nombre, producto.precio)}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Productos;