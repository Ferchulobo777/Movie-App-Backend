$(document).ready(function() {
    mostrarAnioActual();
    emailUserUpdate();
    $('#peliculas').DataTable();
    cargarPeliculas();
    cargarDirectores(); // Cargar lista de directores al inicio
});

// Función para cargar las películas desde el servidor
async function cargarPeliculas() {
    try {
        const response = await fetch('/movies', {
            method: 'GET',
            headers: getHeaders()
        });

        if (response.ok) {
            const movies = await response.json();
            window.movies = movies;

            let peliculaHTML = '';

            for (let movie of movies) {
                let btnEditar = '<a href="#" onclick="mostrarEditarPelicula(' + movie.movie_id + ')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#editMovieModal">' +
                                    '<i class="fas fa-edit"></i>' +
                                '</a>';
                let btnEliminar = '<a href="#" onclick="confirmarEliminarPelicula(' + movie.movie_id + ')" class="btn btn-danger btn-circle btn-sm">' +
                                      '<i class="fas fa-trash"></i>' +
                                  '</a>';
                peliculaHTML += '<tr>' +
                                   '<td>' + movie.movie_id + '</td>' +
                                   '<td>' + movie.title + '</td>' +
                                   '<td>' + movie.year + '</td>' +
                                   '<td>' + movie.datetime + '</td>' +
                                   '<td>' + movie.genre + '</td>' +
                                   '<td>' + movie.overview + '</td>' +
                                   '<td>' + movie.director.name + ' ' + movie.director.lastname + '</td>' +
                                   '<td>' + movie.poster + '</td>' +
                                   '<td>' + movie.wallpaper + '</td>' +
                                   '<td>' + movie.trailer + '</td>' +
                                   '<td>' + movie.socialLinks + '</td>' +
                                   '<td>' + movie.website + '</td>' +
                                   '<td>' + movie.status + '</td>' +
                                   '<td>' + movie.originalLanguage + '</td>' +
                                   '<td>' + movie.budget + '</td>' +
                                   '<td>' + movie.revenue + '</td>' +
                                   '<td>' + btnEditar + ' ' + btnEliminar + '</td>' +
                               '</tr>';
            }

            $('#peliculas tbody').html(peliculaHTML); // Usamos jQuery para insertar el HTML generado en el tbody
        } else {
            console.error('Error al cargar películas:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar las películas');
    }
}
function abrirCrearPeliculaModal() {
    $('#createMovieModal').trigger('reset')
    $('#createMovieModal').modal('show');

}

async function registrarPelicula() {
    const budgetValue = parseFloat(document.getElementById('createMovieBudget').value);
    const revenueValue = parseFloat(document.getElementById('createMovieRevenue').value);

    const directorId = document.getElementById('createMovieDirector').value;

    const directorResponse = await fetch('/directors/' + directorId, {
        method: 'GET',
        headers: getHeaders()
    });

    if (!directorResponse.ok) {
        console.error('Error al obtener el director:', directorResponse.status, directorResponse.statusText);
        return;
    }

    const director = await directorResponse.json();

    const newMovie = {
        title: document.getElementById('createMovieTitle').value,
        year: parseInt(document.getElementById('createMovieYear').value, 10),
        datetime: document.getElementById('createMovieReleaseDate').value,
        genre: document.getElementById('createMovieGenres').value.split(','), // Convertir a lista separada por comas
        overview: document.getElementById('createMovieOverview').value,
        director: director, // Asignar el objeto Director obtenido
        poster: document.getElementById('createMoviePoster').value,
        wallpaper: document.getElementById('createMovieWallpaper').value,
        trailer: document.getElementById('createMovieTrailer').value,
        socialLinks: document.getElementById('createMovieLinks').value.split(','), // Convertir a lista separada por comas
        website: document.getElementById('createMovieWebsite').value,
        status: document.getElementById('createMovieStatus').value === 'true', // Convertir a booleano si es necesario
        originalLanguage: document.getElementById('createMovieLanguage').value,
        budget: !isNaN(budgetValue) ? budgetValue : null,
        revenue: !isNaN(revenueValue) ? revenueValue : null
    };



    try {
        const response = await fetch('/movies', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(newMovie)
        });

        if (response.ok) {
            mostrarMensajeExito('Película registrada con éxito');
            setTimeout(function() {
                $('#successMessage').hide();
                $('#createMovieModal').modal('hide');
                cargarPeliculas(); // Recargar la lista de películas después de guardar
            }, 1800);
        } else {
            console.error('Error al registrar película:', response.status, response.statusText);
            throw new Error('Error al registrar película');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al intentar registrar la película');
    }
}

// Función para cargar la lista de directores en el formulario de edición
async function cargarDirectores() {
    try {
        const response = await fetch('/directors', {
            method: 'GET',
            headers: getHeaders()
        });

        if (response.ok) {
            const directors = await response.json();
            let options = '<option value="">Seleccionar Director</option>';

            for (let director of directors) {
                options += `<option value="${director.director_id}">${director.director_id} ${director.name} ${director.lastname}</option>`;
            }

            document.getElementById('createMovieDirector').innerHTML = options;
            document.getElementById('editMovieDirector').innerHTML = options;
        } else {
            console.error('Error al cargar directores:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar los directores');
    }
}

// Función para mostrar los datos de la película seleccionada en el modal de edición
function mostrarEditarPelicula(movieId) {
    const movie = window.movies.find(m => m.movie_id === movieId);
    if (movie) {
        document.getElementById('editMovieId').value = movie.movie_id;
        document.getElementById('editMovieTitle').value = movie.title;
        document.getElementById('editMovieYear').value = movie.year;
        document.getElementById('editMovieReleaseDate').value = movie.datetime;
        document.getElementById('editMovieGenres').value = movie.genre;
        document.getElementById('editMovieOverview').value = movie.overview;
        document.getElementById('editMoviePoster').value = movie.poster ? movie.poster : '';
        document.getElementById('editMovieWallpaper').value = movie.wallpaper ? movie.wallpaper : '';
        document.getElementById('editMovieTrailer').value = movie.trailer ? movie.trailer : '';
        document.getElementById('editMovieLinks').value = movie.socialLinks ? movie.socialLinks : '';
        document.getElementById('editMovieWebsite').value = movie.website ? movie.website : '';
        document.getElementById('editMovieStatus').value = movie.status ? movie.status.toString() : ''; // Convertir a string si es booleano
        document.getElementById('editMovieLanguage').value = movie.originalLanguage ? movie.originalLanguage : '';
        document.getElementById('editMovieBudget').value = movie.budget ? movie.budget : '';
        document.getElementById('editMovieRevenue').value = movie.revenue ? movie.revenue : '';

        // Seleccionar el director asociado a la película
        if (movie.director) {
            document.getElementById('editMovieDirector').value = movie.director.director_id;
        }

        $('#editMovieModal').modal('show');
    }
}

// Función para actualizar una película
document.getElementById('editMovieForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const movieId = document.getElementById('editMovieId').value;
    const budgetValue = parseFloat(document.getElementById('editMovieBudget').value);
    const revenueValue = parseFloat(document.getElementById('editMovieRevenue').value);
    const directorId = document.getElementById('editMovieDirector').value; // Obtener el ID del director seleccionado

    const updatedMovie = {
        title: document.getElementById('editMovieTitle').value,
        year: parseInt(document.getElementById('editMovieYear').value, 10), // Parsear a entero
        datetime: document.getElementById('editMovieReleaseDate').value,
        genre: document.getElementById('editMovieGenres').value.split(','), // Convertir a lista separada por comas
        overview: document.getElementById('editMovieOverview').value,
        director: { director_id: directorId }, // Enviar solo el ID del director como objeto
        poster: document.getElementById('editMoviePoster').value,
        wallpaper: document.getElementById('editMovieWallpaper').value,
        trailer: document.getElementById('editMovieTrailer').value,
        socialLinks: document.getElementById('editMovieLinks').value.split(','), // Convertir a lista separada por comas
        website: document.getElementById('editMovieWebsite').value,
        status: document.getElementById('editMovieStatus').value === 'true', // Convertir a booleano si es necesario
        originalLanguage: document.getElementById('editMovieLanguage').value,
        budget: !isNaN(budgetValue) ? budgetValue : null, // Verificar si es un número válido
        revenue: !isNaN(revenueValue) ? revenueValue : null // Verificar si es un número válido
    };

    try {
        const url = '/movies/' + movieId;

        const response = await fetch(url, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updatedMovie)
        });

        if (response.ok) {
            mostrarMensajeExito('Película actualizada exitosamente');
            setTimeout(function() {
                $('#successMessage').hide();
                cargarPeliculas();
                cerrarModalEditar();
            }, 1800);
        } else {
            console.error('Error al actualizar película:', response.status, response.statusText);
            throw new Error('Error al actualizar película');
        }
    } catch (error) {
        console.error('Hubo un problema al intentar actualizar la película:', error);
        alert('Hubo un problema al intentar actualizar la película');
    }
});

