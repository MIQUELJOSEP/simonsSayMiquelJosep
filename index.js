// Definim una paleta de colors disponibles per al joc
const paleta = ['red', 'green', 'blue', 'purple', 'orange', 'cyan', 'yellow', 'pink'];

// Variables per emmagatzemar la seqüència del joc i la resposta de l'usuari
let sequencia = [];
let respostaUsuari = [];
let numero = 0;
let bloquejat = true; // Evitem que l'usuari interaccioni durant la seqüència

// Afegim un event listener al botó d'inici per començar el joc
document.getElementById("start").addEventListener("click", inici);

// Afegim event listeners als botons de colors perquè reaccionin als clics de l'usuari
document.querySelectorAll(".color").forEach(button => {
    button.addEventListener("click", (e) => {
        if (!bloquejat) { // Només permetem la interacció si no està bloquejat
            let colorSeleccionat = e.target.dataset.color; // Obtenim el color seleccionat
            respostaUsuari.push(colorSeleccionat); // Afegim el color a la resposta de l'usuari
            comprovarresposta(); // Comprovem si la resposta és correcta
        }
    });
});

// Funció per inicialitzar el joc
function inici() {
    sequencia = []; // Reiniciem la seqüència
    respostaUsuari = []; // Reiniciem la resposta de l'usuari
    bloquejat = true; // Bloquegem la interacció
    afegirColor(); // Afegim el primer color a la seqüència
    mostrar_colors(1000); // Mostrem la seqüència amb un temps d'espera de 1000ms
}

// Funció per afegir un color aleatori a la seqüència
function afegirColor() {
    numero = Math.floor(Math.random() * paleta.length); // Seleccionem un color aleatori
    sequencia.push(paleta[numero]); // Afegim el color a la seqüència
    console.log("Seqüència actual:", sequencia); // Mostrem la seqüència per depuració
}

// Funció asincrònica per mostrar els colors de la seqüència amb un retard determinat
async function mostrar_colors(temps) {
    bloquejat = true; // Bloquegem la interacció de l'usuari mentre es mostra la seqüència
    for (let color of sequencia) {
        console.log("Mostrant color:", color); // Mostrem el color a la consola
        let mostrador = document.querySelector(".mostrador");
        mostrador.style.backgroundColor = color; // Canviem el color de fons
        await esperar(temps); // Esperem el temps especificat
        mostrador.style.backgroundColor = "white"; // Tornem el fons a blanc
        await esperar(500); // Esperem mig segon abans de continuar
    }
    bloquejat = false; // Permetem la interacció de l'usuari
    respostaUsuari = []; // Reiniciem la resposta de l'usuari
}

// Funció per comprovar si la resposta de l'usuari és correcta
function comprovarresposta() {
    for (let i = 0; i < respostaUsuari.length; i++) {
        if (respostaUsuari[i] !== sequencia[i]) { // Comprovem si hi ha un error
            alert("Malament! Torna a provar."); // Avisem l'usuari
            return; // Aturem l'execució de la funció
        }
    }

    if (respostaUsuari.length === sequencia.length) { // Si l'usuari ha completat correctament la seqüència
        bloquejat = true; // Bloquegem la interacció
        setTimeout(() => {
            afegirColor(); // Afegim un nou color
            mostrar_colors(1000); // Mostrem la nova seqüència
        }, 1000);
    }
}

// Funció per esperar un cert temps abans de continuar
function esperar(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
