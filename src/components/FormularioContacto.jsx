import React, { useState } from 'react';

export default function FormularioContacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contenido, setContenido] = useState('');

  const [errorNombre, setErrorNombre] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorContenido, setErrorContenido] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setExito(false);

    let valido = true;

    if (nombre.trim() === '' || nombre.length > 100) {
      setErrorNombre('El nombre es requerido (máx. 100 caracteres).');
      valido = false;
    } else {
      setErrorNombre('');
    }

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!regexCorreo.test(correo) || correo.length > 100) {
      setErrorCorreo('Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).');
      valido = false;
    } else {
      setErrorCorreo('');
    }

    if (contenido.trim() === '' || contenido.length > 500) {
      setErrorContenido('El comentario es requerido (máx. 500 caracteres).');
      valido = false;
    } else {
      setErrorContenido('');
    }

    if (valido) {
      console.log('Formulario enviado:', { nombre, correo, contenido });
      setExito(true);
      setNombre('');
      setCorreo('');
      setContenido('');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
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
        {errorNombre && <div className="invalid-feedback">{errorNombre}</div>}
      </div>

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

      <div className="text-center">
        <button type="submit" className="btn btn-danger">
          Enviar mensaje
        </button>
        {exito && (
          <div className="alert alert-success mt-3" role="alert">
            ¡Mensaje enviado con éxito!
          </div>
        )}
      </div>
    </form>
  );
}