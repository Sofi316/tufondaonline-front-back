import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-contenido">
        
        <div>
          <strong>FondaOnline</strong>
          <p>Productos de fonda chilena con historia y sabor para tu hogar.</p>
        </div>

        <div>
          <strong>Navegador</strong>
          <ul className="footer-nav">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <strong>Redes</strong>
          <p>
            <i className="bi bi-facebook me-2"></i>
            <a href="#" aria-disabled="true">Facebook</a>
          </p>
          <p>
            <i className="bi bi-instagram me-2"></i>
            <a href="#" aria-disabled="true">Instagram</a>
          </p>
        </div>

      </div>
      <p className="copy">© 2025 FondaOnline. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;