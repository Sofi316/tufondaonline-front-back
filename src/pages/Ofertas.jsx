import React, { useState, useEffect } from 'react';
import { Carousel, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../config/api'; 
function Ofertas() {
  const [productosOferta, setProductosOferta] = useState([]);

  useEffect(() => {
    api.get('/productos')
       .then(res => {
          const ofertas = res.data.filter(p => p.enOferta === true || p.enOferta === 1);
          setProductosOferta(ofertas);
       })
       .catch(err => console.error(err));
       
  }, []);

  if (productosOferta.length === 0) return null; 

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 text-danger">
        <i className="bi bi-fire me-2"></i> ¡Ofertas Relámpago!
      </h2>
      
      <Carousel className="d-none d-md-block shadow rounded overflow-hidden" interval={3000}>
        {productosOferta.map((prod) => (
          <Carousel.Item key={prod.id}>
             <div 
               style={{ 
                 height: '400px', 
                 backgroundImage: `url(${prod.img})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 position: 'relative'
               }}
             >
               <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white p-4" 
                    style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                  <h3>{prod.nombre}</h3>
                  <p className="fs-5">{prod.descripcion}</p>
                  <div className="d-flex gap-3 align-items-center bg-white text-dark px-4 py-2 rounded-pill">
                    <span className="text-decoration-line-through text-muted">${prod.precio}</span>
                    <span className="fw-bold fs-4 text-danger">${prod.precioOferta}</span>
                  </div>
                  <Link to={`/detalle/${prod.id}`} className="btn btn-danger mt-3 btn-lg">
                    Comprar Ahora
                  </Link>
               </div>
             </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-md-none row g-3">
        {productosOferta.map(prod => (
            <div className="col-12" key={prod.id}>
                <Card className="border-danger">
                    <Card.Img variant="top" src={prod.img} style={{height: '200px', objectFit: 'cover'}} />
                    <Card.Body className="text-center">
                        <Card.Title>{prod.nombre}</Card.Title>
                        <div className="mb-2">
                             <span className="text-decoration-line-through text-muted me-2">${prod.precio}</span>
                             <span className="fw-bold text-danger">${prod.precioOferta}</span>
                        </div>
                        <Link to={`/detalle/${prod.id}`} className="btn btn-danger btn-sm">Ver Oferta</Link>
                    </Card.Body>
                </Card>
            </div>
        ))}
      </div>
    </Container>
  );
}

export default Ofertas;