// Función para eliminar una película
function confirmarEliminarPelicula(movieId) {
    $('#confirmDeleteModal').modal('show');

    // Eliminar listeners anteriores para evitar múltiples llamadas
    $('#confirmDeleteButton').off('click').on('click', function() {
        eliminarPelicula(movieId);
        $('#confirmDeleteModal').modal('hide');
    });
}

// Función asincrónica para eliminar una película por su ID
async function eliminarPelicula(movieId) {
    try {
        const response = await fetch('/movies/' + movieId, {
            method: 'DELETE',
            headers: getHeaders()
        });

        if (response.ok) {
            mostrarMensajeExito('Película eliminada con éxito');
            setTimeout(function() {
                $('#successMessage').hide();
                cargarPeliculas();
            }, 1800);
        } else {
            throw new Error('Error al eliminar película');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al intentar eliminar la película');
    }
}

// Función para cerrar el modal de edición de película
function cerrarModalEditar() {
    $('#editMovieModal').modal('hide');
    $('#editMovieForm').trigger('reset'); // Resetear el formulario de editar película
}

// Función para mostrar el año actual en el pie de página
function mostrarAnioActual() {
    const year = new Date().getFullYear();
    const copyrightSpan = document.getElementById('anioActual');
    if (copyrightSpan) {
        copyrightSpan.textContent = year;
    }
}

// Función para actualizar el correo del usuario en la interfaz
function emailUserUpdate() {
    document.getElementById('emailUser').innerText = localStorage.getItem('email');
}

// Función para mostrar un mensaje de éxito
function mostrarMensajeExito(mensaje) {
    const successMessage = document.getElementById('successMessage');
    successMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + mensaje;
    successMessage.style.display = 'block';
}

// Función para obtener los headers con el token de autorización
function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
}


