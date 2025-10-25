import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { productos } from "../data/productosData"; // Asegúrate que la ruta sea correcta
import { useCarrito } from "../components/CarritoContext"; // Asegúrate que la ruta sea correcta
import FiltroCategorias from "../components/Filtrado"; // Importa el componente de filtro

function Categorias() {
  const { agregarAlCarrito } = useCarrito();
  // Estado para guardar la categoría seleccionada, inicia con 'Todos'
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos los productos');

  // Filtra la lista de productos basado en el estado 'categoriaFiltro'
  const productosFiltrados = categoriaFiltro === 'Todos los productos'
    ? productos // Si es 'Todos', muestra la lista completa
    : productos.filter(producto => producto.categoria === categoriaFiltro); // Si no, filtra por categoría

  // Función para agregar un producto al carrito
  const handleAgregarAlCarrito = (producto) => {
    // Determina si usar el precio normal o el de oferta
    const precioAAgregar = producto.enOferta ? producto.precioOferta : producto.precio;
    const esOferta = producto.enOferta; // Para el mensaje de alerta

    // Llama a la función del contexto del carrito
    agregarAlCarrito(producto.id, producto.nombre, precioAAgregar, producto.img);

    // Muestra una confirmación al usuario
    alert(`✅ ${producto.nombre} ${esOferta ? '(Oferta)' : ''} agregado al carrito`);
  };

  // Función que se pasa al componente FiltroCategorias
  // Se ejecutará cuando el usuario haga clic en una categoría en el filtro
  const handleFiltroChange = (categoriaSeleccionada) => {
    // Actualiza el estado con la nueva categoría, lo que re-renderizará la lista
    setCategoriaFiltro(categoriaSeleccionada);
  };

  return (
    // Contenedor principal de la página
    <div className="container my-4"> {/* Usa container de Bootstrap y margen vertical */}

      {/* Breadcrumb de navegación */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Categorías</li>
        </ol>
      </nav>

      {/* Título principal de la página */}
      <div className="text-center mb-4">
        <h1>Explora por Categoría</h1>
      </div>

      {/* Componente de Filtro */}
      {/* Le pasamos la función 'handleFiltroChange' como prop */}
      <FiltroCategorias onFiltroChange={handleFiltroChange} />

      {/* Título dinámico que indica qué se está mostrando */}
      <div className="text-center my-4 ">
          <h2 className="texto-azul">
            {/* Muestra un título diferente si se está filtrando o no */}
            {categoriaFiltro === 'Todos los productos'
              ? 'Todos los productos'
              : `${categoriaFiltro}`
            }
          </h2>
      </div>

      {/* Contenedor donde se mostrarán las tarjetas de productos */}
      {/* Usa tu clase CSS original '.contenedor-productos' para el grid */}
      <div className="contenedor-productos">
        {/* Mapea (recorre) la lista de productos FILTRADOS */}
        {productosFiltrados.map((producto) => (
          // Cada tarjeta de producto
          // Usa tu clase CSS original '.recuadro'
          <div
            className="recuadro"
            key={producto.id} // Usa el ID único del producto como key
          >
            {/* Enlace a la página de detalle del producto */}
            <Link to={producto.detalle}>
              <img src={producto.img} alt={producto.nombre} />
            </Link>
            {/* Nombre del producto (también es un enlace) */}
            <h2>
              {/* Usa tu clase CSS original '.link-detalle' si la tienes */}
              <Link to={producto.detalle} className="link-detalle">{producto.nombre}</Link>
            </h2>

             {/* Muestra el precio (normal o con oferta y tachado) */}
            {producto.enOferta ? (
                <p>
                  <span className="text-danger fw-bold me-2"> {/* Precio oferta resaltado */}
                    ${producto.precioOferta.toLocaleString("es-CL")}
                  </span>
                  <del className="text-muted small"> {/* Precio original tachado */}
                    ${producto.precio.toLocaleString("es-CL")}
                  </del>
                </p>
              ) : (
                <p>${producto.precio.toLocaleString("es-CL")}</p> // Precio normal
              )}

            {/* Botón para agregar al carrito */}
            <button
              className="btn btn-danger" // Usa tus clases originales o btn-danger
              onClick={() => handleAgregarAlCarrito(producto)} // Llama a la función al hacer clic
            >
              <i className="bi bi-cart-plus me-1"></i> {/* Icono opcional */}
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Mensaje que se muestra si el filtro no encuentra productos */}
      {productosFiltrados.length === 0 && (
        <div className="alert alert-warning text-center mt-4" role="alert">
            Ups... No hay productos disponibles en la categoría "{categoriaFiltro}".
        </div>
      )}
    </div>
  );
}

// Exporta el componente para poder usarlo en App.jsx
export default Categorias;