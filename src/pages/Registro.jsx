// src/pages/Registro.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap'; // Usaremos Alert de react-bootstrap
// Importa funciones de tus archivos de datos (asegúrate que las rutas sean correctas)
import { getRegiones, getComunas } from '../data/datos.js';
import { createUsuario } from '../data/usersData.js';

// --- Funciones de Validación (fuera del componente) ---
function validarRUT(rut) {
    if (!rut) return false;
    // Limpia el RUT (quita puntos y guion) y convierte a mayúsculas
    rut = rut.replace(/[.-]/g, '').toUpperCase();
    // Expresión regular para validar formato XXXXXXXX-X (donde X es número o K)
    return /^[0-9]{7,8}[0-9K]$/.test(rut);
}

function calcularEdad(fechaNac) {
    if (!fechaNac) return 0; // Si no hay fecha, devuelve 0
    const nacimiento = new Date(fechaNac);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Diferencia de años
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Diferencia de meses
    // Ajusta la edad si aún no cumple años este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}
// --- Fin Funciones de Validación ---


// --- Componente Principal ---
function Registro() {

    // Define el estado inicial del formulario
    const initialState = {
        rut: '',
        email: '',
        nombre: '',
        apellidos: '',
        fechaNac: '',
        direccion: '',
        region: '',
        comuna: '',
        contraseña: '', // Asegúrate que createUsuario espere 'contraseña'
        contraseñaCon: '',
        codigo: '',
        tipo: 'cliente' // Añadido: Asigna rol por defecto (ajusta si es necesario)
    };

    // --- Declaración de Estados ---
    // Solo UNA declaración de formData
    const [formData, setFormData] = useState(initialState);
    const [listaRegiones, setListaRegiones] = useState([]);
    const [listaComunas, setListaComunas] = useState([]);
    const [mensaje, setMensaje] = useState(""); // Para mensajes de éxito/error
    const [tipoMensaje, setTipoMensaje] = useState("success"); // 'success' o 'danger'
    const navigate = useNavigate(); // Hook para redirigir
    // ----------------------------

    // --- Efectos ---
    // Carga las regiones al inicio
    useEffect(() => {
        setListaRegiones(getRegiones());
    }, []); // Array vacío = solo se ejecuta una vez

    // Carga las comunas cuando cambia la región seleccionada
    useEffect(() => {
        if (formData.region) { // Si hay una región seleccionada...
            setListaComunas(getComunas(formData.region)); // ...carga sus comunas
        } else {
            setListaComunas([]); // Si no, vacía la lista de comunas
        }
        // Resetea la comuna seleccionada cada vez que cambia la región
        setFormData(prev => ({ ...prev, comuna: '' }));
    }, [formData.region]); // Se ejecuta cada vez que formData.region cambia
    // -------------

    // Maneja los cambios en cualquier input del formulario
    const handleChange = (e) => {
        setMensaje(""); // Limpia mensajes al empezar a escribir
        const { name, value } = e.target; // Obtiene el nombre y valor del input que cambió
        // Actualiza el estado 'formData' con el nuevo valor
        setFormData(prevData => ({
            ...prevData, // Mantiene los valores anteriores
            [name]: value // Actualiza solo el campo que cambió
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setMensaje(""); // Limpia mensajes previos
        let descuentos = []; // Array para guardar mensajes de beneficios

        // Desestructura formData para facilitar el acceso a los valores
        const { rut, email, nombre, apellidos, fechaNac, direccion, contraseña, contraseñaCon, region, comuna, codigo } = formData;

        // --- VALIDACIONES ---
        if (!rut || !validarRUT(rut)) {
            setTipoMensaje("danger"); setMensaje("El RUT es requerido y debe ser válido (ej: 12345678-K)"); return;
        }
        // Valida formato de correo y dominios permitidos
        if (!email || !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email)) {
            setTipoMensaje("danger"); setMensaje("Correo requerido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com"); return;
        }
        // Aplica beneficio si es de Duoc
        if (email.endsWith('@duoc.cl')) { descuentos.push("¡Choripan gratis en tu cumpleaños por ser estudiante Duoc!"); } // Mensaje actualizado
        if (!nombre || nombre.length > 50) {
            setTipoMensaje("danger"); setMensaje("Nombre requerido (máx. 50 caracteres)"); return;
        }
        if (!apellidos || apellidos.length > 100) {
            setTipoMensaje("danger"); setMensaje("Apellidos requeridos (máx. 100 caracteres)"); return;
        }
        if (!fechaNac) {
            setTipoMensaje("danger"); setMensaje("Fecha de nacimiento requerida"); return;
        } else { // Calcula edad y aplica beneficio si corresponde
            const edad = calcularEdad(fechaNac);
            if (edad < 18) { // Validación de edad mínima
               setTipoMensaje("danger"); setMensaje("Debes ser mayor de 18 años para registrarte."); return;
            }
            if (edad >= 50) { descuentos.push("¡Tienes 50% de descuento por ser mayor de 50 años!"); } // Mensaje actualizado
        }
        if (!direccion || direccion.length > 300) {
            setTipoMensaje("danger"); setMensaje("Dirección requerida (máx. 300 caracteres)"); return;
        }
        if (!region || !comuna) { // Asegura que se seleccionen ambos
            setTipoMensaje("danger"); setMensaje("Debes seleccionar una Región y Comuna"); return;
        }
        // Valida largo de contraseña
        if (!contraseña || contraseña.length < 4 || contraseña.length > 10) {
            setTipoMensaje("danger"); setMensaje("Contraseña requerida (debe tener entre 4 y 10 caracteres)"); return;
        }
        // Valida que las contraseñas coincidan
        if (contraseña !== contraseñaCon) {
            setTipoMensaje("danger"); setMensaje("Error: Las contraseñas no coinciden."); return;
        }
        // Aplica beneficio por código
        if (codigo === "FELICES8") { descuentos.push("¡Tienes 10% de descuento por usar el código FELICES18!"); } // Mensaje y código actualizados
        // --- FIN VALIDACIONES ---

        // Si todas las validaciones pasan...
        try {
            // Llama a la función de usersData para crear el usuario
            // Asegúrate que createUsuario espere un objeto con las propiedades correctas
            // (nombre, apellidos, email, contraseña, tipo/role, rut, region, comuna, fechaNac, direccion)
            createUsuario({ ...formData, tipo: 'cliente' }); // Pasamos 'cliente' como tipo por defecto

            // Prepara mensaje de éxito
            let mensajeExito = '¡Registro exitoso!';
            if (descuentos.length > 0) { // Si hay beneficios, los añade al mensaje
                mensajeExito += '\n\nBeneficios aplicados:\n- ' + descuentos.join('\n- ');
            }
            setTipoMensaje("success"); // Tipo de alerta: éxito
            setMensaje(mensajeExito); // Muestra el mensaje

            // Limpia el formulario volviendo al estado inicial
            setFormData(initialState);

            // Redirige a la página de inicio de sesión después de 2 segundos
            setTimeout(() => {
                navigate('/iniciarSesion');
            }, 2000); // 2000 milisegundos = 2 segundos

        } catch (error) { // Si createUsuario lanza un error (ej. email duplicado)...
            setTipoMensaje("danger"); // Tipo de alerta: error
            // Muestra el mensaje de error (ej. "El correo ya está registrado")
            setMensaje("Error al registrar el usuario: " + error.message);
            console.error("Error en createUsuario:", error); // Muestra el error en consola
        }
    };

    // --- Renderización del JSX (la parte visual) ---
    return (
        <main className="contenedor my-4"> {/* Añadido margen vertical */}
            <h1 className="hReg text-center mb-4">Registro de Usuario</h1> {/* Centrado y con margen */}

            {/* Muestra el Alert de Bootstrap si 'mensaje' tiene contenido */}
            {mensaje && (
              <Alert
                variant={tipoMensaje} // Color del alert (success o danger)
                onClose={() => setMensaje("")} // Permite cerrar el alert
                dismissible // Muestra el botón 'x' para cerrar
                // Estilo para que respete los saltos de línea (\n) en el mensaje de beneficios
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {mensaje}
              </Alert>
            )}

            {/* Formulario con clases de Bootstrap para layout */}
            <form className="formulario" id="formularioRegistro" onSubmit={handleSubmit} noValidate>
                {/* Usa row y col-* de Bootstrap para organizar los campos */}
                <div className="row g-3"> {/* g-3 añade espacio entre columnas */}

                    {/* Campo RUT */}
                    <div className="col-md-6">
                        <label htmlFor="rut" className="form-label">RUT</label>
                        <input name="rut" placeholder="Ej: 12345678-K" type="text" className="form-control" id="rut" value={formData.rut} onChange={handleChange} required />
                    </div>
                    {/* Campo Correo */}
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input type="email" name="email" placeholder="tu@ejemplo.com" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    {/* Campo Nombre */}
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input name="nombre" placeholder="Ingresa tu nombre" type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleChange} required maxLength="50"/>
                    </div>
                    {/* Campo Apellidos */}
                    <div className="col-md-6">
                        <label htmlFor="apellidos" className="form-label">Apellidos</label>
                        <input name="apellidos" placeholder="Ingresa tus apellidos" type="text" className="form-control" id="apellidos" value={formData.apellidos} onChange={handleChange} required maxLength="100"/>
                    </div>
                    {/* Campo Fecha de nacimiento */}
                    <div className="col-md-6">
                        <label htmlFor="fechaNac" className="form-label">Fecha de nacimiento</label>
                        <input type="date" name="fechaNac" className="form-control" id="fechaNac" value={formData.fechaNac} onChange={handleChange} required />
                    </div>
                    {/* Campo Dirección */}
                    <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input type="text" name="direccion" placeholder="Ej: Av. Siempreviva 123" className="form-control" id="direccion" value={formData.direccion} onChange={handleChange} required maxLength="300"/>
                    </div>
                    {/* Campo Región */}
                    <div className="col-md-6">
                        <label htmlFor="region" className="form-label">Región</label>
                        <select name="region" id="region" className="form-select" value={formData.region} onChange={handleChange} required>
                            <option value="">Seleccione una región</option>
                            {/* Mapea las regiones cargadas en el estado */}
                            {listaRegiones.map(region => (<option key={region} value={region}>{region}</option>))}
                        </select>
                    </div>
                    {/* Campo Comuna */}
                    <div className="col-md-6">
                        <label htmlFor="comuna" className="form-label">Comuna</label>
                        <select name="comuna" id="comuna" className="form-select" value={formData.comuna} onChange={handleChange} disabled={listaComunas.length === 0} required>
                            <option value="">{formData.region ? "Seleccione una comuna" : "Seleccione una región primero"}</option>
                            {/* Mapea las comunas cargadas (depende de la región) */}
                            {listaComunas.map(comuna => (<option key={comuna} value={comuna}>{comuna}</option>))}
                        </select>
                    </div>
                    {/* Campo Contraseña */}
                    <div className="col-md-6">
                        <label htmlFor="contraseña" className="form-label">Contraseña</label>
                        <input type="password" name="contraseña" placeholder="Entre 4 y 10 caracteres" className="form-control" id="contraseña" value={formData.contraseña} onChange={handleChange} required minLength="4" maxLength="10"/>
                    </div>
                    {/* Campo Confirmar contraseña */}
                    <div className="col-md-6">
                        <label htmlFor="contraseñaCon" className="form-label">Confirmar contraseña</label>
                        <input type="password" name="contraseñaCon" placeholder="Repita su contraseña" className="form-control" id="contraseñaCon" value={formData.contraseñaCon} onChange={handleChange} required />
                    </div>
                    {/* Campo Código registro */}
                    <div className="col-12">
                        <label htmlFor="codigo" className="form-label">Código registro (opcional)</label>
                        <input name="codigo" placeholder="Ej: FELICES8" className="form-control" id="codigo" value={formData.codigo} onChange={handleChange} />
                    </div>
                    {/* Acciones: Botón Registrarse y enlace a Iniciar Sesión */}
                    <div className="col-12 d-flex align-items-center gap-3 mt-3"> {/* Flex para alinear botón y link */}
                        <button className="btn btn-danger" type="submit"> {/* Usando btn-danger de Bootstrap */}
                            Registrarse
                        </button>
                        <Link to="/iniciarSesion">¿Ya tienes una cuenta?</Link>
                    </div>
                    {/* Texto informativo sobre el código */}
                    <div className="col-12 mt-2">
                        <p className="text-muted small"> {/* text-muted y small para estilo */}
                            Regístrate con el código FELICES8 y tendrás 10% de descuento en tu próxima compra! {/* Mensaje actualizado */}
                        </p>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default Registro; // Exporta el componente