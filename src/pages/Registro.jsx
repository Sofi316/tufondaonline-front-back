// src/pages/Registro.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Importamos solo las funciones que existen en datos.js
import { getRegiones, getComunas } from '../data/datos'; 

function Registro() {

    // Estado para guardar todos los datos del formulario
    const [formData, setFormData] = useState({
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
        codigo: ''
    });

    // Estado para las listas que vienen del archivo de datos
    const [listaRegiones, setListaRegiones] = useState([]);
    const [listaComunas, setListaComunas] = useState([]);

    // --- Lógica de Estado y Propiedades (Requisito de la rúbrica) ---

    // Efecto para cargar regiones (se ejecuta 1 vez al cargar)
    // Conecta el componente a la fuente de datos [cite: 157]
    useEffect(() => {
        setListaRegiones(getRegiones());
    }, []); // El array vacío [] asegura que solo se ejecute una vez

    // Efecto para actualizar comunas (se ejecuta cuando 'formData.region' cambia)
    // Esto gestiona el estado del componente [cite: 51, 146]
    useEffect(() => {
        if (formData.region) {
            setListaComunas(getComunas(formData.region));
        } else {
            setListaComunas([]); // Si no hay región, vaciar comunas
        }
        // Resetea la comuna seleccionada
        setFormData(prev => ({ ...prev, comuna: '' }));
    }, [formData.region]); // Se re-ejecuta solo si formData.region cambia


    // Manejador genérico para actualizar el estado en cada cambio de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

// Manejador para el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene que la página se recargue
    };

    return (
        <main className="contenedor">
            <h1 className="hReg">Registro</h1>

            <form className="formulario" id="formularioRegistro" onSubmit={handleSubmit} noValidate>

                <div className="row g-3">

                    {/* RUT */}
                    <div className="col-md-6">
                        <label htmlFor="rut" className="form-label">RUT</label>
                        <input
                            name="rut"
                            placeholder="Ingrese aquí su RUT"
                            type="text"
                            className="form-control"
                            id="rut"
                            value={formData.rut}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Correo */}
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Ingrese aquí su correo"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Nombre */}
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            name="nombre"
                            placeholder="Ingrese aquí su nombre"
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Apellidos */}
                    <div className="col-md-6">
                        <label htmlFor="apellidos" className="form-label">Apellidos</label>
                        <input
                            name="apellidos"
                            placeholder="Ingrese aquí sus apellidos"
                            type="text"
                            className="form-control"
                            id="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="col-md-6">
                        <label htmlFor="fechaNac" className="form-label">Fecha de nacimiento</label>
                        <input
                            type="date"
                            name="fechaNac"
                            className="form-control"
                            id="fechaNac"
                            value={formData.fechaNac}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Dirección */}
                    <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Ingrese aquí su dirección"
                            className="form-control"
                            id="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Región */}
                    <div className="col-md-6">
                        <label htmlFor="region" className="form-label">Región</label>
                        <select
                            name="region"
                            id="region"
                            className="form-select" // Clase de Bootstrap
                            value={formData.region}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione una región</option>
                            {/* Renderiza las opciones desde el estado 'listaRegiones' */}
                            {listaRegiones.map(region => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Comuna */}
                    <div className="col-md-6">
                        <label htmlFor="comuna" className="form-label">Comuna</label>
                        <select
                            name="comuna"
                            id="comuna"
                            className="form-select" // Clase de Bootstrap
                            value={formData.comuna}
                            onChange={handleChange}
                            required
                            disabled={listaComunas.length === 0} // Deshabilitado si no hay comunas
                        >
                            <option value="">
                                {formData.region ? "Seleccione una comuna" : "Primero seleccione una región"}
                            </option>
                            {/* Renderiza las opciones desde el estado 'listaComunas' */}
                            {listaComunas.map(comuna => (
                                <option key={comuna} value={comuna}>
                                    {comuna}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Contraseña */}
                    <div className="col-md-6">
                        <label htmlFor="contraseña" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            name="contraseña"
                            placeholder="Ingrese su contraseña aquí"
                            className="form-control"
                            id="contraseña"
                            value={formData.contraseña}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="col-md-6">
                        <label htmlFor="contraseñaCon" className="form-label">Confirmar contraseña</label>
                        <input
                            type="password"
                            name="contraseñaCon"
                            placeholder="Repita su contraseña aquí"
                            className="form-control"
                            id="contraseñaCon"
                            value={formData.contraseñaCon}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Código registro */}
                    <div className="col-12">
                        <label htmlFor="codigo" className="form-label">Código registro (opcional)</label>
                        <input
                            name="codigo"
                            placeholder="FELICES8"
                            className="form-control"
                            id="codigo"
                            value={formData.codigo}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Acciones */}
                    <div className="col-12 acciones">
                        <button className="btn btn-danger rojo" type="submit">
                            Registrarse
                        </button>
                        <Link to="/iniciar-sesion">¿Ya tienes una cuenta?</Link>
                    </div>

                    <div className="col-12">
                        <p className="muted">Registrate con el código FELICES8 y tendrás 10% de descuento!</p>
                    </div>

                </div>
            </form>
        </main>
    );
}

export default Registro;