$(document).ready(function() {
    // Cargar usuario recordado al cargar la página
    loadRememberedUser();
});

async function iniciarSesion() {
    let datos = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const token = await response.text(); // Obtener el token JWT como texto

        // Guardar token y email en localStorage después del inicio de sesión exitoso
        localStorage.setItem('token', token);
        localStorage.setItem('email', datos.email);
        console.log('Token guardado en localStorage:', localStorage.getItem('token'));

        // Redirigir al usuario a la página principal después del inicio de sesión exitoso
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error:', error);
        if (error.name === 'AbortError') {
            console.error('Request timed out');
        }
    }
}

function loadRememberedUser() {
    const rememberedEmail = localStorage.getItem('email');

    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('customCheck').checked = true; // Marcar la casilla "Recuérdame"
    }
}