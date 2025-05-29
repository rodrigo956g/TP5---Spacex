const id = localStorage.getItem("idLanzamiento");

if (!id) {
  document.getElementById("detalle").innerText = "No se encontró el ID del lanzamiento.";
} else {
  fetch(`https://api.spacexdata.com/v5/launches/${id}`)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById("detalle");

      const imagen = data.links.patch.small || "https://via.placeholder.com/150";
      const fallas = data.failures.length > 0
        ? data.failures.map(f => f.reason).join(", ")
        : "Ninguna";

      const detalles = `
        <img src="${imagen}" alt="${data.name}" style="width:150px; margin-bottom: 10px;" />
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Fallas:</strong> ${fallas}</p>
        <p><strong>Detalle:</strong> ${data.details || "No disponible"}</p>
        <p><strong>Número de vuelo:</strong> ${data.flight_number}</p>
        <p><strong>Fecha y hora de despegue:</strong> ${new Date(data.date_utc).toLocaleString()}</p>
        <br><a href="index.html">← Volver al inicio</a>
      `;

      contenedor.innerHTML = detalles;
    })
    .catch(err => {
      document.getElementById("detalle").innerText = "Error al cargar los datos.";
      console.error(err);
    });
}
