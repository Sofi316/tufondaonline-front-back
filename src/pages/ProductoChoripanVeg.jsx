import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import choripanveg from "../assets/productos/choripanveg.jpg"
import choripanveg2 from "../assets/productos/choripanveg2.jpg"
import choripanveg3 from "../assets/productos/choripanveg3.jpg"
import choripanveg4 from "../assets/productos/choripanveg4.jpg"
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg"
import completoveg from "../assets/productos/completoveg.jpg"
import pastelchocloveg from "../assets/productos/pastelchocloveg.jpg"

const ProductoChoripanVeg = () => {
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = (nombre, precio) => {
    console.log(`Agregado al carrito: ${nombre} - Cantidad: ${cantidad} - Total: $${precio * cantidad}`);
    // Aquí puedes agregar la lógica del carrito
  };

  // Productos relacionados (solo los 3 que muestras en la imagen)
  const productosRelacionados = [
    { nombre: "Anticucho de Verduras", img: anticuchoverdura, detalle: "/AnticuchoVerdura" },
    { nombre: "Completo Italiano Vegano", img: completoveg, detalle: "/CompletoVegano" },
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
          <img src={choripanveg} alt="Choripan Vegano" />
          <div className="miniaturas">
            <img src={choripanveg2 || choripanveg} alt="Vista 1 del choripan vegano" />
            <img src={choripanveg3 || choripanveg} alt="Vista 2 del choripan vegano" />
            <img src={choripanveg4 || choripanveg} alt="Vista 3 del choripan vegano" />
          </div>
        </div>
        
        <div className="producto-info">
          <br />
          <br />
          <h1>CHORIPÁN VEGANO</h1>
          <p className="precio">$3.000</p>
          <p className="descripcion">
            El tradicional choripán chileno, ahora en su versión vegana. Disfruta de un delicioso chorizo vegetal libre de carne.
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

export default ProductoChoripanVeg;