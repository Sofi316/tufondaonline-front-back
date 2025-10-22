import React, { useState } from "react";
import { Link } from "react-router-dom";
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg";
import anticuchoverdura2 from "../assets/productos/anticuchoverdura2.jpg";
import anticuchoverdura3 from "../assets/productos/anticuchoverdura3.jpg";
import anticuchoverdura4 from "../assets/productos/anticuchoverdura4.jpg";
import completoveg from "../assets/productos/completoveg.jpg";
import choripanveg from "../assets/productos/choripanveg.jpg";
import pastelchocloveg from "../assets/productos/pastelchocloveg.jpg";

const ProductoAnticuchoVeg = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(anticuchoverdura);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(
      `Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`
    );
    // Aquí puedes agregar la lógica del carrito
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [anticuchoverdura2, anticuchoverdura3, anticuchoverdura4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Completo Italiano Vegano", img: completoveg, detalle: "/CompletoVegano" },
    { nombre: "Choripán Vegano", img: choripanveg, detalle: "/ChoripanVegano" },
    { nombre: "Pastel de Choclo Vegano", img: pastelchocloveg, detalle: "/PastelChocloVegano" },
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
          <img src={imagenPrincipal} alt="Anticucho de Verduras" />

          {/* 🔹 Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} del anticucho de verduras`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info">
          <h1>ANTICUCHO DE VERDURAS</h1>
          <p className="precio">$8.000</p>
          <p className="descripcion">
            Trozos de verduras asadas a la parrilla e insertados en una varilla de madera.
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
            onClick={() => agregarAlCarrito("Anticucho de Verduras", 8000)}
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

export default ProductoAnticuchoVeg;
