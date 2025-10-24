// src/pages/Registro.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap'; 
import { getRegiones, getComunas } from '../data/datos.js'; 

// --- FUNCIONES HELPER DE TU formulario.js ---
// (Las ponemos fuera del componente para que no se redeclaren)
function validarRUT(rut) {
    rut = rut.replace(/[.-]/g, '').toUpperCase();
    return /^[0-9]{7,8}[0-9K]$/.test(rut);
}

function calcularEdad(fechaNac) {
    const nacimiento = new Date(fechaNac);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}
// --- FIN FUNCIONES HELPER ---


function Registro() {

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

    const [listaRegiones, setListaRegiones] = useState([]);
    const [listaComunas, setListaComunas] = useState([]);
    const [mensaje, setMensaje] = useState(""); 
    const [tipoMensaje, setTipoMensaje] = useState("success");

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
        setMensaje(""); // Limpia el mensaje de error/éxito al empezar a escribir
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // --- MANEJADOR ACTUALIZADO CON VALIDACIONES DE formulario.js ---
    const handleSubmit = (e) => {
        e.preventDefault(); 
        setMensaje(""); 
        let descuentos = []; // Array para los beneficios

        // --- INICIO DE VALIDACIONES ---
        const { rut, email, nombre, apellidos, fechaNac, direccion, contraseña, contraseñaCon, region, comuna, codigo } = formData;
        
        // 1. RUT
        if (!rut || !validarRUT(rut)) {
            setTipoMensaje("danger");
            setMensaje("El RUT es requerido y debe ser válido (ej: 12345678-K)");
            return;
        }
        
        // 2. Email
        if (!email || !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email)) {
            setTipoMensaje("danger");
            setMensaje("Correo requerido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }
        if (email.endsWith('@duoc.cl')) {
            descuentos.push("Tortas gratis en tu cumpleaños por ser estudiante Duoc");
        }

        // 3. Nombre
        if (!nombre || nombre.length > 50) {
            setTipoMensaje("danger");
            setMensaje("Nombre requerido (máx. 50 caracteres)");
            return;
        }
        
        // 4. Apellidos
        if (!apellidos || apellidos.length > 100) {
            setTipoMensaje("danger");
            setMensaje("Apellidos requeridos (máx. 100 caracteres)");
            return;
        }

        // 5. Fecha de nacimiento
        if (!fechaNac) {
            setTipoMensaje("danger");
            setMensaje("Fecha de nacimiento requerida");
            return;
        } else {
            const edad = calcularEdad(fechaNac);
            if (edad >= 50) {
                descuentos.push("50% de descuento por ser mayor de 50 años");
            }
        }

        // 6. Dirección
        if (!direccion || direccion.length > 300) {
            setTipoMensaje("danger");
            setMensaje("Dirección requerida (máx. 300 caracteres)");
            return;
        }

        // 7. Región y Comuna (Validación extra, tu JS no la tenía pero es buena)
        if (!region || !comuna) {
            setTipoMensaje("danger");
            setMensaje("Debe seleccionar una Región y Comuna");
            return;
        }

        // 8. Contraseña
        if (!contraseña || contraseña.length < 4 || contraseña.length > 10) {
            setTipoMensaje("danger");
            setMensaje("Contraseña requerida (debe tener entre 4 y 10 caracteres)");
            return;
        }

        // 9. Confirmar Contraseña
        if (contraseña !== contraseñaCon) {
            setTipoMensaje("danger");
            setMensaje("Error: Las contraseñas no coinciden.");
            return;
        }

        // 10. Código descuento
        if (codigo === "FELICES8") {
            descuentos.push("10% de descuento por código FELICES8");
        }
        
        // --- FIN DE VALIDACIONES ---

        // Si todo está bien:
        console.log("Datos del formulario validados:", formData);
        
        let mensajeExito = '¡Registro exitoso!';
        if (descuentos.length > 0) {
            // Preparamos el mensaje con saltos de línea
            mensajeExito += '\n\nBeneficios aplicados:\n- ' + descuentos.join('\n- ');
        }
        
        setTipoMensaje("success"); 
        setMensaje(mensajeExito);
        
        // (Aquí llamarías a 'createUsuario' del servicio)
    };

    // --- Renderización ---
    return (
        <main className="contenedor">
            <h1 className="hReg">Registro</h1>

            {/* Renderiza el Alert (solo si 'mensaje' tiene texto) */}
            {mensaje && (
              <Alert 
                variant={tipoMensaje} 
                onClose={() => setMensaje("")}
                dismissible
                // Agregamos este estilo para que respete los saltos de línea \n
                style={{ whiteSpace: 'pre-wrap' }} 
              >
                {mensaje}
              </Alert>
            )}

            <form className="formulario" id="formularioRegistro" onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                    {/* ... (Tus campos <input> y <select> van aquí sin cambios) ... */}
                    
                    {/* RUT */}
                    <div className="col-md-6">
                        <label htmlFor="rut" className="form-label">RUT</label>
                        <input name="rut" placeholder="Ingrese aquí su RUT" type="text" className="form-control" id="rut" value={formData.rut} onChange={handleChange} />
                    </div>
                    {/* Correo */}
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input type="email" name="email" placeholder="Ingrese aquí su correo" className="form-control" id="email" value={formData.email} onChange={handleChange} />
                    </div>
                    {/* Nombre */}
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input name="nombre" placeholder="Ingrese aquí su nombre" type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleChange} />
                    </div>
                    {/* Apellidos */}
                    <div className="col-md-6">
                        <label htmlFor="apellidos" className="form-label">Apellidos</label>
                        <input name="apellidos" placeholder="Ingrese aquí sus apellidos" type="text" className="form-control" id="apellidos" value={formData.apellidos} onChange={handleChange} />
                    </div>
                    {/* Fecha de nacimiento */}
                    <div className="col-md-6">
                        <label htmlFor="fechaNac" className="form-label">Fecha de nacimiento</label>
                        <input type="date" name="fechaNac" className="form-control" id="fechaNac" value={formData.fechaNac} onChange={handleChange} />
                    </div>
                    {/* Dirección */}
                    <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input type="text" name="direccion" placeholder="Ingrese aquí su dirección" className="form-control" id="direccion" value={formData.direccion} onChange={handleChange} />
                    </div>
                    {/* Región */}
                    <div className="col-md-6">
                        <label htmlFor="region" className="form-label">Región</label>
                        <select name="region" id="region" className="form-select" value={formData.region} onChange={handleChange} >
                            <option value="">Seleccione una región</option>
                            {listaRegiones.map(region => (<option key={region} value={region}>{region}</option>))}
                        </select>
                    </div>
                    {/* Comuna */}
                    <div className="col-md-6">
                        <label htmlFor="comuna" className="form-label">Comuna</label>
                        <select name="comuna" id="comuna" className="form-select" value={formData.comuna} onChange={handleChange} disabled={listaComunas.length === 0}>
                            <option value="">{formData.region ? "Seleccione una comuna" : "Primero seleccione una región"}</option>
                            {listaComunas.map(comuna => (<option key={comuna} value={comuna}>{comuna}</option>))}
                        </select>
                    </div>
                    {/* Contraseña */}
                    <div className="col-md-6">
                        <label htmlFor="contraseña" className="form-label">Contraseña</label>
                        <input type="password" name="contraseña" placeholder="Ingrese su contraseña aquí" className="form-control" id="contraseña" value={formData.contraseña} onChange={handleChange} />
                    </div>
                    {/* Confirmar contraseña */}
                    <div className="col-md-6">
                        <label htmlFor="contraseñaCon" className="form-label">Confirmar contraseña</label>
                        <input type="password" name="contraseñaCon" placeholder="Repita su contraseña aquí" className="form-control" id="contraseñaCon" value={formData.contraseñaCon} onChange={handleChange} />
                    </div>
                    {/* Código registro */}
                    <div className="col-12">
                        <label htmlFor="codigo" className="form-label">Código registro (opcional)</label>
                        <input name="codigo" placeholder="FELICES8" className="form-control" id="codigo" value={formData.codigo} onChange={handleChange} />
                    </div>
                    {/* Acciones */}
                    <div className="col-12 acciones">
                        <button className="btn btn-danger rojo" type="submit">Registrarse</button>
                        <Link to="/iniciarSesion">¿Ya tienes una cuenta?</Link>
                    </div>
                    <div className="col-12"><p className="muted">Registrate con el código FELICES8 y tendrás 10% de descuento!</p></div>
                </div>
            </form>
        </main>
    );
}

export default Registro;