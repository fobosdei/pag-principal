document.addEventListener('DOMContentLoaded', function () {
    // Inicializar Swiper
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3, // Muestra 3 tarjetas a la vez
        spaceBetween: 30, // Espaciado entre tarjetas
        loop: true, // Hace que el carrusel sea infinito
        centeredSlides: true, // Centra las tarjetas
        grabCursor: true, // Cambia el cursor a una mano
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2, // En pantallas medianas, muestra 2
            },
            480: {
                slidesPerView: 1, // En pantallas pequeñas, muestra 1
            }
        }
    });

    // URL de la API
    const apiUrl = 'https://rickandmortyapi.com/api/character';

    // Función para obtener los datos de la API
    async function fetchCharacters() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const characters = data.results;
            generateCharacterCards(characters);
        } catch (error) {
            console.error('Error al obtener los datos de la API:', error);
        }
    }

    // Función para generar las tarjetas de personajes
    function generateCharacterCards(characters) {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        characters.forEach(character => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `
                <div class="character-card" data-id="${character.id}">
                    <img src="${character.image}" alt="${character.name}">
                    <h3>${character.name}</h3>
                </div>
            `;
            slide.addEventListener('click', () => {
                window.location.href = `character.html?id=${character.id}`;
            });
            swiperWrapper.appendChild(slide);
        });
        swiper.update(); // Actualiza Swiper después de añadir las tarjetas
    }

    // Llama a la función para obtener los personajes
    fetchCharacters();
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 80,
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 0, // Evita que roten al deslizar
        stretch: 0, // Ajusta el espaciado entre slides
        depth: 200, // Profundidad del efecto
        modifier: 1,
        slideShadows: false,
    },
    breakpoints: {
        991: {
            slidesPerView: 3, // Ajusta la cantidad de imágenes en pantallas grandes
        }
    }
});

function getFilesFromApi() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            createCharacterCards(data.results); 
            createSwiperSlides(data.results);  
        })
        .catch(error => console.error("Error al obtener datos:", error));
}

// Función para crear las tarjetas de personajes
function createCharacterCards(characters) {
    const charactersContainer = document.getElementById("charactersContainer");
    charactersContainer.innerHTML = ""; 

    characters.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("character-card");

        // Enlace a la primera aparición del personaje en un episodio
        const episodeUrl = character.episode.length > 0 ? character.episode[0] : "#"; 

        const linkElement = document.createElement("a");
        linkElement.href = episodeUrl; // Enlace al episodio
        linkElement.target = "_blank"; // Abrir en nueva pestaña

        const imageElement = document.createElement("img");
        imageElement.src = character.image;
        imageElement.alt = character.name;

        const nameElement = document.createElement("h1");
        nameElement.textContent = character.name;

        linkElement.appendChild(imageElement); // Hacemos que la imagen sea un enlace

        // Agregar elementos a la carta
        card.appendChild(linkElement);
        card.appendChild(nameElement);
        charactersContainer.appendChild(card);
    });
}

// Función para crear las diapositivas de Swiper
function createSwiperSlides(characters) {
    const swiperWrapper = document.getElementById("swiper-wrapper");
    swiperWrapper.innerHTML = ""; 

    characters.forEach(character => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const imageElement = document.createElement("img");
        imageElement.src = character.image;
        imageElement.alt = character.name;

        slide.appendChild(imageElement);
        swiperWrapper.appendChild(slide);
    });

    swiper.update();
}

// Llamar a la función para obtener los datos de la API cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", getFilesFromApi);
