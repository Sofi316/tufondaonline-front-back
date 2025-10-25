// src/components/BotonDescargarBoleta.jsx

// 1. Importa el archivo de lógica (ajusta la ruta si es necesario)
import '../utils/BotonDescargarBoleta.logic.js'; 
import React from 'react';
import { Button } from 'react-bootstrap';

// Recibe los detalles de la orden como prop
const BotonDescargarBoleta = ({ orderDetails }) => {

  // 2. Ya NO necesitamos formatPesoChileno aquí, está en el .logic.js

  // 3. Modifica handleDownload para usar la lógica externa
  const handleDownload = () => {
    // Validar que orderDetails exista
    if (!orderDetails) {
        console.error("handleDownload: orderDetails no proporcionado.");
        alert("Error: No hay detalles de la orden para descargar."); // Informa al usuario
        return;
    }

    // Llamar a la función de lógica externa para generar el contenido
    // Accede a la función a través del objeto global 'window'
    const boletaContent = window.BotonDescargarBoletaLogic.generarContenidoBoleta(orderDetails);

    // Verificar si la lógica devolvió un error
    if (boletaContent.startsWith("Error:")) {
        console.error("Error al generar boleta:", boletaContent);
        alert(boletaContent); // Muestra el error si la generación falló
        return;
    }

    // Lógica de descarga (se mantiene igual)
    try {
        const blob = new Blob([boletaContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const orderNumber = orderDetails.orderNumber || 'boleta';
        link.download = `boleta_fondaonline_${orderNumber}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("Error al intentar descargar la boleta:", error);
        alert("Ocurrió un error al intentar descargar el archivo.");
    }
  };

  return (
    <Button variant="outline-success" onClick={handleDownload} className="mt-2">
      <i className="bi bi-download me-2"></i> Descargar Boleta (.txt)
    </Button>
  );
};

export default BotonDescargarBoleta;