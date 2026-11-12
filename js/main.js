
/* =====================================
   MENÚ DE NAVEGACIÓN
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");


// Abrir y cerrar menú
menuToggle.addEventListener("click", function() {

    const abierto = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!abierto));

    menuToggle.setAttribute(
        "aria-label",
        abierto ? "Abrir menú de navegación" : "Cerrar menú de navegación"
    );

    menuPrincipal.classList.toggle("active", !abierto);

});


// Cerrar menú cuando se selecciona una sección
const enlacesMenu = menuPrincipal.querySelectorAll("a");

enlacesMenu.forEach(function(enlace) {

    enlace.addEventListener("click", function() {

        menuPrincipal.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menú de navegación"
        );

    });

});


// Cerrar menú con Escape
document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        menuPrincipal.classList.contains("active")
    ) {

        menuPrincipal.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menú de navegación"
        );

        menuToggle.focus();

    }

});


// Cerrar menú al cambiar a pantalla de escritorio
window.addEventListener("resize", function() {

    if (window.innerWidth > 650) {

        menuPrincipal.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menú de navegación"
        );

    }

});


/* =====================================
   FORMULARIO DE CONTACTO
===================================== */

const formulario = document.getElementById(
    "formulario-contacto"
);

const estadoFormulario = document.getElementById(
    "estado-formulario"
);


const campos = [
    {
        id: "nombre",
        obligatorio: true
    },
    {
        id: "correo",
        obligatorio: true
    },
    {
        id: "telefono",
        obligatorio: false
    },
    {
        id: "mensaje",
        obligatorio: true
    }
];


// Función para validar cada campo
function validarCampo(campoConfig) {

    const campo = document.getElementById(campoConfig.id);

    const mensajeError = document.getElementById(
        "error-" + campoConfig.id
    );

    let mensaje = "";

    const valor = campo.value.trim();

    if (campoConfig.obligatorio && valor === "") {

        mensaje = "Este campo es obligatorio.";

    }

    else if (
        campoConfig.id === "correo" &&
        valor !== "" &&
        !campo.validity.valid
    ) {

        mensaje = "Introduce una dirección de correo válida.";

    }

    else if (
        campoConfig.id === "telefono" &&
        valor !== "" &&
        !/^[0-9+\s()-]{7,20}$/.test(valor)
    ) {

        mensaje = "Introduce un número de teléfono válido.";

    }

    if (mensaje !== "") {

        campo.setAttribute("aria-invalid", "true");

        mensajeError.textContent = mensaje;

        return false;

    }

    campo.removeAttribute("aria-invalid");

    mensajeError.textContent = "";

    return true;

}


// Validación al abandonar cada campo
campos.forEach(function(config) {

    const campo = document.getElementById(config.id);

    campo.addEventListener("blur", function() {

        validarCampo(config);

    });

    campo.addEventListener("input", function() {

        if (campo.hasAttribute("aria-invalid")) {

            validarCampo(config);

        }

    });

});


// Envío y validación general
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let formularioValido = true;

    let primerCampoInvalido = null;

    estadoFormulario.textContent = "";

    campos.forEach(function(config) {

        const valido = validarCampo(config);

        if (!valido) {

            formularioValido = false;

            if (primerCampoInvalido === null) {

                primerCampoInvalido = document.getElementById(
                    config.id
                );

            }

        }

    });


    // Si existen errores, llevar el foco al primer campo
    if (!formularioValido) {

        estadoFormulario.textContent =
            "Hay errores en el formulario. Revisa los campos señalados.";

        primerCampoInvalido.focus();

        return;

    }


    // Los datos son válidos, pero todavía no se han enviado
    estadoFormulario.textContent =
        "Los datos son válidos. Para completar el envío, conecta el formulario con un servicio de recepción.";

});


/* =====================================
   NAVEGACIÓN Y ANCLAS
===================================== */

// Evitar que el encabezado oculte el título
document.querySelectorAll('a[href^="#"]').forEach(function(enlace) {

    enlace.addEventListener("click", function() {

        const destino = document.querySelector(
            enlace.getAttribute("href")
        );

        if (destino && destino !== document.querySelector("body")) {

            destino.setAttribute("tabindex", "-1");

        }

    });

});
