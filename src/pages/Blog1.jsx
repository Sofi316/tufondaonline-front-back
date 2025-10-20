import React from 'react';
import { Link } from 'react-router-dom';
import imgBlog1 from '../assets/blog1.jpg';
export default function BlogDetalle1() {
  return (
    <main className="container my-4">
      <article className="col-lg-8 mx-auto">
        <h1>Historia de las fondas chilenas</h1>
        
        <img 
          src={imgBlog1} 
          alt="Historia de las fondas chilenas" 
          className="img-fluid rounded mb-3" 
        />
        
        <div className="blog-content">
          <p>Las fondas chilenas tienen su origen en el siglo XIX, cuando comenzaron a aparecer como lugares de esparcimiento durante las Fiestas Patrias. Estas celebraciones se remontan a la proclamación de la Independencia de Chile en 1818.</p>
          
          <p>Originalmente, las fondas eran simples carpas o ramadas donde se vendían comidas típicas y bebidas tradicionales. Con el tiempo, se fueron transformando en espacios más elaborados, con decoraciones de banderas, guirnaldas y faroles.</p>
          
          <h2>Evolución de las fondas</h2>
          <p>En sus inicios, las fondas eran principalmente rurales, pero con la urbanización de Chile, se adaptaron a las ciudades. La Fonda de La Reina, creada en 1942, se convirtió en un modelo a seguir por su organización y variedad de entretenciones.</p>
          
          <p>Hoy en día, las fondas son parte esencial de las Fiestas Patrias, con espacios para bailar cueca, juegos típicos como el emboque y el palo ensebado, y por supuesto, la mejor comida chilena.</p>
          
          <h2>Platos típicos</h2>
          <p>Entre los platos que no pueden faltar en una fonda tradicional encontramos:</p>
          <ul>
            <li>Empanadas de pino</li>
            <li>Anticuchos</li>
            <li>Choripanes</li>
            <li>Cazuela</li>
            <li>Asado</li>
          </ul>
          
          <p>Las fondas chilenas representan la esencia de nuestra cultura y tradición, manteniendo vivas las costumbres que nos identifican como chilenos.</p>
        </div>
        
        <Link to="/blogs" className="btn btn-danger mt-4 boton-blog">
          Volver a Blogs
        </Link>
      </article>
    </main>
  );
}