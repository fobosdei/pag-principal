// Obtener el ID del personaje desde la URL
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");

if (!characterId) {
    console.error("Character ID not found in URL.");
    document.body.innerHTML = "<h1>Error: No character ID provided.</h1>";
} else {
    // Obtener los detalles del personaje
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Character not found.");
        }
        return response.json();
      })
      .then((character) => {
        if (!character || !character.name) {
            document.body.innerHTML = "<h1>Error: Character not found.</h1>";
            return;
        }

        // Mostrar la información del personaje
        document.getElementById("character-image").src = character.image;
        document.getElementById("character-name").textContent = character.name;
        document.getElementById("character-status").textContent = character.status;
        document.getElementById("character-species").textContent = character.species;
        document.getElementById("character-origin").textContent = character.origin.name;
        document.getElementById("character-location").textContent = character.location.name;

        // Obtener y mostrar los episodios
        const episodeList = document.getElementById("episodes");
        if (!character.episode || character.episode.length === 0) {
            episodeList.innerHTML = "<option>No episodes available</option>";
            return;
        }

        const episodePromises = character.episode.map((episodeUrl) =>
          fetch(episodeUrl).then((res) => res.json())
        );

        Promise.all(episodePromises)
          .then((episodes) => {
            episodes.forEach((episode) => {
              const option = document.createElement("option");
              option.value = episode.url;
              option.textContent = `${episode.episode} - ${episode.name} (Air Date: ${episode.air_date})`;
              episodeList.appendChild(option);
            });
          })
          .catch((error) => {
            console.error("Error loading episodes:", error);
            episodeList.innerHTML = "<option>Error loading episodes</option>";
          });
      })
      .catch((error) => {
        console.error("Error fetching character data:", error);
        document.body.innerHTML = "<h1>Error loading character data.</h1>";
      });
}