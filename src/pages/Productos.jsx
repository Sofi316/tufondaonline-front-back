import React from "react";
import { Link } from 'react-router-dom';
import choripan from "../assets/productos/choripan.jpg"
import completo from "../assets/productos/completo.jpg"
import anticucho from "../assets/productos/anticucho.jpg"
import pastelChoclo from "../assets/productos/pastelchoclo.jpg"
import empanada from "../assets/productos/empanada.jpg"
import choripanVeg from "../assets/productos/choripanveg.jpg"
import completoVeg from "../assets/productos/completoveg.jpg"
import empanadaVeg from "../assets/productos/empanadaveg.jpg"
import empanadaQueso from "../assets/productos/empanadaqueso.jpg"
import anticuchoVer from "../assets/productos/anticuchoverdura.jpg"
import pastelChocloVeg from "../assets/productos/pastelchocloveg.jpg"
import terremoto from "../assets/productos/terremoto.jpg"
import terremotoNinos from "../assets/productos/terremotoniños.jpg"
import cocaCola from "../assets/productos/coca-cola.jpg"
import agua from "../assets/productos/agua.jpg"

const productos = [
  { nombre: "Choripán", precio: 3000, img: choripan, detalle: "/Choripan", categoria: "Plato con Carne" },
  { nombre: "Completo Italiano", precio: 3500, img: completo, detalle: "detalle_completo.html", categoria: "Plato con Carne" },
  { nombre: "Anticucho", precio: 10000, img: anticucho, detalle: "detalle_anticucho.html", categoria: "Plato con Carne" },
  { nombre: "Pastel de Choclo", precio: 17000, img: pastelChoclo, detalle: "detalle_pastel_choclo.html", categoria: "Plato con Carne" },
  { nombre: "Empanada de Pino", precio: 5000, img: empanada, detalle: "detalle_empanada_pino.html", categoria: "Plato con Carne" },
  { nombre: "Choripán Vegano", precio: 3000, img: choripanVeg, detalle: "detalle_choripan_veg.html", categoria: "Plato sin carne" },
  { nombre: "Completo Italiano Vegano", precio: 3500, img: completoVeg, detalle: "detalle_completo_veg.html", categoria: "Plato sin carne" },
  { nombre: "Empanada Vegana", precio: 5000, img: empanadaVeg, detalle: "detalle_empanada_veg.html", categoria: "Plato sin carne" },
  { nombre: "Empanada de Queso", precio: 5000, img: empanadaQueso, detalle: "detalle_empanada_queso.html", categoria: "Plato sin carne" },
  { nombre: "Anticucho de Verduras", precio: 8000, img: anticuchoVer, detalle: "detalle_anticucho_ver.html", categoria: "Plato sin carne" },
  { nombre: "Pastel de Choclo Vegano", precio: 17000, img: pastelChocloVeg, detalle: "detalle_pastel_choclo_veg.html", categoria: "Plato sin carne" },
  { nombre: "Terremoto", precio: 3500, img: terremoto, detalle: "detalle_terremoto.html", categoria: "Bebestible" },
  { nombre: "Terremoto para Niños", precio: 3000, img: terremotoNinos, detalle: "detalle_terremoto_nin.html", categoria: "Bebestible" },
  { nombre: "Bebida Coca Cola", precio: 2500, img: cocaCola, detalle: "detalle_coca.html", categoria: "Bebestible" },
  { nombre: "Agua", precio: 1800, img: agua, detalle: "detalle_agua.html", categoria: "Bebestible" },
];

function Productos({ agregarAlCarrito }) {
  return (
    <div className="contenedor-productos">
      <br />
      <center>
        <h1>Productos para su mesa</h1>
      </center>
      <br />
      {productos.map((producto) => (
        <div className="recuadro" data-categoria={producto.categoria} key={producto.nombre}>
          <a href={producto.detalle}>
            <img src={producto.img} alt={producto.nombre} />
          </a>
          <h2>
            <a href={producto.detalle}>{producto.nombre}</a>
          </h2>
          <p>${producto.precio.toLocaleString("es-CL")}</p>
          <button className="btn btn-danger" onClick={() => agregarAlCarrito(producto.nombre, producto.precio)}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Productos;