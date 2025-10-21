import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pastelChoclo from "../assets/productos/pastelchoclo.jpg"
import pastelChoclo2 from "../assets/productos/pastelchoclo2.jpg"
import pastelChoclo3 from "../assets/productos/pastelchoclo3.jpg"
import pastelChoclo4 from "../assets/productos/pastelchoclo4.jpg"
import anticucho from "../assets/productos/anticucho.jpg"  
import completo from "../assets/productos/completo.jpg"
import choripan from "../assets/productos/choripan.jpg"

const ProductoPastelChoclo = () => {
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
          <img src={pastelChoclo} alt="Completo" />
          <div className="miniaturas">
            <img src={pastelChoclo2 || pastelChoclo} alt="Vista 1 del pastel" />
            <img src={pastelChoclo3 || pastelChoclo} alt="Vista 2 del pastel" />
            <img src={pastelChoclo4 || pastelChoclo} alt="Vista 3 del pastel" />
          </div>
        </div>
        
        <div className="producto-info">
          <br />
          <br />
          <h1>PASTEL DE CHOCLO</h1>
          <p className="precio">$17.000</p>
          <p className="descripcion">
            Plato tradicional chileno hecho con una base de choclo molido, 
            relleno con una mezcla sabrosa de carne de res y pollo, cebolla, aceitunas, pasas y huevo duro. Cubierto con azúcar para darle un toque caramelizado al hornearse.
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

export default ProductoPastelChoclo;