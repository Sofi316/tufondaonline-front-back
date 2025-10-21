import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import empanadaqueso from "../assets/productos/empanadaqueso.jpg"
import empanadaqueso2 from "../assets/productos/empanadaqueso2.jpg"
import empanadaqueso3 from "../assets/productos/empanadaqueso3.jpg"
import empanadaqueso4 from "../assets/productos/empanadaqueso4.jpg"
import choripanveg from "../assets/productos/choripanveg.jpg"
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg"
import pastelchocloveg from "../assets/productos/pastelchocloveg.jpg"

const ProductoEmpanadaQueso = () => {
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(`Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`);
    // Aquí puedes agregar la lógica del carrito
  };

  // Productos relacionados (solo los 3 que muestras en la imagen)
  const productosRelacionados = [
    { nombre: "Anticucho de Verduras", img: anticuchoverdura, detalle: "/AnticuchoVerdura" },
    { nombre: "Choripan Vegano", img: choripanveg, detalle: "/ChoripanVegano" },
    { nombre: "Pastel de Choclo Vegano", img: pastelchocloveg, detalle: "/PastelChocloVegano" },
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
          <img src={empanadaqueso} alt="Empanada Queso" />
          <div className="miniaturas">
            <img src={empanadaqueso2 || empanadaqueso} alt="Vista 1 de la empanada queso" />
            <img src={empanadaqueso3 || empanadaqueso} alt="Vista 2 de la empanada queso" />
            <img src={empanadaqueso4 || empanadaqueso} alt="Vista 3 de la empanada queso" />
          </div>
        </div>
        
        <div className="producto-info">
          <br />
          <br />
          <h1>EMPANADA DE QUESO</h1>
          <p className="precio">$5.000</p>
          <p className="descripcion">
            Deliciosa empanada rellena con queso fundido, ideal para los amantes de los sabores clásicos y reconfortantes.
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

export default ProductoEmpanadaQueso;