// src/pages/ProductoChoripan.jsx
import React, { useState, useEffect } from 'react'; // Añadido useEffect
import { Link } from 'react-router-dom';
import { getProductById } from '../data/productosData'; // Asegúrate que la ruta sea correcta
import { useCarrito } from "../components/CarritoContext"; // Asegúrate que la ruta sea correcta

// --- Imágenes específicas (Miniaturas y Relacionados - Mantenemos las originales) ---
import choripan from "../assets/productos/choripan.jpg"; // Imagen principal original
import choripan2 from "../assets/productos/choripan2.jpg";
import choripan3 from "../assets/productos/choripan3.jpg";
import choripan4 from "../assets/productos/choripan4.jpg";
import completo from "../assets/productos/completo.jpg";
import anticucho from "../assets/productos/anticucho.jpg";
import pastelChoclo from "../assets/productos/pastelchoclo.jpg";

const ProductoChoripan = () => {
  // --- Carga dinámica de datos ---
  const productoId = 1; // ID del Choripán
  const producto = getProductById(productoId); // Busca el producto
  // -----------------------------

  // --- Estados locales (Mantenemos los originales) ---
  const [cantidad, setCantidad] = useState(1);
  // Inicializa con la imagen estática, luego useEffect la actualiza si es necesario
  const [imagenPrincipal, setImagenPrincipal] = useState(choripan);
  const { agregarAlCarrito } = useCarrito();
  // ------------------------------------------

  // --- Efecto para actualizar imagen si cambia (Opcional, pero bueno tenerlo) ---
  useEffect(() => {
    if (producto && producto.img) {
      setImagenPrincipal(producto.img); // Asegura usar la imagen de los datos
    }
  }, [producto]);
  // ------------------------------------------------------------------------

  // --- Manejo si el producto no se carga (Mantenemos) ---
  if (!producto) {
    // Puedes mejorar este mensaje
    return <main className="contenedor text-center my-5"><h2>Cargando producto...</h2></main>;
  }
  // ---------------------------------------------

  // --- Lógica Agregar Carrito (Adaptada a datos dinámicos) ---
  const handleAgregarAlCarrito = () => {
    const precioAAgregar = producto.enOferta ? producto.precioOferta : producto.precio;
    // Bucle original para agregar cantidad
    for (let i = 0; i < cantidad; i++) {
        // Usa datos del 'producto' cargado
        agregarAlCarrito(producto.id, producto.nombre, precioAAgregar, producto.img);
    }
    const mensaje = `✅ ${cantidad} ${producto.nombre.toLowerCase()}${cantidad > 1 ? 'es' : ''} agregado${cantidad > 1 ? 's' : ''} al carrito`;
    alert(mensaje);
    setCantidad(1);
  };
  // ----------------------------------------------------

  // --- Miniaturas y Relacionados (Mantenemos los originales) ---
  const miniaturas = [choripan2, choripan3, choripan4]; // Sin la imagen principal aquí
  const productosRelacionados = [
    { nombre: "Completo Italiano", img: completo, detalle: "/Completo" }, // Rutas originales
    { nombre: "Anticucho", img: anticucho, detalle: "/Anticucho" }, // Rutas originales
    { nombre: "Pastel de Choclo", img: pastelChoclo, detalle: "/PastelChoclo" }, // Rutas originales
  ];
  // -----------------------------------------------------

  // --- Renderizado CON TUS CLASES Y ESTILOS ORIGINALES ---
  return (
    // Contenedor principal original (si tenías uno, si no, usa <main>)
    <main className="contenedor"> {/* O la clase que usaras */}
      {/* Breadcrumb original */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> /<Link to="/productos">Productos</Link> /
      </div>

      {/* Producto principal - CLASES ORIGINALES */}
      <section className="producto">
        <div className="producto-imagen">
          {/* Imagen principal que cambia */}
          <img src={imagenPrincipal} alt={producto.nombre} /> {/* Usa nombre dinámico */}

          {/* Miniaturas - CLASES ORIGINALES */}
          <div className="miniaturas">
             {/* Miniatura de la imagen principal */}
             <img
                src={producto.img} // Imagen principal del producto
                alt={`Vista principal de ${producto.nombre}`}
                onClick={() => setImagenPrincipal(producto.img)}
                style={{ cursor: "pointer", border: imagenPrincipal === producto.img ? '2px solid #4c4eaf' : '1px solid #ccc' }} // Estilo original + borde activo
              />
            {/* Otras miniaturas */}
            {miniaturas.map((mini, index) => (
              <img
                key={index}
                src={mini}
                alt={`Vista ${index + 1} de ${producto.nombre}`}
                onClick={() => setImagenPrincipal(mini)}
                style={{ cursor: "pointer", border: imagenPrincipal === mini ? '2px solid #4c4eaf' : '1px solid #ccc' }} // Estilo original + borde activo
              />
            ))}
          </div>
        </div>

        <div className="producto-info"> {/* CLASE ORIGINAL */}
          <h1>{producto.nombre.toUpperCase()}</h1> {/* Nombre dinámico */}

          {/* Precio Dinámico (Oferta o Normal) - CLASE ORIGINAL */}
          {producto.enOferta ? (
              <p className="precio"> {/* CLASE ORIGINAL */}
                <span style={{color: 'red', fontWeight: 'bold', marginRight: '10px'}}> {/* Estilo oferta */}
                  ${producto.precioOferta.toLocaleString("es-CL")}
                </span>
                <del style={{color: '#666', fontSize: '0.9em'}}> {/* Estilo tachado */}
                  ${producto.precio.toLocaleString("es-CL")}
                </del>
              </p>
            ) : (
              <p className="precio">${producto.precio.toLocaleString("es-CL")}</p> /* CLASE ORIGINAL */
            )}

          {/* Descripción Dinámica - CLASE ORIGINAL */}
          <p className="descripcion">{producto.descripcion || "Descripción no disponible."}</p> {/* CLASE ORIGINAL */}

          <label htmlFor="cantidad">Cantidad:</label> {/* Etiqueta original */}
          <input
            type="number"
            id="cantidad" // Mantenemos ID simple si solo hay uno
            value={cantidad}
            min="1"
            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
            // Sin clase form-control si no la usabas
          />
          <br /> {/* Saltos de línea originales */}
          <br />
          <button
            className="btn btn-danger" // Clase original (asumo que tenías btn y rojo/danger)
            onClick={handleAgregarAlCarrito}
          >
            AGREGAR {cantidad > 1 ? `(${cantidad}) AL ` : ''}CARRITO {/* Texto ajustado */}
          </button>
        </div>
      </section>

      {/* Productos relacionados - CLASES Y ESTILOS ORIGINALES */}
      <section style={{ marginTop: "40px" }}>
        <center> {/* Etiqueta original */}
          <h1>PRODUCTOS RELACIONADOS</h1>
        </center>
        <div
          className="productos-relacionados" // Tu clase original
          style={{ /* Tus estilos inline originales */
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {productosRelacionados.map((relacionado, index) => (
            // Tu clase original 'recuadro'
            <div key={index} className="recuadro">
              <Link to={relacionado.detalle}>
                <img
                  src={relacionado.img}
                  alt={relacionado.nombre}
                  style={{ /* Tus estilos inline originales */
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </Link>
              <Link to={relacionado.detalle} className="link-detalle"> {/* Tu clase original */}
                <h2 style={{ /* Tus estilos inline originales */
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