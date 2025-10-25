import React from 'react';
import { Button } from 'react-bootstrap';

// Recibe los detalles de la orden como prop
const BotonDescargarBoleta = ({ orderDetails }) => {

  const formatPesoChileno = (valor) => {
    if (typeof valor !== 'number') return '$NaN';
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  const handleDownload = () => {
    if (!orderDetails) return;

    const { orderNumber, customerInfo, items, total } = orderDetails;

    // Genera el contenido del archivo de texto
    let boletaContent = `========================================\n`;
    boletaContent += `       BOLETA FONDAONLINE\n`;
    boletaContent += `========================================\n\n`;
    boletaContent += `Número de Orden: #${orderNumber}\n`;
    boletaContent += `Fecha: ${new Date().toLocaleString('es-CL')}\n\n`;
    boletaContent += `--- Datos del Cliente ---\n`;
    boletaContent += `Nombre: ${customerInfo.nombre} ${customerInfo.apellidos}\n`;
    boletaContent += `Correo: ${customerInfo.correo}\n\n`;
    boletaContent += `--- Dirección de Entrega ---\n`;
    boletaContent += `Dirección: ${customerInfo.calle}${customerInfo.departamento ? `, Depto ${customerInfo.departamento}` : ''}\n`;
    boletaContent += `Comuna: ${customerInfo.comuna}\n`;
    boletaContent += `Región: ${customerInfo.region}\n`;
    if(customerInfo.indicaciones) boletaContent += `Indicaciones: ${customerInfo.indicaciones}\n`;
    boletaContent += `\n--- Productos ---\n`;
    items.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      boletaContent += `- ${item.nombre} (x${item.cantidad}) - ${formatPesoChileno(item.precio)} c/u = ${formatPesoChileno(subtotal)}\n`;
    });
    boletaContent += `\n----------------------------------------\n`;
    boletaContent += `TOTAL PAGADO: ${formatPesoChileno(total)}\n`;
    boletaContent += `----------------------------------------\n\n`;
    boletaContent += `¡Gracias por tu compra!\n`;
    boletaContent += `========================================\n`;

    // Lógica de descarga (igual que antes)
    const blob = new Blob([boletaContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `boleta_fondaonline_${orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <Button variant="outline-success" onClick={handleDownload} className="mt-2">
      <i className="bi bi-download me-2"></i> Descargar Boleta (.txt)
    </Button>
  );
};

export default BotonDescargarBoleta;