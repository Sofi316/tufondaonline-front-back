import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import choripan from "../assets/productos/choripan.jpg"
import completo from "../assets/productos/completo.jpg"
import anticucho from "../assets/productos/anticucho.jpg"
import pastelChoclo from "../assets/productos/pastelchoclo.jpg"

const ProductoChoripan = () => {
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(`Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`);
    // Aquí puedes agregar la lógica del carrito
  };

  // Productos relacionados (solo los 3 que muestras en la imagen)
  const productosRelacionados = [
    { nombre: "Completo Italiano", img: completo, detalle: "/producto/completo" },
    { nombre: "Anticucho", img: anticucho, detalle: "/producto/anticucho" },
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
          <img src={choripan} alt="Choripan" />
          <div className="miniaturas">
            <img src={choripan || choripan} alt="Vista 1 del choripan" />
            <img src={choripan || choripan} alt="Vista 2 del choripan" />
            <img src={choripan || choripan} alt="Vista 3 del choripan" />
          </div>
        </div>
        
        <div className="producto-info">
          <br />
          <br />
          <h1>CHORIPAN</h1>
          <p className="precio">$3.500</p>
          <p className="descripcion">
            Delicioso chorizo de Chillán asado a la parrilla dentro de un crujiente pan.
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
          
          <button 
            className="btn rojo" 
            onClick={() => agregarAlCarrito('Choripán', 3500)}
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </section>

      {/* Productos relacionados */}
      <section style={{ marginTop: '40px' }}>
        <h1>PRODUCTOS RELACIONADOS</h1>
        <div className="productos-relacionados" style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center',
          flexWrap: 'wrap' 
        }}>
          {productosRelacionados.map((producto, index) => (
            <div key={index} className="recuadro" style={{ 
              textAlign: 'center',
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '8px',
              maxWidth: '200px'
            }}>
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
              <h2 style={{ marginTop: '10px', fontSize: '16px' }}>
                {producto.nombre.toUpperCase()}
              </h2>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductoChoripan;