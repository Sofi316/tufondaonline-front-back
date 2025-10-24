import React from "react";
import todos from "../assets/productos/todos.jpg"
import anticucho from "../assets/productos/anticucho.jpg";
import anticuchoverdura from "../assets/productos/anticuchoverdura.jpg";
import agua from "../assets/productos/agua.jpg";

const FiltroCategorias = ({ onFiltroChange }) => {
  const categorias = [
    {
      nombre: "Todos los productos",
      imagen: todos,
      activa: true
    },
    {
      nombre: "Plato con Carne",
      imagen: anticucho,
      activa: true
    },
    {
      nombre: "Plato sin carne",
      imagen: anticuchoverdura,
      activa: true
    },
    {
      nombre: "Bebestible",
      imagen: agua,
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