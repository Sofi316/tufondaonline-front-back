import React, { useState } from "react";
import { Link } from "react-router-dom";
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg";
import anticuchoverdura2 from "../assets/productos/anticuchoverdura2.jpg";
import anticuchoverdura3 from "../assets/productos/anticuchoverdura3.jpg";
import anticuchoverdura4 from "../assets/productos/anticuchoverdura4.jpg";
import completoveg from "../assets/productos/completoveg.jpg";
import choripanveg from "../assets/productos/choripanveg.jpg";
import pastelchocloveg from "../assets/productos/pastelchocloveg.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoAnticuchoVeg = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(anticuchoverdura);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Anticucho de Verduras", 8000, anticuchoverdura);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'anticucho de verduras' : 'anticuchos de verduras'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'anticucho de verduras' : 'anticuchos de verduras'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [anticuchoverdura2, anticuchoverdura3, anticuchoverdura4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Completo Italiano Vegano", img: completoveg, detalle: "/completovegano" },
    { nombre: "Choripán Vegano", img: choripanveg, detalle: "/choripanvegano" },
    { nombre: "Pastel de Choclo Vegano", img: pastelchocloveg, detalle: "/pastelchoclovegano" },
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

export default ProductoAnticuchoVeg;