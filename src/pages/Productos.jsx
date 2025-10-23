
import React from "react";
import { Link } from 'react-router-dom';
import { productos } from "../data/productosData"; // Asegúrate que la ruta sea correcta
import { useCarrito } from "../components/CarritoContext"; // Asegúrate que la ruta sea correcta

function Productos() {
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = (producto) => {
    // --- LÓGICA CORREGIDA ---
    // 1. Determina qué precio usar
    const precioAAgregar = producto.enOferta ? producto.precioOferta : producto.precio;
    const esOferta = producto.enOferta; // Para el mensaje

    // 2. Llama a agregarAlCarrito con el precio correcto
    agregarAlCarrito(producto.id, producto.nombre, precioAAgregar, producto.img);

    // 3. Muestra un mensaje adecuado
    alert(`✅ ${producto.nombre} ${esOferta ? '(Oferta)' : ''} agregado al carrito`);
    // -------------------------
  };

  return (
    <div className="contenedor-productos">
      <br />
      <center>
        <h1>Productos para su mesa</h1>
      </center>
      <br />
      {productos.map((producto) => (
        <div className="recuadro" data-categoria={producto.categoria} key={producto.id}>
          <Link to={producto.detalle}>
            <img src={producto.img} alt={producto.nombre} />
          </Link>
          <h2>
            <Link to={producto.detalle}>{producto.nombre}</Link>
          </h2>
          {/* Muestra el precio (normal u oferta con tachado) */}
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
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Productos;