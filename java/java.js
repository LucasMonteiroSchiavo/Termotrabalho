const palavras = ["livro", "carta", "banco", "casal", "nuvem", "banco", "banca"];
// lista das palavras possiveis no jogo
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
// escolhe uma palavra random da lista como a resposta correta

let tentativas = 0;
// armazenando quantas tentativas o jogador fez


const gameBoard = document.getElementById("game");
// seleciona o elemento onde o tabuleiro do jogo vai ser criado


// cria as 6 linhas com 5 quadrados
for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.className = "row";
    // adiciona a classe "row" pra estilizar

  for (let j = 0; j < 5; j++) {
    const box = document.createElement("div");
        // cria uma nova caixinha (div)

    box.className = "box";
    //adiciona a classe "box" pra estilizar
    row.appendChild(box);
     // adiciona a caixinha na linha
  }
  gameBoard.appendChild(row);
    // adiciona a linha inteira no tabuleiro

}

function submitGuess() {
  const input = document.getElementById("guessInput");
    // pega o campo de input onde o jogador digitou

  const chute = input.value.toLowerCase();
    // pega o valor digitado e converte pra letras minúsculas

  if (chute.length !== 5) {
    mostrarMensagem("A palavra deve ter 5 letras!");
        // garante que a palavra tem 5 letras
    return;
  }

  if (tentativas >= 6) {
    mostrarMensagem("Fim de jogo! A palavra era: " + palavraSecreta.toUpperCase());
        // se passou das 6 tentativas, exibe mensagem de derrota
    return;
  }

  const row = gameBoard.children[tentativas];
    // seleciona a linha correspondente à tentativa atual


  for (let i = 0; i < 5; i++) {
    const box = row.children[i];
        // pega a caixinha da linha atual

    box.textContent = chute[i];
        // coloca a letra digitada dentro da caixinha

        if (chute[i] === palavraSecreta[i]) {
            box.classList.add("green");
            // se a letra estiver na posição certa, pinta de verde
          } else if (palavraSecreta.includes(chute[i])) {
            box.classList.add("yellow");
            // se a letra estiver na palavra mas na posição errada, pinta de amarelo
          } else {
            box.classList.add("gray");
            // se a letra não existir na palavra, pinta de cinza
          }
        }
      
        tentativas++;
        // aumenta o número de tentativas após o chute
      
        if (chute === palavraSecreta) {
          mostrarMensagem("🎉 Parabéns! Você acertou!");
          input.disabled = true;
          // se o chute for igual à palavra secreta, mostra mensagem de vitória
        } else if (tentativas === 6) {
          mostrarMensagem("😢 Você perdeu! A palavra era: " + palavraSecreta.toUpperCase());
          input.disabled = true;
          // se usou todas as tentativas, mostra a resposta correta
        } else {
          mostrarMensagem("");
          // limpa mensagem se ainda não terminou
        }
      
        input.value = "";
        // limpa o campo de input para o próximo chute
      }
      
      function mostrarMensagem(msg) {
        document.getElementById("message").textContent = msg;
        // exibe a mensagem passada na área de mensagens
      }