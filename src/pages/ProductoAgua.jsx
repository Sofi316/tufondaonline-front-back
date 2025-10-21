import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import agua from "../assets/productos/agua.jpg"
import agua2 from "../assets/productos/agua2.jpg"
import agua3 from "../assets/productos/agua3.jpg"
import agua4 from "../assets/productos/agua4.jpg"
import cocaCola from "../assets/productos/coca-cola.jpg"
import terremoto from "../assets/productos/terremoto.jpg"
import terremotoNinos from "../assets/productos/terremotoniños.jpg"



const ProductoAgua = () => {
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(`Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`);
    // Aquí puedes agregar la lógica del carrito
  };

  // Productos relacionados (solo los 3 que muestras en la imagen)
  const productosRelacionados = [
    { nombre: "Terremoto", img: terremoto, detalle: "/Terremoto" },
    { nombre: "Terremoto para Niños", img: terremotoNinos, detalle: "/TerremotoNinos" },
    { nombre: "Bebida Coca Cola", img: cocaCola, detalle: "/CocaCola" },
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
          <img src={agua} alt="Agua" />
          <div className="miniaturas">
            <img src={agua2|| agua} alt="Vista 1 de agua" />
            <img src={agua3 || agua} alt="Vista 2 de agua" />
            <img src={agua4 || agua} alt="Vista 3 de agua" />
          </div>
        </div>
        
        <div className="producto-info">
          <br />
          <br />
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

export default ProductoAgua;