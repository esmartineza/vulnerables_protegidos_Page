import axios from 'axios';
import { asistenciaconfir } from '../../controllers/front/pageController';

document.addEveentListener('DOMContentLoaded', () => {
    const asis = document.querySelector('#asistencia-confirmada');
    if(asis){
        asis.addEventListener('submit', asistenciaconfir);
    }
});
function asistenciaconfir(e){
    e.preventDefault();

    axios.post(this.action)
    .then(respuesta )
}