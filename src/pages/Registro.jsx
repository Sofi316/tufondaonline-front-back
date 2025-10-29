 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';  
 
import { getRegiones, getComunas } from '../data/datos.js';
import { createUsuario } from '../data/usersData.js';

 
function validarRUT(rut) {
    if (!rut) return false;
     
    rut = rut.replace(/[.-]/g, '').toUpperCase();
     
    return /^[0-9]{7,8}[0-9K]$/.test(rut);
}

function calcularEdad(fechaNac) {
    if (!fechaNac) return 0;  
    const nacimiento = new Date(fechaNac);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();  
    const mes = hoy.getMonth() - nacimiento.getMonth();  
     
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}
 


 
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
        const { name, value } = e.target;  
         
        setFormData(prevData => ({
            ...prevData,  
            [name]: value  
        }));
    };

     
    const handleSubmit = (e) => {
        e.preventDefault();  
        setMensaje("");  
        let descuentos = [];  

         
        const { rut, email, nombre, apellidos, fechaNac, direccion, contraseña, contraseñaCon, region, comuna, codigo } = formData;

         
        if (!rut || !validarRUT(rut)) {
            setTipoMensaje("danger"); setMensaje("El RUT es requerido y debe ser válido (ej: 12345678-K)"); return;
        }
         
        if (!email || !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email)) {
            setTipoMensaje("danger"); setMensaje("Correo requerido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com"); return;
        }
         
        if (email.endsWith('@duoc.cl')) { descuentos.push("¡Choripan gratis en tu cumpleaños por ser estudiante Duoc!"); } 
        if (!nombre || nombre.length > 50) {
            setTipoMensaje("danger"); setMensaje("Nombre requerido (máx. 50 caracteres)"); return;
        }
        if (!apellidos || apellidos.length > 100) {
            setTipoMensaje("danger"); setMensaje("Apellidos requeridos (máx. 100 caracteres)"); return;
        }
        if (!fechaNac) {
            setTipoMensaje("danger"); setMensaje("Fecha de nacimiento requerida"); return;
        } else {  
            const edad = calcularEdad(fechaNac);
            if (edad < 18) { 
               setTipoMensaje("danger"); setMensaje("Debes ser mayor de 18 años para registrarte."); return;
            }
            if (edad >= 50) { descuentos.push("¡Tienes 50% de descuento por ser mayor de 50 años!"); }
        }
        if (!direccion || direccion.length > 300) {
            setTipoMensaje("danger"); setMensaje("Dirección requerida (máx. 300 caracteres)"); return;
        }
        if (!region || !comuna) {
            setTipoMensaje("danger"); setMensaje("Debes seleccionar una Región y Comuna"); return;
        }
        if (!contraseña || contraseña.length < 4 || contraseña.length > 10) {
            setTipoMensaje("danger"); setMensaje("Contraseña requerida (debe tener entre 4 y 10 caracteres)"); return;
        }
        if (contraseña !== contraseñaCon) {
            setTipoMensaje("danger"); setMensaje("Error: Las contraseñas no coinciden."); return;
        }
        if (codigo === "FELICES8") { descuentos.push("¡Tienes 10% de descuento por usar el código FELICES18!"); }

        try {
           
            createUsuario({ ...formData, tipo: 'cliente' }); 

            let mensajeExito = '¡Registro exitoso!';
            if (descuentos.length > 0) {
                mensajeExito += '\n\nBeneficios aplicados:\n- ' + descuentos.join('\n- ');
            }
            setTipoMensaje("success"); 
            setMensaje(mensajeExito); 

            setFormData(initialState);

           
            setTimeout(() => {
                navigate('/iniciarSesion');
            }, 2000);

        } catch (error) { 
            setTipoMensaje("danger"); 
           
            setMensaje("Error al registrar el usuario: " + error.message);
            console.error("Error en createUsuario:", error);
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
                        <input name="nombre" placeholder="Ingresa tu nombre" type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleChange} required maxLength="50"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="apellidos" className="form-label">Apellidos</label>
                        <input name="apellidos" placeholder="Ingresa tus apellidos" type="text" className="form-control" id="apellidos" value={formData.apellidos} onChange={handleChange} required maxLength="100"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fechaNac" className="form-label">Fecha de nacimiento</label>
                        <input type="date" name="fechaNac" className="form-control" id="fechaNac" value={formData.fechaNac} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input type="text" name="direccion" placeholder="Ej: Av. Siempreviva 123" className="form-control" id="direccion" value={formData.direccion} onChange={handleChange} required maxLength="300"/>
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
                        <input type="password" name="contraseña" placeholder="Entre 4 y 10 caracteres" className="form-control" id="contraseña" value={formData.contraseña} onChange={handleChange} required minLength="4" maxLength="10"/>
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
                        <button className="btn btn-danger" type="submit">
                        </button>
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