import React, { useState } from "react";
import { Link } from "react-router-dom";
import choripan from "../assets/productos/choripan.jpg";
import choripan2 from "../assets/productos/choripan2.jpg";
import choripan3 from "../assets/productos/choripan3.jpg";
import choripan4 from "../assets/productos/choripan4.jpg";
import completo from "../assets/productos/completo.jpg";
import anticucho from "../assets/productos/anticucho.jpg";
import pastelChoclo from "../assets/productos/pastelchoclo.jpg";

const ProductoChoripan = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(choripan);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(
      `Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`
    );
    // Aquí puedes agregar la lógica del carrito
  };

  const miniaturas = [choripan2, choripan3, choripan4];

  const productosRelacionados = [
    { nombre: "Completo Italiano", img: completo, detalle: "/Completo" },
    { nombre: "Anticucho", img: anticucho, detalle: "/Anticucho" },
    { nombre: "Pastel de Choclo", img: pastelChoclo, detalle: "/PastelChoclo" },
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
          <img src={imagenPrincipal} alt="Choripán" />

          {/* 🔹 Miniaturas que al hacer clic cambian la principal */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} del choripán`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info">
          <h1>CHORIPÁN</h1>
          <p className="precio">$3.000</p>
          <p className="descripcion">
            Delicioso chorizo de Chillán asado a la parrilla dentro de un
            crujiente pan.
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
            onClick={() => agregarAlCarrito("Choripán", 3500)}
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
            <div key={index} className="recuadro">
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

export default ProductoChoripan;
