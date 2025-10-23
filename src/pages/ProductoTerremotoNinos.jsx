import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import terremoto from "../assets/productos/terremoto.jpg";
import terremoto2 from "../assets/productos/terremoto2.jpg";
import terremoto3 from "../assets/productos/terremoto3.jpg";
import terremoto4 from "../assets/productos/terremoto4.jpg";
import terremotoNinos from "../assets/productos/terremotoniños.jpg";
import cocaCola from "../assets/productos/coca-cola.jpg";
import agua from "../assets/productos/agua.jpg";
import { useCarrito } from "../components/CarritoContext";

const ProductoTerremotoNinos = () => {
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(terremotoNinos);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = () => {
    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito("Terremoto para Niños", 3000, terremotoNinos);
    }
    
    console.log(`✅ ${cantidad} ${cantidad === 1 ? 'terremoto para niños' : 'terremotos para niños'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Mostrar mensaje de confirmación
    alert(`✅ ${cantidad} ${cantidad === 1 ? 'terremoto para niños' : 'terremotos para niños'} agregado${cantidad === 1 ? '' : 's'} al carrito`);
    
    // Opcional: Resetear la cantidad a 1 después de agregar
    setCantidad(1);
  };

  // 🔹 Miniaturas disponibles
  const miniaturas = [terremoto2, terremoto3, terremoto4];

  // 🔹 Productos relacionados
  const productosRelacionados = [
    { nombre: "Terremoto", img: terremoto, detalle: "/terremoto" },
    { nombre: "Bebida Coca Cola", img: cocaCola, detalle: "/cocacola" },
    { nombre: "Agua", img: agua, detalle: "/agua" },
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
          <img src={imagenPrincipal} alt="Terremoto para Niños" />

          {/* Miniaturas clickeables */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} del Terremoto para Niños`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
        
        <div className="producto-info">
          <h1>TERREMOTO PARA NIÑOS</h1>
          <p className="precio">$3.000</p>
          <p className="descripcion">
            Deliciosa bebida Ginger Ale con un maravilloso helado de piña y un toque de granadina.
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

export default ProductoTerremotoNinos;