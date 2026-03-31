// muestra contactos con get

function mostrarContactos() {
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos");

            // Limpiar tabla
            tbody.innerHTML = "";

            // Recorrer contactos
            data.forEach((contacto) => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                    <td>
                        <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
                    </td>
                `;

                // Evento eliminar
                tr.querySelector(".delete-btn").addEventListener("click", () => {
                    eliminarContacto(contacto.id);
                });

                tbody.appendChild(tr);
            });
        })
        .catch((error) => {
            console.error("Error al obtener contactos:", error);
        });
}

// FUNCIÓN: ELIMINAR CONTACTO (DELETE)
// (A) CONFIRMACIÓN ANTES DE ELIMINAR

function eliminarContacto(id) {
    // confirmacion antes de eliminar
    if (!confirm("¿Seguro que quieres eliminar este contacto?")) {
        return;
    }

    fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(() => {
        alert("Contacto eliminado correctamente");
        mostrarContactos(); // refrescar tabla
    })
    .catch((error) => {
        console.error("Error al eliminar:", error);
    });
}

// INICIAR APP

mostrarContactos();

// FORMULARIO: AGREGAR CONTACTO (POST)

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // evitar recargar página

    // Obtener valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    // validacion
    if (!nombre || !telefono) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (telefono.length < 5) {
        alert("El teléfono debe tener al menos 5 caracteres");
        return;
    }

    // Crear objeto contacto
    const nuevoContacto = {
        nombre: nombre,
        telefono: telefono
    };

    // Enviar al servidor
    fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoContacto)
    })
    .then((response) => response.json())
    .then(() => {
        alert("Contacto agregado correctamente");

        // Limpiar formulario
        document.getElementById("contactForm").reset();

        // Recargar tabla
        mostrarContactos();
    })
    .catch((error) => {
        console.error("Error al agregar:", error);
    });
});