window.AdminUsuariosLogic = {

  //  Simula obtener usuarios desde la capa de datos
  initUsuarios(getUsuarios) {
    if (typeof getUsuarios !== "function") return undefined;
    return getUsuarios();
  },

  //  Simula obtener regiones desde la capa de datos
  initRegiones(getRegiones) {
    if (typeof getRegiones !== "function") return undefined;
    return getRegiones();
  },

  //  Carga comunas según región seleccionada
  updateComunasPorRegion(region, getComunas) {
    if (!region || typeof getComunas !== "function") return [];
    return getComunas(region);
  },

  //  Muestra el detalle de un usuario y obtiene sus órdenes
  handleShowDetails(user, getOrdenesPorUsuario) {
    if (!user || !user.id || typeof getOrdenesPorUsuario !== "function") {
      return { selectedUser: null, historial: [] };
    }
    return {
      selectedUser: user,
      historial: getOrdenesPorUsuario(user.id)
    };
  },

  //  Cierra el modal de detalles
  handleCloseDetails() {
    return { show: false, historial: [] };
  },

  //  Abre el modal de edición y carga comunas según región del usuario
  handleShowEdit(user, getComunas) {
    if (!user || typeof getComunas !== "function") {
      return { selectedUser: null, comunas: [] };
    }
    return {
      selectedUser: user,
      editFormData: user,
      comunas: getComunas(user.region)
    };
  },

  //  Actualiza el formulario de edición
  handleEditFormChange(prevData, name, value) {
    if (!name) return prevData;
    return { ...prevData, [name]: value };
  },

  //  Envía formulario de edición y actualiza usuarios
  handleEditSubmit(selectedUser, editFormData, updateUsuario, getUsuarios) {
    if (!selectedUser || !selectedUser.id || typeof updateUsuario !== "function" || typeof getUsuarios !== "function") {
      return [];
    }
    updateUsuario(selectedUser.id, editFormData);
    return getUsuarios();
  },

  //  Elimina usuario previa confirmación
  handleDelete(id, deleteUsuario, getUsuarios, confirmFn = window.confirm) {
    if (!id || typeof deleteUsuario !== "function" || typeof getUsuarios !== "function") {
      return [];
    }
    if (confirmFn("¿Estás seguro de que quieres eliminar este usuario?")) {
      deleteUsuario(id);
      return getUsuarios();
    }
    return [];
  },

  //  Formatea número a pesos chilenos
  formatPesoChileno(valor) {
    if (isNaN(valor)) return "$0";
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  }
};
