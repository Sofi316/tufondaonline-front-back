import React from 'react';
import { Carousel } from 'react-bootstrap';
import terremoto from '../assets/terremoto-1.jpg';
import choripan from '../assets/choripan-1.jpg';
import sopaipa from "../assets/sopaipa-1.jpg";

export default function Destacados() {
  return (
   <>
    <div className="container-fluid mt-0 mb-4 text-center">
        <h2>Destacados</h2>
        <p>Atrevete a probar nuestros platos más populares!</p>
    </div>
    <Carousel className="carousel-fijo">
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={terremoto}
          alt="terremoto"
        />
        <Carousel.Caption>
          <h3>Terremoto</h3>
          <p>Para calmar la sed!</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={choripan}
          alt="choripan"
        />
        <Carousel.Caption>
          <h3>Choripan</h3>
          <p>El choripan más rico de Chile!</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sopaipa} 
          alt="sopaipilla"
        />
        <Carousel.Caption>
          <h3>Sopaipilla</h3>
          <p>Pruebala con pebre!</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  </>
  );
}