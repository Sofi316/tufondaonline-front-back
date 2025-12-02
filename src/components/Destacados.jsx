import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import api from '../config/api';

export default function Destacados() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/api/productos");
        const data = response.data;

        const destacados = data.filter(p => p.destacado === true);
        setProductos(destacados.length > 0 ? destacados : data.slice(0, 3));

      } catch (error) {
        console.error("Error obteniendo productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <div className="container-fluid mt-0 mb-4 text-center" >
        <h2 className="texto-azul">Destacados</h2>
        <p>Atrevete a probar nuestros platos más populares!</p>
      </div>

      <Carousel className="carousel-fijo">
        {productos.length > 0 ? (
          productos.map(producto => (
            <Carousel.Item key={producto.id}>
              <img
                className="d-block w-100"
                src={producto.img} 
                alt={producto.nombre}
              />
              <Carousel.Caption>
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <p className="text-center">Cargando productos...</p>
        )}
      </Carousel>
    </>
  );
}
