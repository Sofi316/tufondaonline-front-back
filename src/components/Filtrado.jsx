import React from "react";

const FiltroCategorias = ({ onFiltroChange }) => {
  const categorias = [
    {
      nombre: "Todas",
      imagen: "https://via.placeholder.com/100x100?text=Todas",
      activa: true
    },
    {
      nombre: "Plato con Carne",
      imagen: "https://via.placeholder.com/100x100?text=Carne",
      activa: true
    },
    {
      nombre: "Plato sin carne",
      imagen: "https://via.placeholder.com/100x100?text=Vegano",
      activa: true
    },
    {
      nombre: "Bebestible",
      imagen: "https://via.placeholder.com/100x100?text=Bebidas",
      activa: true
    }
  ];

  const handleCategoriaClick = (categoria) => {
    onFiltroChange(categoria);
  };

  return (
    <div className="filtro-categorias">
      <div className="categorias-container">
        {categorias.map((categoria, index) => (
          <div
            key={index}
            className="categoria-item"
            onClick={() => handleCategoriaClick(categoria.nombre)}
          >
            <div className="categoria-imagen">
              <img src={categoria.imagen} alt={categoria.nombre} />
            </div>
            <span className="categoria-nombre">{categoria.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltroCategorias;