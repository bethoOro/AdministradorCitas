import {eliminarCita, editarCita} from './app.js';

// Clase para la interfaz
class UI {

    constructor() {
        this.contenedorCitas = document.querySelector('#citas');
    }

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
        if(document.querySelector('div.alert')) {
            document.querySelector('div.alert').remove();
        }

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
            // Quitar la alerta después de 4 segundos
            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
        
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
            this.contenedorCitas.appendChild(divCita);
        });

    }

    limpiarHTML() {
        while (this.contenedorCitas.firstChild) {
            this.contenedorCitas.removeChild(this.contenedorCitas.firstChild);
        }
    }
}


export const ui = new UI();