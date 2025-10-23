import React, { useState } from "react";
import { Link } from "react-router-dom";
import agua from "../assets/productos/agua.jpg";
import agua2 from "../assets/productos/agua2.jpg";
import agua3 from "../assets/productos/agua3.jpg";
import agua4 from "../assets/productos/agua4.jpg";
import cocaCola from "../assets/productos/coca-cola.jpg";
import terremoto from "../assets/productos/terremoto.jpg";
import terremotoNinos from "../assets/productos/terremotoniños.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoAgua = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(agua);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Agua", 1800, agua);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'botella' : 'botellas'} de agua agregada${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'botella' : 'botellas'} de agua agregada${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [agua2, agua3, agua4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Terremoto", img: terremoto, detalle: "/terremoto" },
    { nombre: "Terremoto para Niños", img: terremotoNinos, detalle: "/terremotoninos" },
    { nombre: "Bebida Coca Cola", img: cocaCola, detalle: "/cocacola" },
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
          <img src={imagenPrincipal} alt="Agua" />
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

export default ProductoAgua;