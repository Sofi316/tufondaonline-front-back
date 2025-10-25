import React from 'react';
import { Link } from 'react-router-dom';
import imgBlog2 from '../assets/blog2.jpg';

export default function BlogDetalle2() {
  return (
    <main className="container my-4">
      <article className="col-lg-8 mx-auto">
        <h1>Receta del Terremoto Chileno</h1>
        
        <img 
          src={imgBlog2} 
          alt="Receta del Terremoto Chileno" 
          className="img-fluid rounded mb-3" 
        />
        
        <div className="blog-content">
          <p>El terremoto es una de las bebidas más emblemáticas de las Fiestas Patrias en Chile. Su nombre proviene del efecto que produce: después de tomar uno, sientes que la tierra tiembla bajo tus pies.</p>
          
          <h2>Ingredientes</h2>
          <ul>
            <li>1 parte de vino pipeño (o vino blanco dulce)</li>
            <li>1 cucharada de granadina</li>
            <li>1 bola de helado de piña</li>
            <li>Hielo opcional</li>
          </ul>
          
          <h2>Preparación</h2>
          <ol>
            <li>Llena un vaso de ½ litro con hielo (opcional)</li>
            <li>Vierte el vino pipeño hasta las ¾ partes del vaso</li>
            <li>Añade la granadina</li>
            <li>Coloca suavemente una bola de helado de piña en la parte superior</li>
            <li>Sirve inmediatamente con una cuchara larga</li>
          </ol>
          
          <h2>Variaciones populares</h2>
          <p>Existen varias versiones del terremoto:</p>
          <ul>
            <li><strong>Réplica:</strong> La misma preparación pero en menor cantidad</li>
            <li><strong>Maremoto:</strong> Lleva adicionalmente fernet o pisco</li>
            <li><strong>Terremoto huaso:</strong> Se prepara con chicha en lugar de pipeño</li>
          </ul>
          
          <h2>Curiosidades</h2>
          <p>El terremoto se popularizó en el Restaurante "La Piojera" en Santiago durante la década de 1980. Desde entonces, se ha convertido en un imprescindible de las fondas durante las Fiestas Patrias.</p>
          
          <p>¡Prepara esta deliciosa bebida en casa y disfruta del auténtico sabor de Chile!</p>
        </div>
        
        <Link to="/blogs" className="btn btn-danger mt-4 boton-blog">
          Volver a Blogs
        </Link>
      </article>
    </main>
  );
}