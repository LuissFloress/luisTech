document.addEventListener("DOMContentLoaded", function() {
    console.log("Script cargado correctamente"); // Comprobar que el script se carga
    fetch('./assets/Json/noticias.json')
        .then(response => {
            console.log("Respuesta obtenida:", response); // Comprobar la respuesta
            return response.json();
        })
        .then(data => {
            console.log("Datos JSON:", data); // Ver los datos JSON cargados
            const newsContainer = document.getElementById('news-container');
            data.forEach(noticia => {
                const noticiaElement = document.createElement('div');
                noticiaElement.className = 'noticia';
                noticiaElement.style.backgroundColor = 'var(--color_noticias)'; // Cambia este color según tus necesidades
                noticiaElement.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.descripcion}</p>
                    <small>${noticia.fecha}</small>
                `;
                newsContainer.appendChild(noticiaElement);
            });
        })
        .catch(error => console.error('Error cargando noticias:', error));
});
