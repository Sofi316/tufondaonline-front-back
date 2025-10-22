import React from "react";
import fondaImg from "../assets/Fonda_som.png"

export default function Nosotros() {
  return (
    <main className="contenedor-nosotros container mt-5 text-center">
      <h1>Sobre nosotros</h1>
      <br />
      <p>
        Fonda Online es una tienda online, como bien dice su nombre, que ofrece los
        mejores productos gastronómicos
      </p>
      <p>
        para celebrar el 18 de septiembre como corresponde. Elige lo mejor de nuestra
        carta y prepárate para celebrar a lo grande con los mejores
      </p>
      <p>
        productos del mercado y sácale partido a tu celebración.
      </p>
      <p>¡Viva Chile!</p>

      <br />
      <p>Página web hecha por estudiantes del Instituto Profesional Duoc UC:</p>
      <ul className="integrantes list-unstyled">
        <li>Sofía Hormazábal</li>
        <li>Romina Hormazábal</li>
        <li>Fabián Sanhueza</li>
      </ul>

      <div className="text-center mt-4">
        <img src={fondaImg} alt="Fonda Online" className="img-fluid rounded" />
      </div>
    </main>
  );
}
