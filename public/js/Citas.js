import {ui} from './UI.js';


export default class Citas {

    async agregarCita(cita) {
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