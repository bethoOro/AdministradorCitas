import Citas from './Citas.js';
import {ui} from './UI.js';

// Instanaciar   
const administrarCitas = new Citas();

// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const btnMenu = document.querySelector('#btn-menu')


//  UI
const formulario = document.querySelector('#nueva-cita');

let editando;



// Registrar eventos
eventListener();

function eventListener() {
    mascotaInput.addEventListener('input', datosCitas);
    propietarioInput.addEventListener('input', datosCitas);
    telefonoInput.addEventListener('input', datosCitas);
    fechaInput.addEventListener('input', datosCitas);
    horaInput.addEventListener('input', datosCitas);
    sintomasInput.addEventListener('input', datosCitas);

    formulario.addEventListener('submit', nuevaCita);
    btnMenu.addEventListener('click', mostrarMenu);

}

// Objeto con la información de la cita
const citaObje = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de cita
function datosCitas(e) {
    citaObje[e.target.name] = e.target.value;
}

// Valida y agrega una nuevo cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    // Extraer la información del objeto de cita
    const {
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas
    } = citaObje;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editando Correctamente');

        // Pasar el objeto de la cita a edición
        administrarCitas.editarCita( {...citaObje} );

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;
    } else {
        // // Generar un id único
        // citaObje.id = Date.now();
        // Creando  una nueva cita
        administrarCitas.agregarCita({
            ...citaObje
        });
        // Pasamos una capia del objeto, esto para que no se multiplequen las citas

        ui.imprimirAlerta( 'Se agregó correctamente' );
    }



    // Reiniciar el formulario
    formulario.reset();

    // Reinicar objeto
    reiniciarObj();

    // Mostrar HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObj() {
    citaObje.mascota = '';
    citaObje.propietario = '';
    citaObje.telefono = '';
    citaObje.fecha = '';
    citaObje.hora = '';
    citaObje.sintomas = '';
}

export function eliminarCita(id) {
    // Eliminar cita
    administrarCitas.eliminarCita(id);

    // Mandar mensaje
    ui.imprimirAlerta('Se elimino correctamente');

    // Actualizar citas
   administrarCitas.obtenerCitas(); 
}

export function editarCita(cita) {
    const {
        Nombre_Mascota,
        Propietario,
        Telefono,
        Sintomas,
        id_cita
    } = cita;

    const HoraCita = cita.HoraCita.slice(0,5);
    const FechaCita = cita.FechaCita.slice(0,10)

    mascotaInput.value = Nombre_Mascota;
    propietarioInput.value = Propietario;
    telefonoInput.value = Telefono;
    fechaInput.value = FechaCita;
    horaInput.value = HoraCita;
    sintomasInput.value = Sintomas;

    citaObje.mascota = Nombre_Mascota;
    citaObje.propietario = Propietario;
    citaObje.telefono = Telefono;
    citaObje.fecha = FechaCita;
    citaObje.hora = HoraCita;
    citaObje.sintomas = Sintomas;
    citaObje.id = id_cita;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}

function mostrarMenu(){
    document.querySelector('#cerrar-sesion').classList.toggle('animacion-cerrar-sesion')
    document.querySelector('#agregar-usuario').classList.toggle('animacion-agregar-usuario')
}

window.onload = () => {
    administrarCitas.obtenerCitas();
}