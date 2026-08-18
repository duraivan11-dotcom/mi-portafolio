document.addEventListener("DOMContentLoaded", () => {
    const contenedorFavoritos = document.getElementById("contenedor-favoritos");
    const totalFavoritos = document.getElementById("total-favoritos");

    // 1. Obtener lista de favoritos desde localStorage
    function obtenerFavoritos() {
        return JSON.parse(localStorage.getItem("favoritos")) || [];
    }

    // 2. Renderizar los usuarios favoritos
    function cargarFavoritos() {
        const favoritos = obtenerFavoritos();
        
        // Actualizar contador
        if (totalFavoritos) {
            totalFavoritos.textContent = `Total guardados: ${favoritos.length}`;
        }

        if (favoritos.length === 0) {
            contenedorFavoritos.innerHTML = `
                <div class="mensaje-vacio" style="grid-column: 1 / -1;">
                    <h3>No tienes usuarios en tu lista de favoritos.</h3>
                    <p>Marca con la estrella ⭐ los usuarios de la página principal para verlos aquí.</p>
                    <br>
                    <a href="index.html" class="btn-volver">Ir a Inicio</a>
                </div>
            `;
            return;
        }

        contenedorFavoritos.innerHTML = "";

        favoritos.forEach(usuario => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");

            tarjeta.innerHTML = `
                <span class="estrella favorito" title="Quitar de favoritos">⭐</span>
                <img src="${usuario.foto}" alt="${usuario.nombre}">
                <h3>${usuario.nombre}</h3>
                <p><strong>Género:</strong> ${usuario.genero}</p>
                <p><strong>Edad:</strong> ${usuario.edad} años</p>
            `;

            const estrella = tarjeta.querySelector(".estrella");

            // Evento para quitar de favoritos
            estrella.addEventListener("click", (evento) => {
                evento.stopPropagation(); // Evita redirigir a detalle.html
                quitarDeFavoritos(usuario.id);
            });

            // Evento para abrir detalle del usuario
            tarjeta.addEventListener("click", () => {
                localStorage.setItem("usuarioSeleccionado", JSON.stringify(usuario));
                window.location.href = "detalle.html";
            });

            contenedorFavoritos.appendChild(tarjeta);
        });
    }

    // 3. Eliminar un usuario de la lista de favoritos por su ID
    function quitarDeFavoritos(idUsuario) {
        let favoritos = obtenerFavoritos();
        
        // Filtrar manteniendo solo los usuarios cuyo ID no sea el eliminado
        favoritos = favoritos.filter(usuario => usuario.id !== idUsuario);

        // Guardar el nuevo array en localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        // Volver a cargar la lista en pantalla
        cargarFavoritos();
    }

    // Carga inicial
    cargarFavoritos();
});
