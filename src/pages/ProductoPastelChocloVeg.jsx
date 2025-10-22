import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pastelchocloveg from "../assets/productos/pastelchocloveg.jpg";
import pastelchoclo2 from "../assets/productos/pastelchoclo2.jpg";
import pastelchoclo3 from "../assets/productos/pastelchoclo3.jpg";
import pastelchoclo4 from "../assets/productos/pastelchoclo4.jpg";
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg";
import completoveg from "../assets/productos/completoveg.jpg"; 
import choripanveg from "../assets/productos/choripanveg.jpg";

const ProductoPastelChocloVeg = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(pastelchocloveg);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(`Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`);
    // Aquí puedes agregar la lógica del carrito
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [pastelchoclo2, pastelchoclo3, pastelchoclo4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Anticucho de Verduras", img: anticuchoverdura, detalle: "/AnticuchoVerdura" },
    { nombre: "Choripan Vegano", img: choripanveg, detalle: "/ChoripanVegano" },
    { nombre: "Completo Italiano Vegano", img: completoveg, detalle: "/CompletoVegano" },
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
          {/* Imagen principal */}
          <img src={imagenPrincipal} alt="Pastel de Choclo Vegano" />

          {/* Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} del Pastel de Choclo Vegano`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
        
        <div className="producto-info">
          <h1>PASTEL DE CHOCLO VEGANO</h1>
          <p className="precio">$17.000</p>
          <p className="descripcion">
            Plato tradicional chileno hecho con una base de choclo molido y relleno con una 
            mezcla de verduras sazonadas y proteínas vegetales.   
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
            onClick={() => agregarAlCarrito('Pastel de Choclo Vegano', 17000)}
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </section>

      {/* Productos relacionados */}
      <section style={{ marginTop: '40px' }}>
        <center>
          <h1>PRODUCTOS RELACIONADOS</h1>
        </center>
        <div className="productos-relacionados" style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center',
          flexWrap: 'wrap' 
        }}>
          {productosRelacionados.map((producto, index) => (
            <div key={index} className="recuadro" data-categoria={producto.categoria}>
              <a href={producto.detalle}>
                <img 
                  src={producto.img} 
                  alt={producto.nombre} 
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }} 
                />
              </a>
              <a href={producto.detalle}>
                <h2 style={{ marginTop: '10px', fontSize: '16px' }}>
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

export default ProductoPastelChocloVeg;