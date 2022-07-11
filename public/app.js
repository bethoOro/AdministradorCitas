
// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

class Citas {
    // constructor() {
    //     this.citas = [];
    // }

    async agregarCita(cita) {
        // this.citas = [...this.citas, cita];
        this.enviarInformacion({...cita});
        this.obtenerCitas();
    }

    eliminarCita(id) {
        try {
            const url = 'http://localhost:3000/deletecitas';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default'
            })
            
        } catch (error) {
            console.log('Hubo un error')
        }
    }

    async editarCita( citaActualizada ) {
        // this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
        try {
            const url = 'http://localhost:3000/updatecita';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(citaActualizada),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default'
            });
            const result = await respuesta.json();
            this.obtenerCitas()
            
        } catch (error) {
            console.log('Hubo un error')
        }
    }

    async enviarInformacion(cita) {
        const url = 'http://localhost:3000/newCita';
        try {
            const repuesta = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(cita), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default'
              });
              const resultado = await repuesta.json()
              
              
        } catch {
            console.log('Error')
        }
    }
    
    obtenerCitas() {
        const url = 'http://localhost:3000/citas';
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(result => {
            ui.imprimirCitas(result)
        })
        .catch('Hubo un erro')    
    }
}

// Clase para la interfaz
class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta después de 4 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 1000);
    }

    
    imprimirCitas(arrayCitas) {

       
        this.limpiarHTML();
        
        Array.from(arrayCitas).forEach(cita => {

            const mascota = cita.Nombre_Mascota;
            const propietario = cita.Propietario;
            const telefono = cita.Telefono;
            const antFecha = cita.FechaCita.split('T');
            const fecha = antFecha[0];
            const hora = cita.HoraCita;
            const sintomas = cita.Sintomas;
            const id = cita.id_cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la citas
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card.title', 'font-wight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder" >Propietarios: </span> ${propietario}
            `;
            const telefonParrafo = document.createElement('p');
            telefonParrafo.innerHTML = `
                <span class="font-weight-bolder" >Télefono: </span> ${telefono}
            `;
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder" >Fecha: </span> ${fecha}
            `;
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder" >Hora: </span> ${hora}
            `;
            const sintamasParrafo = document.createElement('p');
            sintamasParrafo.innerHTML = `
                <span class="font-weight-bolder" >Sintomas: </span> ${sintomas}
            `;

            // Boton para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar';

            btnEliminar.onclick = () => {
                eliminarCita(id);
            }

            // Boton para editar cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info', 'mr-2');
            btnEditar.innerHTML = 'Editar';

            btnEditar.onclick = () => {
                editarCita(cita);
            }

            // Agregar los parrafor al divCitas
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintamasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agregar las citas HTML
            contenedorCitas.appendChild(divCita);
        });

    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}


//  UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

// Instanaciar 
const ui = new UI();
const administrarCitas = new Citas();

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

function eliminarCita(id) {
    // Eliminar cita
    administrarCitas.eliminarCita(id);

    // Mandar mensaje
    ui.imprimirAlerta('Se elimino correctamente');

    // Actualizar citas
   administrarCitas.obtenerCitas(); 
}

function editarCita(cita) {
    const {
        Nombre_Mascota,
        Propietario,
        Telefono,
        Sintomas,
        id_cita
    } = cita;

    const HoraCita = cita.HoraCita.slice(0,5);
    const FechaCita = cita.FechaCita.slice(0,10)

    console.log(HoraCita)
    console.log(FechaCita)
    

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

window.onload = () => {
    administrarCitas.obtenerCitas();
}