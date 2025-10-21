import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import terremoto from "../assets/productos/terremoto.jpg"
import terremoto2 from "../assets/productos/terremoto2.jpg"
import terremoto3 from "../assets/productos/terremoto3.jpg"
import terremoto4 from "../assets/productos/terremoto4.jpg"
import terremotoNinos from "../assets/productos/terremotoniños.jpg"
import cocaCola from "../assets/productos/coca-cola.jpg"
import agua from "../assets/productos/agua.jpg"


const ProductoTerremotoNinos = () => {
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(`Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`);
    // Aquí puedes agregar la lógica del carrito
  };

  // Productos relacionados (solo los 3 que muestras en la imagen)
  const productosRelacionados = [
    { nombre: "Terremoto", img: terremoto, detalle: "/Terremoto" },
    { nombre: "Bebida Coca Cola", img: cocaCola, detalle: "/CocaCola" },
    { nombre: "Agua", img: agua, detalle: "/Agua" },
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
          <img src={terremotoNinos} alt="Terremoto" />
          <div className="miniaturas">
            <img src={terremoto2|| terremotoNinos} alt="Vista 1 de terremoto ninos" />
            <img src={terremoto3 || terremotoNinos} alt="Vista 2 de terremoto ninos" />
            <img src={terremoto4 || terremotoNinos} alt="Vista 3 de terremoto ninos" />
          </div>
        </div>
        
        <div className="producto-info">
          <br />
          <br />
          <h1>TERREMOTO PARA NIÑOS</h1>
          <p className="precio">$3.000</p>
          <p className="descripcion">
            Delicioso bebida Ginger Ale con un maravilloso helado de piña y un toque de granadina.
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

export default ProductoTerremotoNinos;