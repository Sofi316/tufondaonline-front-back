import React from 'react';
import { Link } from 'react-router-dom';

export default function Bienvenida() {
  return (
    <div className="card my-5">
      
      <div className="card-header text-center">
       
        <h2> Bienvenido a la FondaOnline </h2>
      </div>

      <div className="card-body">
        
        <p className="card-bienvenida">
          Celebremos nuestras raíces con sabores típicos chilenos <br />
          Nuestra misión es llevar lo mejor de la gastronomía chilena a tu hogar
        </p>

        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">¡ATENCIÓN!</h4>
          
          <ul className="mb-0">
            <li>Mayores de 50 años tienen 50% de descuento.</li>
            <li>Código <strong>FELICES18</strong> para un 18% de descuento en todos nuestros productos.</li>
            <li>Estudiantes DUOC: <i className="bi bi-balloon"></i>¡Choripan gratis en el día de tu cumpleaños!<i className="bi bi-balloon-fill"></i></li>
          </ul>
        </div>
        
        <div className="text-center">
          
          <Link to="/categorias" className="btn btn-danger me-2">
            Ver Categorías
          </Link>

          <Link to="/registro" className="btn btn-outline-primary">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}