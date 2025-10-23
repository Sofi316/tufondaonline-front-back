import React, { useState } from "react";
import { Link } from "react-router-dom";
import anticucho from "../assets/productos/anticucho.jpg";
import anticucho2 from "../assets/productos/anticucho2.jpg";
import anticucho3 from "../assets/productos/anticucho3.jpg";
import anticucho4 from "../assets/productos/anticucho4.jpg";
import completo from "../assets/productos/completo.jpg";
import choripan from "../assets/productos/choripan.jpg";
import pastelChoclo from "../assets/productos/pastelchoclo.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoAnticucho = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(anticucho); 
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Anticucho", 10000, anticucho);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'anticucho' : 'anticuchos'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'anticucho' : 'anticuchos'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [anticucho2, anticucho3, anticucho4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Completo Italiano", img: completo, detalle: "/completo" },
    { nombre: "Choripán", img: choripan, detalle: "/choripan" },
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
          {/* 🔹 Imagen principal (cambia según miniatura clickeada) */}
          <img src={imagenPrincipal} alt="Anticucho" />

          {/* 🔹 Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} del anticucho`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info">
          <h1>ANTICUCHO</h1>
          <p className="precio">$10.000</p>
          <p className="descripcion">
            Trozos de carne y vegetales asados a la parrilla e insertados en una
            varilla de madera.
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

export default ProductoAnticucho;