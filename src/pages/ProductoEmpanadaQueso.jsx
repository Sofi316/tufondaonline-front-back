// src/pages/ProductoEmpanadaQueso.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../data/productosData'; // Importa la función
import { useCarrito } from "../components/CarritoContext";

// Miniaturas y Relacionados
import empanadaqueso2 from "../assets/productos/empanadaqueso2.jpg";
import empanadaqueso3 from "../assets/productos/empanadaqueso3.jpg";
import empanadaqueso4 from "../assets/productos/empanadaqueso4.jpg";
import choripanveg from "../assets/productos/choripanveg.jpg";
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg";
import pastelchocloveg from "../assets/productos/pastelchocloveg.jpg";

const ProductoEmpanadaQueso = () => {
  const productoId = 9; // <<<--- ID para Empanada de Queso
  const producto = getProductById(productoId); // Busca el producto

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

  // Miniaturas (incluye la principal del producto)
  const miniaturas = [producto?.img, empanadaqueso2, empanadaqueso3, empanadaqueso4].filter(Boolean);
  // Relacionados (mantenemos los originales)
  const productosRelacionados = [
    { nombre: "Anticucho de Verduras", img: anticuchoverdura, detalle: "/AnticuchoVerdura" },
    { nombre: "Choripan Vegano", img: choripanveg, detalle: "/ChoripanVegano" },
    { nombre: "Pastel de Choclo Vegano", img: pastelchocloveg, detalle: "/PastelChocloVegano" },
  ];

  return (
    <main className="contenedor"> {/* Usa tu clase principal */}
      {/* Breadcrumb */}
      <div className="breadcrumb mb-4">
            <Link to="/" className="text-decoration-none text-muted">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/categorias" className="text-decoration-none text-muted">Categorias</Link>
            <span className="mx-2">/</span>
            <span className="fw-bold">{producto.nombre}</span>
        </div>

      <section className="producto"> {/* Clase original */}
        <div className="producto-imagen"> {/* Clase original */}
          <img src={imagenPrincipal} alt={producto.nombre} className="img-fluid"/> {/* img-fluid para responsive */}
          <div className="miniaturas"> {/* Clase original */}
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} de ${producto.nombre}`}
                onClick={() => setImagenPrincipal(mini)}
                // Estilo original + borde activo
                style={{ cursor: "pointer", width: '80px', height:'80px', objectFit:'cover', border: imagenPrincipal === mini ? '2px solid #4c4eaf' : '1px solid #ccc', margin:'2px', borderRadius:'4px' }}
              />
            ))}
          </div>
        </div>

        <div className="producto-info"> {/* Clase original */}
          <h1>{producto.nombre.toUpperCase()}</h1> {/* Nombre dinámico */}
          {/* Precio Dinámico */}
          {producto.enOferta ? (
              <p className="precio"> {/* CLASE ORIGINAL */}
                <span style={{color: 'red', fontWeight: 'bold', marginRight: '10px'}}>
                  ${producto.precioOferta.toLocaleString("es-CL")}
                </span>
                <del style={{color: '#666', fontSize: '0.9em'}}>
                  ${producto.precio.toLocaleString("es-CL")}
                </del>
              </p>
            ) : (
              <p className="precio">${producto.precio.toLocaleString("es-CL")}</p> /* CLASE ORIGINAL */
            )}
          {/* Descripción Dinámica */}
          <p className="descripcion">{producto.descripcion || "Descripción no disponible."}</p> {/* CLASE ORIGINAL */}

          <label htmlFor="cantidad">Cantidad:</label> {/* Etiqueta original */}
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            min="1"
            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
            style={{ width: '70px', padding:'4px', marginLeft:'5px' }} // Estilo ajustado
          />
          <br /> <br /> {/* Saltos de línea originales */}
          <button
            className="btn btn-danger" // Clase original
            onClick={handleAgregarAlCarrito}
          >
            <i className="bi bi-cart-plus me-2"></i>
            AGREGAR {cantidad > 1 ? `(${cantidad}) AL ` : ''}CARRITO
          </button>
        </div>
      </section>

      {/* Productos relacionados - CLASES Y ESTILOS ORIGINALES */}
      <section style={{ marginTop: '40px' }}>
        <center><h1>PRODUCTOS RELACIONADOS</h1></center>
        <div className="productos-relacionados" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {productosRelacionados.map((relacionado, index) => (
            <div key={index} className="recuadro"> {/* Tu clase original */}
              <Link to={relacionado.detalle}>
                <img
                  src={relacionado.img} alt={relacionado.nombre}
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '4px' }} /> {/* Estilos originales */}
              </Link>
              <Link to={relacionado.detalle} className="link-detalle"> {/* Tu clase original */}
                <h2 style={{ marginTop: '10px', fontSize: '16px' }}>{relacionado.nombre.toUpperCase()}</h2> {/* Estilos originales */}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
export default ProductoEmpanadaQueso;