// script.js
let iconos = [];
let selecciones = [];
let puntos = 0; // Contador de puntos

generarTablero();

function cargarIconos() {
    iconos = [
        '<i class="fas fa-bell"></i>',
        '<i class="fab fa-bitcoin"></i>',
        '<i class="fas fa-paper-plane"></i>',
        '<i class="fas fa-dove"></i>',
        '<i class="fab fa-apple"></i>',
        '<i class="fab fa-canadian-maple-leaf"></i>',
        '<i class="fab fa-grav"></i>',
        '<i class="fab fa-suse"></i>',
        '<i class="fas fa-hiking"></i>',
        '<i class="fas fa-car"></i>',
        '<i class="fas fa-dragon"></i>',
        '<i class="fas fa-spider"></i>',
    ];
}

function generarTablero() {
    cargarIconos();
    selecciones = [];
    puntos = 0; // Reiniciar el contador de puntos
    actualizarContador(); // Actualizar el contador en la página
    let tablero = document.getElementById("tablero");
    let tarjetas = [];
    for (let i = 0; i < 24; i++) {
        tarjetas.push(`
            <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}">
                    <div class="cara trasera" id="trasera${i}">
                        ${iconos[0]}
                    </div>
                    <div class="cara superior">
                        <i class="fas fa-question"></i>
                    </div>
                </div>
            </div>
        `);
        if (i % 2 == 1) {
            iconos.splice(0, 1);
        }
    }
    tarjetas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = tarjetas.join(" ");
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i);
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }
    if (selecciones.length == 2) {
        setTimeout(() => {
            deseleccionar(selecciones);
            selecciones = [];
        }, 1000);
    }
}

function deseleccionar(selecciones) {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);
    if (trasera1.innerHTML != trasera2.innerHTML) {
        let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
        let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
        tarjeta1.style.transform = "rotateY(0deg)";
        tarjeta2.style.transform = "rotateY(0deg)";
    } else {
        trasera1.style.background = "plum";
        trasera2.style.background = "plum";
        puntos++; // Incrementar puntos cuando se encuentra una pareja
        actualizarContador(); // Actualizar el contador en la página
    }
}

function actualizarContador() {
    const contadorElemento = document.getElementById("contador-puntos");
    contadorElemento.textContent = "Puntos: " + puntos;
}
