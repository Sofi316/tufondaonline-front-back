 
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
   
  if (typeof valor !== 'number' || isNaN(valor)) {
      return '$NaN';
  }
   
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
   
  if (!orderDetails || !orderDetails.orderNumber || !orderDetails.customerInfo || !orderDetails.items || typeof orderDetails.total !== 'number') {
    console.error("generarContenidoBoleta: Faltan datos necesarios en orderDetails.");
    return "Error: No se pudieron generar los detalles de la boleta.";
  }

   
  const { orderNumber, customerInfo, items, total } = orderDetails;
  const formatFn = window.BotonDescargarBoletaLogic.formatPesoChileno;  

   
  let boletaContent = `========================================\n`;
  boletaContent += `       BOLETA FONDAONLINE\n`;
  boletaContent += `========================================\n\n`;
  boletaContent += `Número de Orden: #${orderNumber}\n`;
   
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

   
  items.forEach(item => {
     
     
const precioNumerico = typeof item.precio === 'number' ? item.precio : NaN;
const cantidadNumerica = typeof item.cantidad === 'number' ? item.cantidad : 0;  
const subtotal = precioNumerico * cantidadNumerica;
    boletaContent += `- ${item.nombre || 'Producto Desconocido'} (x${item.cantidad || 0}) - ${formatFn(item.precio)} c/u = ${formatFn(subtotal)}\n`;
  });

  boletaContent += `\n----------------------------------------\n`;
   
  boletaContent += `TOTAL PAGADO: ${formatFn(total)}\n`;
  boletaContent += `----------------------------------------\n\n`;
  boletaContent += `¡Gracias por tu compra!\n`;
  boletaContent += `========================================\n`;

   
  return boletaContent;
};
