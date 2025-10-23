
import { Link } from 'react-router-dom';
import { obtenerProductosEnOferta } from "../data/productosData"; // Asegúrate que la ruta sea correcta
import { useCarrito } from "../components/CarritoContext"; // Asegúrate que la ruta sea correcta

function Ofertas() {
  const { agregarAlCarrito } = useCarrito();
  const productosEnOferta = obtenerProductosEnOferta();

  const handleAgregarAlCarrito = (producto) => {
    // Pasa id, nombre, precio DE OFERTA, img
    agregarAlCarrito(producto.id, producto.nombre, producto.precioOferta, producto.img);
    alert(`✅ ${producto.nombre} (Oferta) agregado al carrito`);
  };

  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        <h1>Ofertas Especiales</h1>
        <p>¡Aprovecha nuestros productos con descuento!</p>
      </div>

      {productosEnOferta.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Actualmente no hay productos en oferta. ¡Vuelve pronto!
        </div>
      ) : (
        <div className="contenedor-productos"> {/* Usa tu clase CSS existente */}
          {productosEnOferta.map((producto) => (
            <div className="recuadro" key={producto.id}> {/* Usa tu clase CSS existente y id como key */}
              <Link to={producto.detalle}>
                <img src={producto.img} alt={producto.nombre} />
              </Link>
              <h2>
                <Link to={producto.detalle}>{producto.nombre}</Link>
              </h2>

              {/* Muestra el precio de oferta y el original tachado */}
              <p>
                <span className="text-danger fw-bold me-2">
                  ${producto.precioOferta.toLocaleString("es-CL")}
                </span>
                <del className="text-muted small">
                  ${producto.precio.toLocaleString("es-CL")}
                </del>
              </p>

              <button
                className="btn btn-danger"
                onClick={() => handleAgregarAlCarrito(producto)}
              >
                Agregar al carrito (Oferta)
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ofertas;