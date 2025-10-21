import React from 'react';
import FormularioLogin from '../components/FormularioLogin';

export default function IniciarSesion() {
  return (
    <main className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                Ingresa a tu cuenta
              </h2>
              
              <FormularioLogin />
            
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}