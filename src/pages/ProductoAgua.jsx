import React, { useState } from "react";
import { Link } from "react-router-dom";
import agua from "../assets/productos/agua.jpg";
import agua2 from "../assets/productos/agua2.jpg";
import agua3 from "../assets/productos/agua3.jpg";
import agua4 from "../assets/productos/agua4.jpg";
import cocaCola from "../assets/productos/coca-cola.jpg";
import terremoto from "../assets/productos/terremoto.jpg";
import terremotoNinos from "../assets/productos/terremotoniños.jpg";

const ProductoAgua = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(agua);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(
      `Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`
    );
    // Aquí puedes agregar la lógica del carrito
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [agua2, agua3, agua4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Terremoto", img: terremoto, detalle: "/Terremoto" },
    { nombre: "Terremoto para Niños", img: terremotoNinos, detalle: "/TerremotoNinos" },
    { nombre: "Bebida Coca Cola", img: cocaCola, detalle: "/CocaCola" },
  ];

  return (
    <main>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> /<Link to="/productos">Productos</Link> /
      </div>

      {/* Producto principal */}
      <section className="producto">
        <div className="producto-imagen">
          {/* 🔹 Imagen principal que cambia */}
          <img src={imagenPrincipal} alt="Agua" />

          {/* 🔹 Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} del agua`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info">
          <h1>AGUA</h1>
          <p className="precio">$1.800</p>
          <p className="descripcion">
            Elegante y pura agua mineral sin gas, ideal para acompañar cualquier comida.
          </p>

          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            min="1"
            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
          />
          <br />
          <br />
          <button
            className="btn btn-danger"
            onClick={() => agregarAlCarrito("Agua", 1800)}
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </section>

      {/* Productos relacionados */}
      <section style={{ marginTop: "40px" }}>
        <center>
          <h1>PRODUCTOS RELACIONADOS</h1>
        </center>
        <div
          className="productos-relacionados"
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {productosRelacionados.map((producto, index) => (
            <div key={index} className="recuadro" data-categoria={producto.categoria}>
              <a href={producto.detalle}>
                <img
                  src={producto.img}
                  alt={producto.nombre}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </a>
              <a href={producto.detalle}>
                <h2 style={{ marginTop: "10px", fontSize: "16px" }}>
                  {producto.nombre.toUpperCase()}
                </h2>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductoAgua;
