import React, { useState } from "react";
import { Link } from "react-router-dom";
import choripan from "../assets/productos/choripan.jpg";
import completo from "../assets/productos/completo.jpg";
import completo2 from "../assets/productos/completo2.jpg";
import completo3 from "../assets/productos/completo3.jpg";
import completo4 from "../assets/productos/completo4.jpg";
import anticucho from "../assets/productos/anticucho.jpg";
import pastelChoclo from "../assets/productos/pastelchoclo.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoCompleto = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(completo);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Completo Italiano", 3500, completo);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'completo italiano' : 'completos italianos'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'completo italiano' : 'completos italianos'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [completo2, completo3, completo4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Anticucho", img: anticucho, detalle: "/anticucho" },
    { nombre: "Choripán", img: choripan, detalle: "/choripan" },
    { nombre: "Pastel de Choclo", img: pastelChoclo, detalle: "/pastelchoclo" },
  ];

  return (
    <main>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> /<Link to="/categorias">Categorias</Link> /
      </div>

      {/* Producto principal */}
      <section className="producto">
        <div className="producto-imagen">
          {/* Imagen principal */}
          <img src={imagenPrincipal} alt="Completo Italiano" />

          {/* Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} del Completo Italiano`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info">
          <h1>COMPLETO ITALIANO</h1>
          <p className="precio">$3.500</p>
          <p className="descripcion">
            Tradicional completo chileno con palta, tomate y mayonesa.
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
            <div key={index} className="recuadro" data-categoria={producto.categoria}>
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

export default ProductoCompleto;