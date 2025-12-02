import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api"; 
import { useCarrito } from "../components/CarritoContext";

function Ofertas() {
  const { agregarAlCarrito } = useCarrito();
  const [productosEnOferta, setProductosEnOferta] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get("/api/productos");

        const ofertas = res.data
          .filter((p) => p.enOferta === true)
          .map((p) => ({
            ...p,
            detalle: `/producto/${p.id}`
          }));

        setProductosEnOferta(ofertas);
      } catch (err) {
        console.error("Error cargando ofertas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

 
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,                // Precio normal
      precioOferta: producto.precioOferta,    // Precio oferta si existe
      img: producto.img                       // Imagen desde el backend
    });

    alert(`✅ ${producto.nombre} agregado al carrito`);
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <h4>Cargando ofertas...</h4>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="text-center mb-4 ">
        <h1 className="texto-azul">Ofertas Especiales</h1>
        <p>¡Aprovecha nuestros productos con descuento!</p>
      </div>

      {productosEnOferta.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Actualmente no hay productos en oferta. ¡Vuelve pronto!
        </div>
      ) : (
        <div className="contenedor-productos">
          {productosEnOferta.map((producto) => (
            <div className="recuadro" key={producto.id}>
              <Link to={producto.detalle}>
                <img src={producto.img} alt={producto.nombre} />
              </Link>

              <h2>
                <Link to={producto.detalle} className="link-detalle">
                  {producto.nombre}
                </Link>
              </h2>

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
