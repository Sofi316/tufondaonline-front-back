window.AdminCrearProductoLogic = (() => {

  function handleChange(e, setFormData, setMensaje) {
    setMensaje("");
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "precio" || name === "stock" || name === "precioOferta"
          ? value === "" ? "" : Number(value)
          : value
    }));
  }

  function handleSubmit(e, formData, agregarProducto, navigate, initialState) {
    e.preventDefault();

    if (!formData.nombre || formData.precio === "" || !formData.categoria || formData.stock === "") {
      return { tipoMensaje: "danger", mensaje: "Error: Nombre, Precio, Categoría y Stock son obligatorios." };
    }

    if (isNaN(formData.precio) || isNaN(formData.stock)) {
      return { tipoMensaje: "danger", mensaje: "Error: Precio y Stock deben ser números." };
    }

    if (formData.enOferta && (!formData.precioOferta || formData.precioOferta <= 0)) {
      return { tipoMensaje: "danger", mensaje: "Error: Si el producto está en oferta, debe indicar un Precio Oferta válido mayor a 0." };
    }

    if (formData.enOferta && Number(formData.precioOferta) >= Number(formData.precio)) {
      return { tipoMensaje: "warning", mensaje: "Advertencia: El Precio Oferta es igual o mayor al Precio normal." };
    }


    if (!formData.detalle) {
      formData.detalle = `/${formData.nombre.toLowerCase().replace(/\s+/g, "-")}`;
    }

    try {
      const datosParaGuardar = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        precioOferta: formData.enOferta ? Number(formData.precioOferta) : null
      };

      agregarProducto(datosParaGuardar);
      setTimeout(() => navigate("/admin/productos"), 1500);

      return { tipoMensaje: "success", mensaje: "¡Producto creado exitosamente!", reset: true };
    } catch (error) {
      return { tipoMensaje: "danger", mensaje: "Error al crear el producto: " + (error.message || "Ocurrió un error inesperado") };
    }
  }

  return { handleChange, handleSubmit };
})();
