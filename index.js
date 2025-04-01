const paleta = ['red', 'green', 'blue', 'purple', 'orange', 'cyan', 'yellow', 'pink'];
let sequencia = [];
let respostaUsuari = [];
let numero = 0;
let bloquejat = true; // Evitem que l'usuari interaccioni durant la seqüència

document.getElementById("start").addEventListener("click", inici);

document.querySelectorAll(".color").forEach(button => {
    button.addEventListener("click", (e) => {
        if (!bloquejat) {
            let colorSeleccionat = e.target.dataset.color;
            respostaUsuari.push(colorSeleccionat);
            comprovarresposta();
        }
    });
});

function inici() {
    sequencia = [];
    respostaUsuari = [];
    bloquejat = true;
    afegirColor();
    mostrar_colors(1000);
}

function afegirColor() {
    numero = Math.floor(Math.random() * paleta.length);
    sequencia.push(paleta[numero]);
    console.log("Seqüència actual:", sequencia);
}

async function mostrar_colors(temps) {
    bloquejat = true;
    for (let color of sequencia) {
        console.log("Mostrant color:", color);
        let mostrador = document.querySelector(".mostrador");
        mostrador.style.backgroundColor = color;
        await esperar(temps);
        mostrador.style.backgroundColor = "white";
        await esperar(500);
    }
    bloquejat = false;
    respostaUsuari = [];
}

function comprovarresposta() {
    for (let i = 0; i < respostaUsuari.length; i++) {
        if (respostaUsuari[i] !== sequencia[i]) {
            alert("Malament! Torna a provar.");
            return;  // Aturar l'execució de la funció aquí

        }
    }

    if (respostaUsuari.length === sequencia.length) {
        bloquejat = true;
        setTimeout(() => {
            afegirColor();
            mostrar_colors(1000);
        }, 1000);
    }
}

function esperar(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
