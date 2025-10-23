import React, { useState } from "react";
import { Link } from "react-router-dom";
import choripan from "../assets/productos/choripan.jpg";
import choripan2 from "../assets/productos/choripan2.jpg";
import choripan3 from "../assets/productos/choripan3.jpg";
import choripan4 from "../assets/productos/choripan4.jpg";
import completo from "../assets/productos/completo.jpg";
import anticucho from "../assets/productos/anticucho.jpg";
import pastelChoclo from "../assets/productos/pastelchoclo.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoChoripan = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(choripan);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Choripán", 3000, choripan);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'choripán' : 'choripanes'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'choripán' : 'choripanes'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  const miniaturas = [choripan2, choripan3, choripan4];

  const productosRelacionados = [
    { nombre: "Completo Italiano", img: completo, detalle: "/completo" },
    { nombre: "Anticucho", img: anticucho, detalle: "/anticucho" },
    { nombre: "Pastel de Choclo", img: pastelChoclo, detalle: "/pastelchoclo" },
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
            onClick={handleAgregarAlCarrito}
          >
            AGREGAR {cantidad > 1 ? `${cantidad} AL ` : ''}CARRITO
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
              <Link to={producto.detalle}>
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
              </Link>
              <Link to={producto.detalle}>
                <h2 style={{ marginTop: "10px", fontSize: "16px" }}>
                  {producto.nombre.toUpperCase()}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductoChoripan;