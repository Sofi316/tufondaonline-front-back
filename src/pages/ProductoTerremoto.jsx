// src/pages/ProductoTerremoto.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../data/productosData';
import { useCarrito } from "../components/CarritoContext";

// Miniaturas y Relacionados
import terremoto2 from "../assets/productos/terremoto2.jpg";
import terremoto3 from "../assets/productos/terremoto3.jpg";
import terremoto4 from "../assets/productos/terremoto4.jpg";
import terremotoNinos from "../assets/productos/terremotoniños.jpg";
import cocaCola from "../assets/productos/coca-cola.jpg";
import agua from "../assets/productos/agua.jpg";

const ProductoTerremoto = () => {
  const productoId = 12; // <<<--- ID for Terremoto
  const producto = getProductById(productoId);

  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState('');
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    if (producto && producto.img) {
      setImagenPrincipal(producto.img);
    }
  }, [producto]);

  if (!producto) {
     return <main className="container text-center my-5"><h2>Producto no encontrado</h2><Link to="/productos" className="btn btn-primary">Volver</Link></main>;
  }

  const handleAgregarAlCarrito = () => {
    const precioAAgregar = producto.enOferta ? producto.precioOferta : producto.precio;
    for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(producto.id, producto.nombre, precioAAgregar, producto.img);
    }
    alert(`✅ ${cantidad} ${producto.nombre.toLowerCase()}${cantidad > 1 ? 's' : ''} agregado${cantidad > 1 ? 's' : ''} al carrito`);
    setCantidad(1);
  };

  const miniaturas = [producto?.img, terremoto2, terremoto3, terremoto4].filter(Boolean);
  const productosRelacionados = [
    { nombre: "Terremoto para Niños", img: terremotoNinos, detalle: "/TerremotoNinos" },
    { nombre: "Bebida Coca Cola", img: cocaCola, detalle: "/CocaCola" },
    { nombre: "Agua", img: agua, detalle: "/Agua" },
  ];

  return (
    <main className="contenedor">
      {/* Breadcrumb */}
       <div className="breadcrumb mb-4">
            <Link to="/" className="text-decoration-none text-muted">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/productos" className="text-decoration-none text-muted">Productos</Link>
            <span className="mx-2">/</span>
            <span className="fw-bold">{producto.nombre}</span>
        </div>

      <section className="producto">
        <div className="producto-imagen">
          <img src={imagenPrincipal} alt={producto.nombre} className="img-fluid"/>
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index} src={mini} alt={`Vista ${index + 1} de ${producto.nombre}`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer", width: '80px', height:'80px', objectFit:'cover', border: imagenPrincipal === mini ? '2px solid #4c4eaf' : '1px solid #ccc', margin:'2px', borderRadius:'4px' }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info">
          <h1>{producto.nombre.toUpperCase()}</h1>
          {producto.enOferta ? (
              <p className="precio">
                <span style={{color: 'red', fontWeight: 'bold', marginRight: '10px'}}>
                  ${producto.precioOferta.toLocaleString("es-CL")}
                </span>
                <del style={{color: '#666', fontSize: '0.9em'}}>
                  ${producto.precio.toLocaleString("es-CL")}
                </del>
              </p>
            ) : (
              <p className="precio">${producto.precio.toLocaleString("es-CL")}</p>
            )}
          <p className="descripcion">{producto.descripcion || "Descripción no disponible."}</p>
          <div className="d-flex align-items-center mb-3">
             <label htmlFor="cantidad">Cantidad:</label>
             <input
               type="number" id="cantidad" value={cantidad} min="1"
               onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
               style={{ width: '70px', padding:'4px', marginLeft:'5px' }}
             />
          </div>
          <br /> <br />
          <button className="btn btn-danger" onClick={handleAgregarAlCarrito}>
             <i className="bi bi-cart-plus me-2"></i>
            AGREGAR {cantidad > 1 ? `(${cantidad}) AL ` : ''}CARRITO
          </button>
        </div>
      </section>

      {/* Productos relacionados */}
       <section style={{ marginTop: '40px' }}>
        <center><h1>PRODUCTOS RELACIONADOS</h1></center>
        <div className="productos-relacionados" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {productosRelacionados.map((relacionado, index) => (
            <div key={index} className="recuadro">
              <Link to={relacionado.detalle}>
                <img src={relacionado.img} alt={relacionado.nombre} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
              </Link>
              <Link to={relacionado.detalle} className="link-detalle">
                <h2 style={{ marginTop: '10px', fontSize: '16px' }}>{relacionado.nombre.toUpperCase()}</h2>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductoTerremoto;