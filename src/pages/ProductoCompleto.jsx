import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import choripan from "../assets/productos/choripan.jpg"
import completo from "../assets/productos/completo.jpg"
import completo2 from "../assets/productos/completo2.jpg"
import completo3 from "../assets/productos/completo3.jpg"
import completo4 from "../assets/productos/completo4.jpg"
import anticucho from "../assets/productos/anticucho.jpg"
import pastelChoclo from "../assets/productos/pastelchoclo.jpg"

const ProductoCompleto = () => {
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(`Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`);
    // Aquí puedes agregar la lógica del carrito
  };

  // Productos relacionados (solo los 3 que muestras en la imagen)
  const productosRelacionados = [
    { nombre: "Anticucho", img: anticucho, detalle: "/producto/anticucho" },
    { nombre: "Choripan", img: choripan, detalle: "/Choripan" },
    { nombre: "Pastel de Choclo", img: pastelChoclo, detalle: "/producto/pastel-choclo" }
  ];

  return (
    <main>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> /
        <Link to="/productos">Productos</Link> /
      </div>

      {/* Producto principal */}
      <section className="producto">
        <div className="producto-imagen">
          <img src={completo} alt="Completo" />
          <div className="miniaturas">
            <img src={completo2 || choripan} alt="Vista 1 del choripan" />
            <img src={completo3 || choripan} alt="Vista 2 del choripan" />
            <img src={completo4 || choripan} alt="Vista 3 del choripan" />
          </div>
        </div>
        
        <div className="producto-info">
          <br />
          <br />
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
            onClick={() => agregarAlCarrito('Choripán', 3500)}
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

export default ProductoCompleto;