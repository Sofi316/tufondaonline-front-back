import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import empanada from "../assets/productos/empanada.jpg"
import empanada2 from "../assets/productos/empanada2.jpg"
import empanada3 from "../assets/productos/empanada3.jpg"
import empanada4 from "../assets/productos/empanada4.jpg"
import anticucho from "../assets/productos/anticucho.jpg"  
import completo from "../assets/productos/completo.jpg"
import choripan from "../assets/productos/choripan.jpg"

const ProductoEmpanada = () => {
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(`Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`);
    // Aquí puedes agregar la lógica del carrito
  };

  // Productos relacionados (solo los 3 que muestras en la imagen)
  const productosRelacionados = [
    { nombre: "Anticucho", img: anticucho, detalle: "/Anticucho" },
    { nombre: "Choripan", img: choripan, detalle: "/Choripan" },
    { nombre: "Completo Italiano", img: completo, detalle: "/Completo" },
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
          <img src={empanada} alt="Completo" />
          <div className="miniaturas">
            <img src={empanada2 || empanada} alt="Vista 1 del pastel" />
            <img src={empanada3 || empanada} alt="Vista 2 del pastel" />
            <img src={empanada4 || empanada} alt="Vista 3 del pastel" />
          </div>
        </div>
        
        <div className="producto-info">
          <br />
          <br />
          <h1>EMPANADA DE PINO</h1>
          <p className="precio">$5.000</p>
          <p className="descripcion">
            Masa rellena de una mezcla de carne de res picada, cebolla, aceitunas, pasas y huevo duro, 
            sazonada con especias tradicionales. Horneada hasta obtener una corteza dorada y crujiente.
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

export default ProductoEmpanada;