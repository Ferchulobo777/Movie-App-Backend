$(document).ready(function() {
    cargarDirectors();
    mostrarAnioActual();
    emailDirectorUpdate();
    $('#directores').DataTable();
});

// Función para obtener los headers con el token de autorización
function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
}

async function cargarDirectors() {
    try {
        const response = await fetch('/directors', {
            method: 'GET',
            headers: getHeaders()
        });

        if (response.ok) {
            const directores = await response.json();
            window.directores = directores;

            let directorHTML = '';

            for (let director of directores) {
                let btnEditar = '<a href="#" onclick="mostrarEditarDirector(' + director.director_id + ')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#editDirectorModal">' +
                                    '<i class="fas fa-edit"></i>' +
                                '</a>';
                let btnEliminar = '<a href="#" onclick="confirmarEliminarDirector(' + director.director_id + ')" class="btn btn-danger btn-circle btn-sm">' +
                                      '<i class="fas fa-trash"></i>' +
                                  '</a>';
                directorHTML += '<tr>' +
                                   '<td>' + director.director_id + '</td>' +
                                   '<td>' + director.name + '</td>' +
                                   '<td>' + director.lastname + '</td>' +
                                   '<td>' + director.age + '</td>' +
                                   '<td>' + director.dateOfBirth + '</td>' +
                                   '<td>' + director.dateOfDeath + '</td>' +
                                   '<td>' + director.nationality + '</td>' +
                                   '<td>' + btnEditar + ' ' + btnEliminar + '</td>' +
                               '</tr>';
            }

            $('#directores tbody').html(directorHTML); // Usamos jQuery para insertar el HTML generado en el tbody
        } else {
            console.error('Error al cargar directores:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar los directores');
    }
}

function confirmarEliminarDirector(directorId) {
    $('#confirmDeleteModal').modal('show');

    // Eliminar listeners anteriores para evitar múltiples llamadas
    $('#confirmDeleteButton').off('click').on('click', function() {
        eliminarDirector(directorId);
        $('#confirmDeleteModal').modal('hide');
    });
}

async function eliminarDirector(directorId) {
    try {
        const response = await fetch('/directors/' + directorId, {
            method: 'DELETE',
            headers: getHeaders()
        });

        if (response.ok) {
            mostrarMensajeExito('Director eliminado con éxito');
            setTimeout(function() {
                $('#successMessage').hide();
                cargarDirectors();
            }, 1800);
        } else {
            throw new Error('Error al eliminar director');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al intentar eliminar el director');
    }
}

function mostrarAnioActual() {
    const year = new Date().getFullYear();
    const copyrightSpan = document.getElementById('anioActual');
    if (copyrightSpan) {
        copyrightSpan.textContent = year;
    }
}

function mostrarMensajeExito(mensaje) {
    const successMessage = document.getElementById('successMessage');
    successMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + mensaje;
    successMessage.style.display = 'block';
}

function mostrarEditarDirector(directorId) {
    const director = window.directores.find(d => d.director_id === directorId);
    if (director) {
        document.getElementById('editDirectorId').value = director.director_id;
        document.getElementById('editDirectorName').value = director.name;
        document.getElementById('editDirectorLastName').value = director.lastname;
        document.getElementById('editDirectorAge').value = director.age;
        document.getElementById('editDirectorDateOfBirth').value = director.dateOfBirth;
        document.getElementById('editDirectorDateOfDeath').value = director.dateOfDeath;
        document.getElementById('editDirectorNationality').value = director.nationality;

        $('#editDirectorModal').modal('show');
    }
}

function abrirCrearDirectorModal() {
    $('#crearDirectorModal').trigger('reset')
    $('#crearDirectorModal').modal('show');

}

function emailDirectorUpdate() {
    document.getElementById('emailUser').innerText = localStorage.getItem('email');
}

function cerrarModalEditar() {
    $('#editDirectorModal').modal('hide');
    $('#editDirectorForm').trigger('reset'); // Resetear el formulario de editar director
}

document.getElementById('editDirectorForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const directorId = document.getElementById('editDirectorId').value;
    const updatedDirector = {
        name: document.getElementById('editDirectorName').value,
        lastname: document.getElementById('editDirectorLastName').value, // Corregido: "lastname" en lugar de "lastName"
        age: document.getElementById('editDirectorAge').value,
        dateOfBirth: document.getElementById('editDirectorDateOfBirth').value,
        dateOfDeath: document.getElementById('editDirectorDateOfDeath').value,
        nationality: document.getElementById('editDirectorNationality').value
    };

    try {
        const url = '/directors/' + directorId;

        const response = await fetch(url, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updatedDirector)
        });

        if (response.ok) {
            mostrarMensajeExito('Director actualizado exitosamente');
            setTimeout(function() {
                $('#successMessage').hide();
                cargarDirectors();
                cerrarModalEditar();
            }, 1800);
        } else {
            console.error('Error al actualizar director');
            throw new Error('Error al actualizar director');
        }
    } catch (error) {
        console.error('Hubo un problema al intentar actualizar el director:', error);
        alert('Hubo un problema al intentar actualizar el director');
    }
});
async function registrarDirectores() {
    const newDirector = {
        name: document.getElementById('createDirectorName').value,
        lastname: document.getElementById('createDirectorLastName').value,
        age: document.getElementById('createDirectorAge').value,
        dateOfBirth: document.getElementById('createDirectorBirthday').value,
        dateOfDeath: document.getElementById('createDirectorDeathday').value,
        nationality: document.getElementById('createDirectorNationality').value
    };

    try {
        const response = await fetch('/directors', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(newDirector) // Corregido: usar newDirector en lugar de newUser
        });

        if (response.ok) {
            mostrarMensajeExito('Director registrado con éxito');
            setTimeout(function() {
                $('#successMessage').hide();
                $('#crearDirectorModal').modal('hide');
                cargarDirectors();
            }, 1800);
        } else {
            throw new Error('Error al registrar director');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al intentar registrar el director');
    }
}

