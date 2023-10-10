const ahorcadoImagen = document.querySelector(".hangman-box img");
const mostrarPalabra = document.querySelector(".word-display");
const adivinaTexto = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const modeloGame = document.querySelector(".game-modal");
const jugardeNuevoBtn = document.querySelector(".play-again");

let palabraActual, resptCorrectas, contadorRespMal;
const maxAdivinar = 6;

// Reinicia todas las variables del juego y los elementos UI (user interface) 
const reinicioGame = () => {
    resptCorrectas = [];
    contadorRespMal = 0;
    ahorcadoImagen.src = `../imagesHangman/hangman-${contadorRespMal}.svg`;
    adivinaTexto.innerText = `${contadorRespMal} / ${maxAdivinar}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    mostrarPalabra.innerHTML = palabraActual.split("").map(() => `<li class="letter"></li>`).join("");
    mostrarPalabra.style.setProperty("filter", "invert(0.95)"); 
    modeloGame.classList.remove("show");
}

// Selecciona una palabra aleatoria y la pista de la palabra
const getRandomWord = () => {
    const { palabra, pista } = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    palabraActual = palabra;
    // console.log(palabra);
    document.querySelector(".hint-text b").innerHTML = pista;
    reinicioGame();
}

// Cartel final de la partida y sus características 
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Adivinista la palabra` : `La palabra correcta era:`;
        modeloGame.querySelector("img").src = `../imagesHangman/${isVictory ? 'victory' : 'lost'}.gif`;
        modeloGame.querySelector("h4").innerText = `${isVictory ? '¡Felicidades!' : 'Game Over!'}`;
        modeloGame.querySelector("p").innerHTML = `${modalText} <b>${palabraActual}</b>`;
        modeloGame.classList.add("show");
    }, 300);
}

// Identifica si existe la letra en la palabra 
const initGame = (button, clickedLetter) => {
    if(palabraActual.includes(clickedLetter)){
        // Muestra todas las letras correctas en la visualización de palabras
        [...palabraActual].forEach((letter, index) => {
            if(letter === clickedLetter){
                resptCorrectas.push(letter);
                mostrarPalabra.querySelectorAll("li")[index].innerText = letter;
                mostrarPalabra.querySelectorAll("li")[index].classList.add("adivinado");
            }
        })
    } else {
        // Si seleccionas una letra que no existe entonces se actualizará tanto el contador como la imagen del sujeto en la horca.
        contadorRespMal++;
        ahorcadoImagen.src = `../imagesHangman/hangman-${contadorRespMal}.svg`;
    }

    button.disabled = true;
    adivinaTexto.innerText = `${contadorRespMal} / ${maxAdivinar}`;

    // Llamar a la funcion gameOvr si alguna de estas condiciones se cumple
    if(contadorRespMal === maxAdivinar) return gameOver(false);
    if(resptCorrectas.length === palabraActual.length) return gameOver(true);
}

// Crear botones de teclado y, añadir un evento del boton y la letra seleccionada
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
jugardeNuevoBtn.addEventListener("click", getRandomWord);

// init(abreviatura de initialization) es el primer preoceso en ejecución tras la carga del núcleo y el que a su vez genera todos los demás procesos.

