if (!window.BotonDescargarBoletaLogic) {
  window.BotonDescargarBoletaLogic = {};
}


window.BotonDescargarBoletaLogic.generarContenidoBoleta = function (orderDetails) {
  if (!orderDetails || typeof orderDetails !== "object") {
    return "Error: orderDetails inválido o no proporcionado.";
  }

  try {
    const { orderNumber, items, total } = orderDetails;

    if (!Array.isArray(items) || items.length === 0) {
      return "Error: la orden no contiene productos.";
    }

    let content = `🧾 Boleta FondaOnline\nNúmero de Orden: ${orderNumber || "N/A"}\n\n`;
    content += "Productos:\n";

    items.forEach((item, i) => {
      content += `${i + 1}. ${item.name} - ${item.quantity} x $${item.price}\n`;
    });

    content += `\nTotal: $${total || 0}\n`;
    content += `\nGracias por tu compra 🎉`;

    return content;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};
