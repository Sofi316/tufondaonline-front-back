import React from 'react';
import logoFonda from '../assets/Fonda_som.png';
import FormularioContacto from '../components/FormularioContacto';

export default function Contacto() {
  return (
    <main>
      <div className="text-center">
        <img src={logoFonda} alt="Logo de la fonda" style={{ width: '150px', margin: '20px' }} />
      </div>

      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 className="text-center texto-azul">Formulario de Contacto</h1>
        
        <FormularioContacto />

      </div>
    </main>
  );
}