
import '../utils/BotonDescargarBoleta.logic.js'; 
import React from 'react';
import { Button } from 'react-bootstrap';

const BotonDescargarBoleta = ({ orderDetails }) => {


  const handleDownload = () => {
    if (!orderDetails) {
        console.error("handleDownload: orderDetails no proporcionado.");
        alert("Error: No hay detalles de la orden para descargar.");
        return;
    }

    const boletaContent = window.BotonDescargarBoletaLogic.generarContenidoBoleta(orderDetails);

    
    if (boletaContent.startsWith("Error:")) {
        console.error("Error al generar boleta:", boletaContent);
        alert(boletaContent); 
        return;
    }


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