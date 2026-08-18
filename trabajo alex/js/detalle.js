document.addEventListener("DOMContentLoaded", () => {
    const contenedorDetalle = document.getElementById("contenedor-detalle");
    const caja = document.getElementById("caja");

    // 1. Recuperar el usuario seleccionado almacenado en localStorage
    const usuarioGuardado = localStorage.getItem("usuarioSeleccionado");

    if (!usuarioGuardado) {
        // Estado cuando no hay usuario seleccionado
        contenedorDetalle.innerHTML = `
            <div class="mensaje-vacio">
                <h3>No has seleccionado ningún usuario aún.</h3>
                <p>Por favor regresa a la página principal y elige una tarjeta.</p>
                <br>
                <a href="index.html">Ir a Inicio</a>
            </div>
        `;
        return;
    }

    // 2. Convertir el texto JSON a Objeto JavaScript
    const usuario = JSON.parse(usuarioGuardado);

    // Mostrar la tarjeta
    caja.style.display = "block";

    // Obtener elementos del DOM
    let saludo = document.getElementById("saludo");
    let nombre = document.getElementById("nombre");
    let imagen = document.getElementById("avatar");
    let mapsInfo = document.getElementById("maps-info");

    let iconoUsuario = document.getElementById("icono-usuario");
    let iconoEmail = document.getElementById("icono-email");
    let iconoCelular = document.getElementById("icono-celular");
    let iconoDireccion = document.getElementById("icono-direccion");
    let iconoTelefono = document.getElementById("icono-telefono");
    let iconoSeguridad = document.getElementById("icono-seguridad");
    let todosLosIconos = document.querySelectorAll(".icono-item");

    const direccionCompleta = usuario.direccion;

    // Llenar los datos del usuario
    nombre.textContent = usuario.nombre;
    imagen.src = usuario.foto;

    function setActiveIcon(iconoActivo) {
        todosLosIconos.forEach(icon => icon.classList.remove("active"));
        iconoActivo.classList.add("active");
        nombre.classList.remove("link-maps");
        nombre.onclick = null;
        mapsInfo.style.display = "none";
    }

    function abrirGoogleMaps() {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionCompleta)}`;
        window.open(url, "_blank");
    }

    iconoUsuario.addEventListener("mouseover", () => {
        setActiveIcon(iconoUsuario);
        saludo.textContent = "Hola, mi nombre es";
        nombre.textContent = usuario.nombre;
    });

    iconoEmail.addEventListener("mouseover", () => {
        setActiveIcon(iconoEmail);
        saludo.textContent = "Mi correo es";
        nombre.textContent = usuario.email;
    });

    iconoCelular.addEventListener("mouseover", () => {
        setActiveIcon(iconoCelular);
        saludo.textContent = "Mi celular es";
        nombre.textContent = usuario.celular;
    });

    iconoDireccion.addEventListener("mouseover", () => {
        setActiveIcon(iconoDireccion);
        saludo.textContent = "Mi dirección es";
        nombre.textContent = direccionCompleta;
        nombre.classList.add("link-maps");
        nombre.onclick = abrirGoogleMaps;
        mapsInfo.style.display = "block";
    });

    iconoDireccion.addEventListener("click", () => {
        abrirGoogleMaps();
    });

    iconoTelefono.addEventListener("mouseover", () => {
        setActiveIcon(iconoTelefono);
        saludo.textContent = "Mi teléfono es";
        nombre.textContent = usuario.telefono;
    });

    iconoSeguridad.addEventListener("mouseover", () => {
        setActiveIcon(iconoSeguridad);
        saludo.textContent = "Mi país es";
        nombre.textContent = usuario.pais;
    });
});
