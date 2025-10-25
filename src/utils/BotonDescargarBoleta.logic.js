// Evita redeclarar si ya existe
if (!window.BotonDescargarBoletaLogic) {
  window.BotonDescargarBoletaLogic = {};
}

/**
 * @function formatPesoChileno
 * @description Formatea un número como moneda chilena (CLP).
 * @param {number} valor - El número a formatear.
 * @returns {string} - El valor formateado como string (ej: "$1.234"). Devuelve '$NaN' si la entrada no es un número.
 */
window.BotonDescargarBoletaLogic.formatPesoChileno = function(valor) {
  // Valida si es un número antes de formatear
  if (typeof valor !== 'number' || isNaN(valor)) {
      return '$NaN';
  }
  // Usa Intl.NumberFormat para el formato correcto de CLP
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(valor);
};

/**
 * @function generarContenidoBoleta
 * @description Genera el contenido de texto plano para la boleta a partir de los detalles de la orden.
 * @param {object} orderDetails - Objeto con los detalles de la orden. Debe tener: orderNumber, customerInfo (con nombre, apellidos, correo, calle, etc.), items (array con nombre, cantidad, precio), total.
 * @returns {string} - El contenido completo de la boleta como un string de texto. Devuelve un mensaje de error si orderDetails no es válido.
 */
window.BotonDescargarBoletaLogic.generarContenidoBoleta = function(orderDetails) {
  // Validación básica de la entrada
  if (!orderDetails || !orderDetails.orderNumber || !orderDetails.customerInfo || !orderDetails.items || typeof orderDetails.total !== 'number') {
    console.error("generarContenidoBoleta: Faltan datos necesarios en orderDetails.");
    return "Error: No se pudieron generar los detalles de la boleta.";
  }

  // Desestructura los datos para fácil acceso
  const { orderNumber, customerInfo, items, total } = orderDetails;
  const formatFn = window.BotonDescargarBoletaLogic.formatPesoChileno; // Accede a la otra función de este mismo objeto

  // Construye el string de la boleta, línea por línea
  let boletaContent = `========================================\n`;
  boletaContent += `       BOLETA FONDAONLINE\n`;
  boletaContent += `========================================\n\n`;
  boletaContent += `Número de Orden: #${orderNumber}\n`;
  // Usa la fecha actual al momento de generar la boleta
  boletaContent += `Fecha Emisión: ${new Date().toLocaleString('es-CL')}\n\n`;
  boletaContent += `--- Datos del Cliente ---\n`;
  boletaContent += `Nombre: ${customerInfo.nombre || ''} ${customerInfo.apellidos || ''}\n`;
  boletaContent += `Correo: ${customerInfo.correo || ''}\n\n`;
  boletaContent += `--- Dirección de Entrega ---\n`;
  boletaContent += `Dirección: ${customerInfo.calle || ''}${customerInfo.departamento ? `, Depto ${customerInfo.departamento}` : ''}\n`;
  boletaContent += `Comuna: ${customerInfo.comuna || ''}\n`;
  boletaContent += `Región: ${customerInfo.region || ''}\n`;
  if(customerInfo.indicaciones) boletaContent += `Indicaciones: ${customerInfo.indicaciones}\n`;
  boletaContent += `\n--- Productos ---\n`;

  // Itera sobre los items para añadirlos a la boleta
  items.forEach(item => {
    // Calcula subtotal por item (usa el precio del item, que ya debería venir poblado)
    // Asegura que ambos sean números antes de multiplicar, si no, el resultado es NaN
const precioNumerico = typeof item.precio === 'number' ? item.precio : NaN;
const cantidadNumerica = typeof item.cantidad === 'number' ? item.cantidad : 0; // Asume cantidad 0 si no es número
const subtotal = precioNumerico * cantidadNumerica;
    boletaContent += `- ${item.nombre || 'Producto Desconocido'} (x${item.cantidad || 0}) - ${formatFn(item.precio)} c/u = ${formatFn(subtotal)}\n`;
  });

  boletaContent += `\n----------------------------------------\n`;
  // Muestra el total formateado
  boletaContent += `TOTAL PAGADO: ${formatFn(total)}\n`;
  boletaContent += `----------------------------------------\n\n`;
  boletaContent += `¡Gracias por tu compra!\n`;
  boletaContent += `========================================\n`;

  // Devuelve el string completo
  return boletaContent;
};
