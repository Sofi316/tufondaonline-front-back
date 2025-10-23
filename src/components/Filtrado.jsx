import React, { useState } from 'react';
import { productos } from "../data/productosData";

const FiltroCategorias = ({ onFiltroChange }) => {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  // Obtener categorías únicas
  const categorias = [
    { 
      nombre: 'Todas', 
      cantidad: productos.length 
    },
    ...Array.from(new Set(productos.map(p => p.categoria))).map(categoria => ({
      nombre: categoria,
      cantidad: productos.filter(p => p.categoria === categoria).length
    }))
  ];

  const handleCategoriaClick = (categoria) => {
    setCategoriaActiva(categoria);
    onFiltroChange(categoria);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Filtrar por categoría</h5>
        <div className="d-flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria.nombre}
              className={`btn ${categoriaActiva === categoria.nombre ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategoriaClick(categoria.nombre)}
            >
              {categoria.nombre} <span className="badge bg-light text-dark ms-1">{categoria.cantidad}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltroCategorias;