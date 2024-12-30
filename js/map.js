// Coordenadas de la empresa (Ubicación actualizada)
const empresaUbicacion = [39.48376250705301, -0.3951585944148507];  // Nueva ubicación

// Crear el mapa y centrarlo en la ubicación de la empresa
const map = L.map('map').setView(empresaUbicacion, 15);

// Capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Añadir marcador en la ubicación de la empresa
L.marker(empresaUbicacion).addTo(map)
    .bindPopup('<b>Estamos aquí!</b><br>Av. Principal 123, Valencia, España')
    .openPopup();

// Geolocalización del cliente
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const clienteUbicacion = [position.coords.latitude, position.coords.longitude];
        
        // Marcar la ubicación del cliente
        L.marker(clienteUbicacion).addTo(map)
          .bindPopup('<b>Tu ubicación</b>').openPopup();
        
        // Trazar la ruta entre el cliente y la empresa
        const route = L.polyline([clienteUbicacion, empresaUbicacion], { color: 'blue' }).addTo(map);
        map.fitBounds(route.getBounds());
    });
} else {
    alert('La geolocalización no está disponible en tu navegador.');
}