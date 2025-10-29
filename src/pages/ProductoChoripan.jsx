import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../data/productosData';
import { useCarrito } from "../components/CarritoContext";
import choripan from "../assets/productos/choripan.jpg";
import choripan2 from "../assets/productos/choripan2.jpg";
import choripan3 from "../assets/productos/choripan3.jpg";
import choripan4 from "../assets/productos/choripan4.jpg";
import completo from "../assets/productos/completo.jpg";
import anticucho from "../assets/productos/anticucho.jpg";
import pastelChoclo from "../assets/productos/pastelchoclo.jpg";

const ProductoChoripan = () => {
  const productoId = 1;
  const producto = getProductById(productoId);
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState(choripan);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    if (producto && producto.img) {
      setImagenPrincipal(producto.img);
    }
  }, [producto]);

  if (!producto) {
    return <main className="contenedor text-center my-5"><h2>Cargando producto...</h2></main>;
  }

  const handleAgregarAlCarrito = () => {
    const precioAAgregar = producto.enOferta ? producto.precioOferta : producto.precio;
    for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(producto.id, producto.nombre, precioAAgregar, producto.img);
    }
    const mensaje = `✅ ${cantidad} ${producto.nombre.toLowerCase()}${cantidad > 1 ? 'es' : ''} agregado${cantidad > 1 ? 's' : ''} al carrito`;
    alert(mensaje);
    setCantidad(1);
  };

  const miniaturas = [choripan2, choripan3, choripan4];
  const productosRelacionados = [
    { nombre: "Completo Italiano", img: completo, detalle: "/Completo" },
    { nombre: "Anticucho", img: anticucho, detalle: "/Anticucho" },
    { nombre: "Pastel de Choclo", img: pastelChoclo, detalle: "/PastelChoclo" },
  ];

  return (
   <main className="contenedor">
      <div className="breadcrumb mb-4">
        <Link to="/" className="text-decoration-none text-muted">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/categorias" className="text-decoration-none text-muted">Categorias</Link>
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
            <label htmlFor={`cantidad-${producto.id}`} className="me-2">Cantidad:</label>
            <input
              type="number" id={`cantidad-${producto.id}`} value={cantidad} min="1"
              onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
               style={{ width: '70px', padding:'4px' }}
            />
          </div>
          <button className="btn btn-danger" onClick={handleAgregarAlCarrito}>
             <i className="bi bi-cart-plus me-2"></i>
            AGREGAR {cantidad > 1 ? `(${cantidad}) AL ` : ''}CARRITO
          </button>
        </div>
      </section>
      <section style={{ marginTop: "40px" }}>
        <center>
          <h1>PRODUCTOS RELACIONADOS</h1>
        </center>
        <div
          className="productos-relacionados"
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {productosRelacionados.map((relacionado, index) => (
            <div key={index} className="recuadro">
              <Link to={relacionado.detalle}>
                <img
                  src={relacionado.img}
                  alt={relacionado.nombre}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </Link>
              <Link to={relacionado.detalle} className="link-detalle">
                <h2 style={{
                    marginTop: "10px",
                    fontSize: "16px"
                 }}>
                  {relacionado.nombre.toUpperCase()}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductoChoripan;