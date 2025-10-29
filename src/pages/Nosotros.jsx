import React from 'react';
import logoFonda from '../assets/Fonda_som.png'; 

export default function Nosotros() {
  return (
    <main className="container my-4">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="mb-4">Sobre nosotros</h1>
          <p className="lead">
            Fonda Online es una tienda online, como bien dice su nombre, que ofrece los
            mejores productos gastronómicos para celebrar el 18 de septiembre como corresponde.
          </p>
          <p>
            Elige lo mejor de nuestra carta y prepárate para celebrar a lo grande con los mejores
            productos del mercado y sácale partido a tu celebración.
          </p> 
          <p className="mt-3 nosotros">¡Viva Chile!</p>
          <hr className="my-4" />
          <p>Página web hecha por estudiantes del Instituto Profesional DuocUc:</p>
          <ul className="list-unstyled">
            <li>Sofía Homazábal</li>
            <li>Romina Hormazábal</li>
            <li>Fabián Sanhueza</li>
          </ul>
          <div className="text-center mt-4">
            <img 
              src={logoFonda} 
              alt="Logo de la fonda" 
              style={{ width: '150px' }} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}