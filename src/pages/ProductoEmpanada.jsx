// src/pages/ProductoEmpanada.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../data/productosData'; // Ensure correct path
import { useCarrito } from "../components/CarritoContext"; // Ensure correct path

// Specific images for this component
import empanada2 from "../assets/productos/empanada2.jpg";
import empanada3 from "../assets/productos/empanada3.jpg";
import empanada4 from "../assets/productos/empanada4.jpg";
import anticucho from "../assets/productos/anticucho.jpg";
import completo from "../assets/productos/completo.jpg";
import choripan from "../assets/productos/choripan.jpg";

const ProductoEmpanada = () => {
  const productoId = 5; // ID for Empanada de Pino
  const producto = getProductById(productoId); // Fetch product data

  // State variables
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(''); // Initialize empty
  const { agregarAlCarrito } = useCarrito();

  // Set main image when product data loads
  useEffect(() => {
    if (producto && producto.img) {
      setImagenPrincipal(producto.img);
    }
  }, [producto]);

  // Handle case where product is not found
  if (!producto) {
    return <main className="container text-center my-5"><h2>Producto no encontrado</h2><Link to="/productos" className="btn btn-primary">Volver</Link></main>;
  }

  // Handle adding to cart
  const handleAgregarAlCarrito = () => {
    const precioAAgregar = producto.enOferta ? producto.precioOferta : producto.precio;
    // Original loop to add selected quantity
    for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(producto.id, producto.nombre, precioAAgregar, producto.img);
    }
    const mensaje = `✅ ${cantidad} ${producto.nombre.toLowerCase()}${cantidad > 1 ? 's' : ''} agregado${cantidad > 1 ? 's' : ''} al carrito`;
    alert(mensaje);
    setCantidad(1); // Reset quantity
  };

  // Define miniatures including the main product image
  const miniaturas = [producto?.img, empanada2, empanada3, empanada4].filter(Boolean);
  // Define related products (using original static paths)
  const productosRelacionados = [
    { nombre: "Anticucho", img: anticucho, detalle: "/Anticucho" },
    { nombre: "Choripan", img: choripan, detalle: "/Choripan" },
    { nombre: "Completo Italiano", img: completo, detalle: "/Completo" },
  ];

  return (
    // Use original main container class if needed
    <main className="contenedor">
      {/* Breadcrumb - Dynamic */}
      <div className="breadcrumb mb-4">
        <Link to="/" className="text-decoration-none text-muted">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/categorias" className="text-decoration-none text-muted">Categorias</Link>
        <span className="mx-2">/</span>
        <span className="fw-bold">{producto.nombre}</span>
      </div>

      {/* Main product section - Original classes */}
      <section className="producto">
        <div className="producto-imagen">
          {/* Main image */}
          <img src={imagenPrincipal} alt={producto.nombre} className="img-fluid"/>
          {/* Miniatures - Original classes */}
          <div className="miniaturas">
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} de ${producto.nombre}`}
                onClick={() => setImagenPrincipal(mini)}
                // Original style + active border logic
                style={{ cursor: "pointer", width: '80px', height:'80px', objectFit:'cover', border: imagenPrincipal === mini ? '2px solid #4c4eaf' : '1px solid #ccc', margin:'2px', borderRadius:'4px' }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info"> {/* Original class */}
          <h1>{producto.nombre.toUpperCase()}</h1> {/* Dynamic name */}
          {/* Dynamic Price (Offer or Regular) - Original class */}
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
          {/* Dynamic Description - Original class */}
          <p className="descripcion">{producto.descripcion || "Descripción no disponible."}</p>

          {/* Quantity Input - Original structure */}
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            min="1"
            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
            style={{ width: '70px', padding:'4px', marginLeft:'5px' }} // Adjusted inline style
          />
          <br /> <br /> {/* Original line breaks */}
          <button
            className="btn btn-danger" // Original classes
            onClick={handleAgregarAlCarrito}
          >
            <i className="bi bi-cart-plus me-2"></i>
            AGREGAR {cantidad > 1 ? `(${cantidad}) AL ` : ''}CARRITO
          </button>
        </div>
      </section>

      {/* Related Products - Original classes and styles */}
      <section style={{ marginTop: '40px' }}>
        <center><h1>PRODUCTOS RELACIONADOS</h1></center>
        <div className="productos-relacionados" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {productosRelacionados.map((relacionado, index) => (
            <div key={index} className="recuadro"> {/* Original class */}
              <Link to={relacionado.detalle}>
                <img src={relacionado.img} alt={relacionado.nombre} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '4px' }} /> {/* Original styles */}
              </Link>
              <Link to={relacionado.detalle} className="link-detalle"> {/* Original class */}
                <h2 style={{ marginTop: '10px', fontSize: '16px' }}>{relacionado.nombre.toUpperCase()}</h2> {/* Original styles */}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductoEmpanada;