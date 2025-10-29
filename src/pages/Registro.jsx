import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';  
import '../utils/Registro.logic.js'; 
import { getRegiones, getComunas } from '../data/datos.js';
import { createUsuario } from '../data/usersData.js';

function Registro() {

  const initialState = {
    rut: '',
    email: '',
    nombre: '',
    apellidos: '',
    fechaNac: '',
    direccion: '',
    region: '',
    comuna: '',
    contraseña: '',  
    contraseñaCon: '',
    codigo: '',
    tipo: 'cliente'  
  };

  const [formData, setFormData] = useState(initialState);
  const [listaRegiones, setListaRegiones] = useState([]);
  const [listaComunas, setListaComunas] = useState([]);
  const [mensaje, setMensaje] = useState("");  
  const [tipoMensaje, setTipoMensaje] = useState("success");  
  const navigate = useNavigate();  

  useEffect(() => {
    setListaRegiones(getRegiones());
  }, []);  

  useEffect(() => {
    if (formData.region) {
      setListaComunas(getComunas(formData.region));
    } else {
      setListaComunas([]);
    }
    setFormData(prev => ({ ...prev, comuna: '' }));
  }, [formData.region]);  

  
  const handleChange = (e) => {
    setMensaje(""); 
    const resultado = window.RegistroLogic.handleChange(formData, e);
    setFormData(resultado);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = window.RegistroLogic.validarFormulario(formData);

    if (!resultado.ok) {
      setTipoMensaje(resultado.tipo);
      setMensaje(resultado.mensaje);
      return;
    }

    try {
      createUsuario({ ...formData, tipo: 'cliente' });
      setTipoMensaje("success");
      setMensaje("¡Registro exitoso!");
      setFormData(initialState);
      setTimeout(() => navigate('/iniciarSesion'), 2000);
    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al registrar el usuario: " + error.message);
    }
  };

  return (
    <main className="contenedor my-4">
      <h1 className="hReg text-center mb-4">Registro de Usuario</h1> 

      {mensaje && (
        <Alert
          variant={tipoMensaje} 
          onClose={() => setMensaje("")} 
          dismissible 
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {mensaje}
        </Alert>
      )}

      <form className="formulario" id="formularioRegistro" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">

          <div className="col-md-6">
            <label htmlFor="rut" className="form-label">RUT</label>
            <input name="rut" placeholder="Ej: 12345678-K" type="text" className="form-control" id="rut" value={formData.rut} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Correo</label>
            <input type="email" name="email" placeholder="tu@ejemplo.com" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input name="nombre" placeholder="Ingresa tu nombre" type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleChange} required maxLength="50" />
          </div>

          <div className="col-md-6">
            <label htmlFor="apellidos" className="form-label">Apellidos</label>
            <input name="apellidos" placeholder="Ingresa tus apellidos" type="text" className="form-control" id="apellidos" value={formData.apellidos} onChange={handleChange} required maxLength="100" />
          </div>

          <div className="col-md-6">
            <label htmlFor="fechaNac" className="form-label">Fecha de nacimiento</label>
            <input type="date" name="fechaNac" className="form-control" id="fechaNac" value={formData.fechaNac} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <input type="text" name="direccion" placeholder="Ej: Av. Siempreviva 123" className="form-control" id="direccion" value={formData.direccion} onChange={handleChange} required maxLength="300" />
          </div>

          <div className="col-md-6">
            <label htmlFor="region" className="form-label">Región</label>
            <select name="region" id="region" className="form-select" value={formData.region} onChange={handleChange} required>
              <option value="">Seleccione una región</option>
              {listaRegiones.map(region => (<option key={region} value={region}>{region}</option>))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="comuna" className="form-label">Comuna</label>
            <select name="comuna" id="comuna" className="form-select" value={formData.comuna} onChange={handleChange} disabled={listaComunas.length === 0} required>
              <option value="">{formData.region ? "Seleccione una comuna" : "Seleccione una región primero"}</option>
              {listaComunas.map(comuna => (<option key={comuna} value={comuna}>{comuna}</option>))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="contraseña" className="form-label">Contraseña</label>
            <input type="password" name="contraseña" placeholder="Entre 4 y 10 caracteres" className="form-control" id="contraseña" value={formData.contraseña} onChange={handleChange} required minLength="4" maxLength="10" />
          </div>

          <div className="col-md-6">
            <label htmlFor="contraseñaCon" className="form-label">Confirmar contraseña</label>
            <input type="password" name="contraseñaCon" placeholder="Repita su contraseña" className="form-control" id="contraseñaCon" value={formData.contraseñaCon} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label htmlFor="codigo" className="form-label">Código registro (opcional)</label>
            <input name="codigo" placeholder="Ej: FELICES8" className="form-control" id="codigo" value={formData.codigo} onChange={handleChange} />
          </div>

          <div className="col-12 d-flex align-items-center gap-3 mt-3">
            <button className="btn btn-danger" type="submit">Registrar</button>
            <Link to="/iniciarSesion">¿Ya tienes una cuenta?</Link>
          </div>

          <div className="col-12 mt-2">
            <p className="text-muted small">
              Regístrate con el código FELICES8 y tendrás 10% de descuento en tu próxima compra!
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Registro;
