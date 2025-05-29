const grid = document.getElementById("grid");

// pedir todos los lanzamientos a la API
fetch("https://api.spacexdata.com/v5/launches")
  .then(res => res.json()) // se convierten a la respuesta en JSON
  .then(data => {
    data.forEach(lanzamiento => {
      // se crea una tarjeta por cada lanzamiento
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h2>${lanzamiento.name}</h2>
        <img src="${lanzamiento.links.patch.small}" alt="${lanzamiento.name}" onclick="verDetalle('${lanzamiento.id}')">
      `;
      grid.appendChild(card); // agregar la tarjeta a la página
    });
  });

// Cuando se hace clic en una imagen, se guarda el ID y se va al detalle.html
function verDetalle(id) {
  localStorage.setItem("idLanzamiento", id);
  location.href = "detalle.html";
}
