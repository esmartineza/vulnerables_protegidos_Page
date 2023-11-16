import { OpenStreetMapProvider } from "leaflet-geosearch";
import asis from './asis';
const lat = -33.750466;
const lng = -70.902093;
const map = L.map('map').setView([lat, lng], 12);

let marker;

document.addEventListener('DOMContentLoaded', () => {

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
    .bindPopup('Dirección Establecida.')
    .openPopup();
    const buscador = document.querySelector('#formbuscador');
    buscador.addEventListener('input', buscarDireccion);
})

function buscarDireccion(e){

    if(e.target.value.length > 8) {

        const provider = new OpenStreetMapProvider();
        provider.search({ query: e.target.value }).then(( resultado ) => {
          map.setView(resultado[0].bounds[0], 15); 
          marker = new L.marker(resultado[0].bounds[0], {
            draggable : true,
            autoPan: true
          })
          .addTo(map)
        })
    }
}



