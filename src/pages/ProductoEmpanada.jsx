import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import empanada from "../assets/productos/empanada.jpg";
import empanada2 from "../assets/productos/empanada2.jpg";
import empanada3 from "../assets/productos/empanada3.jpg";
import empanada4 from "../assets/productos/empanada4.jpg";
import anticucho from "../assets/productos/anticucho.jpg";  
import completo from "../assets/productos/completo.jpg";
import choripan from "../assets/productos/choripan.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoEmpanada = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(empanada);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Empanada de Pino", 5000, empanada);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'empanada de pino' : 'empanadas de pino'} agregada${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'empanada de pino' : 'empanadas de pino'} agregada${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [empanada2, empanada3, empanada4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Anticucho", img: anticucho, detalle: "/Anticucho" },
    { nombre: "Choripan", img: choripan, detalle: "/Choripan" },
    { nombre: "Completo Italiano", img: completo, detalle: "/Completo" },
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
          <img src={imagenPrincipal} alt="Empanada de Pino" />

          {/* Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} de la Empanada de Pino`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
        
        <div className="producto-info">
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
            onClick={handleAgregarAlCarrito}
          >
            AGREGAR {cantidad > 1 ? `${cantidad} AL ` : ''}CARRITO
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
              <Link to={producto.detalle}>
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
              </Link>
              <Link to={producto.detalle}>
                <h2 style={{ marginTop: '10px', fontSize: '16px' }}>
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

export default ProductoEmpanada;