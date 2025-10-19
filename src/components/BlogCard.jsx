import React from 'react';
import { Link } from 'react-router-dom';


export default function BlogCard({ blog }) {
  return (
   
    <div className="col-md-6" key={blog.id}>
      <article className="card h-100">
        <Link to={`/Blog${blog.id}`}>
          <img src={blog.img} alt={blog.title} className="card-img-top" />
        </Link>
        <div className="card-body d-flex flex-column">
          <h3>{blog.title}</h3>
          <p className="text-muted">{blog.excerpt}</p>
          <Link to={`/Blog${blog.id}`} className="btn btn-danger mt-4 boton-blog mt-auto">
            Leer blog
          </Link>
        </div>
      </article>
    </div>
  );
}