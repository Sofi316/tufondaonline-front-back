import React, { useState } from "react";
import { Link } from "react-router-dom";
import choripanveg from "../assets/productos/choripanveg.jpg";
import choripanveg2 from "../assets/productos/choripanveg2.jpg";
import choripanveg3 from "../assets/productos/choripanveg3.jpg";
import choripanveg4 from "../assets/productos/choripanveg4.jpg";
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg";
import completoveg from "../assets/productos/completoveg.jpg";
import pastelchocloveg from "../assets/productos/pastelchocloveg.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoChoripanVeg = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(choripanveg);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Choripán Vegano", 3000, choripanveg);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'choripán vegano' : 'choripanes veganos'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'choripán vegano' : 'choripanes veganos'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [choripanveg2, choripanveg3, choripanveg4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Anticucho de Verduras", img: anticuchoverdura, detalle: "/anticuchoverdura" },
    { nombre: "Completo Italiano Vegano", img: completoveg, detalle: "/completovegano" },
    { nombre: "Pastel de Choclo Vegano", img: pastelchocloveg, detalle: "/pastelchoclovegano" },
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
          {/* 🔹 Imagen principal (cambia al hacer clic en una miniatura) */}
          <img src={imagenPrincipal} alt="Choripán Vegano" />

          {/* 🔹 Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} del Choripán Vegano`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info">
          <h1>CHORIPÁN VEGANO</h1>
          <p className="precio">$3.000</p>
          <p className="descripcion">
            El tradicional choripán chileno, ahora en su versión vegana. Disfruta de un delicioso chorizo vegetal libre de carne.
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

export default ProductoChoripanVeg;