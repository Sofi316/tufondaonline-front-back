window.AdminCrearCategoriaLogic = (() => {


  function handleChange(e, setNombreCategoria, setMensaje) {
    setMensaje("");
    setNombreCategoria(e.target.value);
  }

  function handleSubmit(e, nombreCategoria, setMensaje, setTipoMensaje, setNombreCategoria, navigate) {
    e.preventDefault();
    setMensaje("");

    if (!nombreCategoria.trim()) {
      setTipoMensaje("danger");
      setMensaje("Error: El nombre de la categoría no puede estar vacío.");
      return { tipoMensaje: "danger", mensaje: "Error: El nombre de la categoría no puede estar vacío." };
    }

    console.log("Nueva categoría a crear:", nombreCategoria);

    setTipoMensaje("success");
    setMensaje(`¡Categoría "${nombreCategoria}" creada exitosamente!`);
    setNombreCategoria("");

    setTimeout(() => navigate('/admin/categorias'), 2000);

    return { tipoMensaje: "success", mensaje: `¡Categoría "${nombreCategoria}" creada exitosamente!`, reset: true };
  }

  return { handleChange, handleSubmit };
})();
