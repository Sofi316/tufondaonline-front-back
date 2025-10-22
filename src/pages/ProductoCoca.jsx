import React, { useState } from "react";
import { Link } from "react-router-dom";
import cocaCola from "../assets/productos/coca-cola.jpg";
import cocaCola2 from "../assets/productos/coca-cola.2.jpg";
import cocaCola3 from "../assets/productos/coca-cola.3.jpg";
import cocaCola4 from "../assets/productos/coca-cola.4.jpg";
import terremoto from "../assets/productos/terremoto.jpg";
import terremotoNinos from "../assets/productos/terremotoniños.jpg";
import agua from "../assets/productos/agua.jpg";

const ProductoCocaCola = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(cocaCola);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(
      `Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`
    );
    // Aquí puedes agregar la lógica del carrito
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [cocaCola2, cocaCola3, cocaCola4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Terremoto", img: terremoto, detalle: "/Terremoto" },
    { nombre: "Terremoto para Niños", img: terremotoNinos, detalle: "/TerremotoNinos" },
    { nombre: "Agua", img: agua, detalle: "/Agua" },
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
          {/* 🔹 Imagen principal que cambia al hacer clic en miniaturas */}
          <img src={imagenPrincipal} alt="Coca Cola" />

          {/* 🔹 Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} de Coca Cola`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info">
          <h1>BEBIDA COCA COLA</h1>
          <p className="precio">$2.500</p>
          <p className="descripcion">
            Deliciosa y refrescante bebida Coca Cola bien fría.
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
            onClick={() => agregarAlCarrito("Bebida Coca Cola", 2500)}
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

export default ProductoCocaCola;
