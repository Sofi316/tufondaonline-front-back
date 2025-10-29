window.AdminEditarProductoLogic = (() => {

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
          : value,
    }));
  }


  function handleSubmit(e, formData, id, actualizarProducto, navigate) {
    e.preventDefault();

    if (!formData.nombre || formData.precio === '' || !formData.categoria || formData.stock === '') {
      return { tipoMensaje: "danger", mensaje: "Error: Nombre, Precio, Categoría y Stock son obligatorios." };
    }

    if (isNaN(formData.precio) || isNaN(formData.stock) || (formData.enOferta && isNaN(formData.precioOferta))) {
      return { tipoMensaje: "danger", mensaje: "Error: Precio, Stock y Precio Oferta (si aplica) deben ser números." };
    }

    if (formData.enOferta && (!formData.precioOferta || Number(formData.precioOferta) <= 0)) {
      return { tipoMensaje: "danger", mensaje: "Error: Si el producto está en oferta, debe indicar un Precio Oferta válido mayor a 0." };
    }

    if (formData.enOferta && Number(formData.precioOferta) >= Number(formData.precio)) {
      return { tipoMensaje: "warning", mensaje: "Advertencia: El Precio Oferta es igual o mayor al Precio normal." };
    }

    try {
      const datosParaActualizar = {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        precioOferta: formData.enOferta ? Number(formData.precioOferta) : null
      };

      actualizarProducto(id, datosParaActualizar);
      setTimeout(() => navigate('/admin/productos'), 1500);

      return { tipoMensaje: "success", mensaje: "¡Producto actualizado exitosamente!" };
    } catch (error) {
      return { tipoMensaje: "danger", mensaje: "Error al actualizar el producto: " + (error.message || "Ocurrió un error inesperado") };
    }
  }

  return { handleChange, handleSubmit };
})();
