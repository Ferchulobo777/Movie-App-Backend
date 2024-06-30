$(document).ready(function() {
    // Aquí puedes agregar el código que deseas ejecutar cuando el documento esté listo.
});

// Función para obtener los headers con el token de autorización
function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
}

async function registrarUsuarios() {
    let datos = {
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        dateBirthday: document.getElementById('birthday').value,
        nationality: document.getElementById('nationality').value
    };

    let repetirPassword = document.getElementById('repeatPassword').value;
    if (repetirPassword !== datos.password) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error('Error al registrar usuario: ' + response.status);
        }

        const data = await response.json();

        // Limpiar los campos del formulario después del registro exitoso
        document.getElementById('name').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('repeatPassword').value = '';
        document.getElementById('birthday').value = '';
        document.getElementById('nationality').value = '';

        // Cerrar el modal de éxito y mostrarlo
        $('#successModal').modal('show');

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el usuario. Detalles en la consola.');
    }
}