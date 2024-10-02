// Opciones para la geolocalización
let options = {
    enableHighAccuracy: true, // Alta precisión
    timeout: 5000, // Tiempo máximo de espera (5 segundos)
    maximumAge: 0 // No usar una posición almacenada en caché
};

// Preguntamos por nuestra localización
if (navigator.geolocation) {
    // Si la geolocalización está disponible, obtenemos la posición actual
    navigator.geolocation.getCurrentPosition(success, error, options);
} else {
    // Si la geolocalización no está disponible, mostramos una alerta
    alert("Los servicios de geolocalización no están disponibles");
}

// Función que se ejecuta si la geolocalización es exitosa
function success(position) {
    let latitude = position.coords.latitude; // Latitud obtenida
    let longitude = position.coords.longitude; // Longitud obtenida

    // Crear un mapa centrado en la posición actual
    let map = L.map('mapa', {
        center: [latitude, longitude],
        zoom: 5,
    });

    // Añadir capa de mapa de OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Mapa Luistech'
    }).addTo(map);

    // Definir iconos personalizados
    let inicio = L.icon({
        iconUrl: '../assets/img/marca_mapa.png',
        iconSize: [50, 50], // Tamaño del icono
        iconAnchor: [25, 50] // Punto de anclaje del icono
    });

    let final = L.icon({
        iconUrl: '../assets/img/final_mapa.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });

    let parada = L.icon({
        iconUrl: '../assets/img/parada_mapa.png',
        iconSize: [25, 25],
        iconAnchor: [12.5, 12.5] 
    });

    // Calcular ruta entre dos puntos
    let ruta = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude), // Punto de inicio
            L.latLng(41.655899, -0.998297) // Punto de destino (Zaragoza)
        ],
        language: 'es', // Idioma de la interfaz de la ruta
        createMarker: function(i, wp, nWps) {
            // Crear marcadores personalizados para los puntos de la ruta
            switch (i) {
                case 0:
                    return L.marker(wp.latLng, { icon: inicio, draggable: true }); // Marcador de inicio
                case nWps - 1:
                    return L.marker(wp.latLng, { icon: final, draggable: true }); // Marcador de destino
                default:
                    return L.marker(wp.latLng, { icon: parada, draggable: true }); // Marcadores intermedios
            }
        }
    }).addTo(map);
}

// Función que se ejecuta si hay un error en la geolocalización
function error() {
    // Crear un mapa centrado en una ubicación predeterminada (Pamplona)
    let map = L.map('mapa', {
        center: [41.65608737689108, -0.9974660288354315],
        zoom: 20 
    });

    // Añadir capa de mapa de OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Mapa Luistech'
    }).addTo(map);

    // Definir icono para la marca
    let final = L.icon({
        iconUrl: '../assets/img/final_mapa.png',
        iconSize: [50, 50],
        iconAnchor: [25, 10]
    });

    // Añadir una marca en las coordenadas predeterminadas
    L.marker([41.65608737689108, -0.9974660288354315], { icon: final}).addTo(map)
        .bindPopup('Ubicación predeterminada debido a un error en la geolocalización').openPopup();
}
