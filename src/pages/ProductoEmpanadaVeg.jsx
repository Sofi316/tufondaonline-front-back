import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import empanadaveg from "../assets/productos/empanadaveg.jpg";
import empanada2 from "../assets/productos/empanada2.jpg";
import empanada3 from "../assets/productos/empanada3.jpg";
import empanada4 from "../assets/productos/empanada4.jpg";
import choripanveg from "../assets/productos/choripanveg.jpg";
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg";
import pastelchocloveg from "../assets/productos/pastelchocloveg.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoEmpanadaVeg = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(empanadaveg);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Empanada Vegana", 5000, empanadaveg);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'empanada vegana' : 'empanadas veganas'} agregada${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'empanada vegana' : 'empanadas veganas'} agregada${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [empanada2, empanada3, empanada4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Anticucho de Verduras", img: anticuchoverdura, detalle: "/anticuchoverdura" },
    { nombre: "Choripan Vegano", img: choripanveg, detalle: "/choripanvegano" },
    { nombre: "Pastel de Choclo Vegano", img: pastelchocloveg, detalle: "/pastelchoclovegano" },
  ];

  return (
    <main>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> /<Link to="/categorias">Categorias</Link> /
      </div>

      {/* Producto principal */}
      <section className="producto">
        <div className="producto-imagen">
          {/* Imagen principal */}
          <img src={imagenPrincipal} alt="Empanada Vegana" />

          {/* Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} de la Empanada Vegana`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
        
        <div className="producto-info">
          <h1>EMPANADA VEGANA</h1>
          <p className="precio">$5.000</p>
          <p className="descripcion">
            Deliciosa empanada vegana rellena con una mezcla sabrosa de vegetales y especias, perfecta para quienes buscan opciones sin carne.
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

export default ProductoEmpanadaVeg;