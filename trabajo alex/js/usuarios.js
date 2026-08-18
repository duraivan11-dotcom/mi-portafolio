document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-tarjetas");
    const cargando = document.getElementById("cargando");
    const contadorFavoritos = document.getElementById("contador-favoritos");

    // 1. Obtener lista de favoritos guardados en localStorage
    function obtenerFavoritos() {
        return JSON.parse(localStorage.getItem("favoritos")) || [];
    }

    // Actualizar el contador en la cabecera
    function actualizarContador() {
        const favoritos = obtenerFavoritos();
        if (contadorFavoritos) {
            contadorFavoritos.textContent = `Favoritos guardados: ${favoritos.length}`;
        }
    }

    // 2. Consumir la API de Random User para obtener 100 usuarios
    async function obtenerUsuarios() {
        try {
            const respuesta = await fetch("https://randomuser.me/api/?results=100");
            const datos = await respuesta.json();
            
            // Ocultar mensaje de carga
            cargando.style.display = "none";

            // Mapear los datos limpios conservando el id login.uuid
            const usuarios = datos.results.map(u => ({
                id: u.login.uuid,
                nombre: `${u.name.first} ${u.name.last}`,
                genero: u.gender === 'female' ? 'Femenino' : (u.gender === 'male' ? 'Masculino' : u.gender),
                edad: u.dob.age,
                foto: u.picture.large,
                email: u.email,
                celular: u.cell,
                telefono: u.phone,
                direccion: `${u.location.street.name} #${u.location.street.number}, ${u.location.city}`,
                pais: u.location.country
            }));

            renderizarTarjetas(usuarios);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            cargando.textContent = "Ocurrió un error al cargar los 100 usuarios. Intenta recargar la página.";
        }
    }

    // 3. Renderizar las 100 tarjetas en el DOM
    function renderizarTarjetas(usuarios) {
        contenedor.innerHTML = "";
        const favoritos = obtenerFavoritos();

        usuarios.forEach(usuario => {
            // Verificar si el usuario ya está marcado como favorito
            const esFav = favoritos.some(fav => fav.id === usuario.id);

            // Crear elemento div de la tarjeta
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");

            tarjeta.innerHTML = `
                <span class="estrella ${esFav ? 'favorito' : ''}">✪</span>
                <img src="${usuario.foto}" alt="${usuario.nombre}">
                <h3>${usuario.nombre}</h3>
                <p><strong>Género:</strong> ${usuario.genero}</p>
                <p><strong>Edad:</strong> ${usuario.edad} años</p>
            `;

            // Elemento estrella dentro de la tarjeta
            const estrella = tarjeta.querySelector(".estrella");

            // Evento Clic en la Estrella (Favoritos)
            estrella.addEventListener("click", (evento) => {
                // Detener la propagación para evitar abrir la página de detalle
                evento.stopPropagation();
                
                toggleFavorito(usuario, estrella);
            });

            // Evento Clic en la Tarjeta Completa (Ir a detalle.html)
            tarjeta.addEventListener("click", () => {
                // Guardar usuario seleccionado en localStorage
                localStorage.setItem("usuarioSeleccionado", JSON.stringify(usuario));
                
                // Redirigir a detalle.html
                window.location.href = "detalle.html";
            });

            contenedor.appendChild(tarjeta);
        });

        actualizarContador();
    }

    // 4. Función para agregar o quitar de Favoritos
    function toggleFavorito(usuario, estrellaElemento) {
        let favoritos = obtenerFavoritos();
        const existeIndex = favoritos.findIndex(fav => fav.id === usuario.id);

        if (existeIndex !== -1) {
            // Si ya existe, lo quitamos
            favoritos.splice(existeIndex, 1);
            estrellaElemento.classList.remove("favorito");
        } else {
            // Si no existe, lo agregamos
            favoritos.push(usuario);
            estrellaElemento.classList.add("favorito");
        }

        // Guardar array actualizado en localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        actualizarContador();
    }

    // Ejecutar petición inicial
    obtenerUsuarios();
});
