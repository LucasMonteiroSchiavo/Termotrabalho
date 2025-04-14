const palavras = ["livro", "carta", "banco", "casal", "nuvem"];
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
let tentativas = 0;

const gameBoard = document.getElementById("game");

// cria as 6 linhas com 5 quadrados
for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 5; j++) {
    const box = document.createElement("div");
    box.className = "box";
    row.appendChild(box);
  }
  gameBoard.appendChild(row);
}

function submitGuess() {
  const input = document.getElementById("guessInput");
  const chute = input.value.toLowerCase();

  if (chute.length !== 5) {
    mostrarMensagem("A palavra deve ter 5 letras!");
    return;
  }

  if (tentativas >= 6) {
    mostrarMensagem("Fim de jogo! A palavra era: " + palavraSecreta.toUpperCase());
    return;
  }

  const row = gameBoard.children[tentativas];

  for (let i = 0; i < 5; i++) {
    const box = row.children[i];
    box.textContent = chute[i];

    if (chute[i] === palavraSecreta[i]) {
      box.classList.add("green");
    } else if (palavraSecreta.includes(chute[i])) {
      box.classList.add("yellow");
    } else {
      box.classList.add("gray");
    }
  }

  tentativas++;

  if (chute === palavraSecreta) {
    mostrarMensagem("🎉 Parabéns! Você acertou!");
    input.disabled = true;
  } else if (tentativas === 6) {
    mostrarMensagem("😢 Você perdeu! A palavra era: " + palavraSecreta.toUpperCase());
    input.disabled = true;
  } else {
    mostrarMensagem("");
  }

  input.value = "";
}

function mostrarMensagem(msg) {
  document.getElementById("message").textContent = msg;
}
