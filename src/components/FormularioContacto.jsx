import React, { useState } from 'react';

export default function FormularioContacto() {
  // Estados para guardar los valores de los inputs
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contenido, setContenido] = useState('');

  // Estados para manejar los errores de validación
  const [errorNombre, setErrorNombre] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorContenido, setErrorContenido] = useState('');
  
  // Estado para el mensaje de éxito
  const [exito, setExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
    setExito(false); // Resetea el mensaje de éxito

    // Lógica de validación
    let valido = true;

    // 1. Validación de Nombre
    if (nombre.trim() === '' || nombre.length > 100) {
      setErrorNombre('El nombre es requerido (máx. 100 caracteres).');
      valido = false;
    } else {
      setErrorNombre('');
    }

    // 2. Validación de Correo (con tu Regex original)
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!regexCorreo.test(correo) || correo.length > 100) {
      setErrorCorreo('Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).');
      valido = false;
    } else {
      setErrorCorreo('');
    }

    // 3. Validación de Contenido
    if (contenido.trim() === '' || contenido.length > 500) {
      setErrorContenido('El comentario es requerido (máx. 500 caracteres).');
      valido = false;
    } else {
      setErrorContenido('');
    }

    // 4. Envío de formulario
    if (valido) {
      // Si todo está bien, aquí enviarías los datos a un backend
      console.log('Formulario enviado:', { nombre, correo, contenido });
      
      // Mostrar mensaje de éxito
      setExito(true);
      
      // Limpiar formulario
      setNombre('');
      setCorreo('');
      setContenido('');
    }
  };

  return (
    // 'noValidate' previene la validación HTML por defecto
    <form onSubmit={handleSubmit} noValidate>
      
      {/* Campo Nombre */}
      <div className="mb-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          required
          maxLength="100"
          className={`form-control ${errorNombre ? 'is-invalid' : ''}`}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {/* Muestra el error si existe */}
        {errorNombre && <div className="invalid-feedback">{errorNombre}</div>}
      </div>

      {/* Campo Correo */}
      <div className="mb-3">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          required
          maxLength="100"
          className={`form-control ${errorCorreo ? 'is-invalid' : ''}`}
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {errorCorreo && <div className="invalid-feedback">{errorCorreo}</div>}
      </div>

      {/* Campo Contenido */}
      <div className="mb-3">
        <textarea
          className={`form-control ${errorContenido ? 'is-invalid' : ''}`}
          name="contenido"
          rows="4"
          placeholder="Contenido"
          required
          maxLength="500"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        ></textarea>
        {errorContenido && <div className="invalid-feedback">{errorContenido}</div>}
      </div>

      {/* Botón de envío y Mensaje de Éxito */}
      <div className="text-center">
        <button type="submit" className="btn btn-danger">
          Enviar mensaje
        </button>
        
        {/* Mensaje de éxito condicional */}
        {exito && (
          <div className="alert alert-success mt-3" role="alert">
            ¡Mensaje enviado con éxito!
          </div>
        )}
      </div>
    </form>
  );
}