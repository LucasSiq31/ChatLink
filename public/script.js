//Funcionamento  --------------------------

//Cor padrão da mensagem
var corInput = cinza;

//Função que pega a cor que o usuário escolheu
function infoUsuario() {
    corInput = document.querySelector("input[type=radio][name=cor]:checked").value;
}

//Cria uma instância do socket.io
const socket = io();

//Seleciona o valor do input de mensagens
const mensagemInput = document.getElementById("mensagem");

//Seleciona a lista de mensagens
const mensagens = document.getElementById("mensagens");

//Seleciona o valor do input nome de usuário
const nomeInput = document.getElementById("nome");

//Id do socket
  var socketID;

//Evento de envio do formulário
document.querySelector("form").addEventListener("submit", (event) => {
  //Padrão de envios
  event.preventDefault();

  const nome = nomeInput.value;
  const mensagem = mensagemInput.value;
  const cor = corInput;

  //Variáveis de Tempo
  var data = new Date();
  hora = data.getHours();
  minutos = data.getMinutes();

  //Função que arruma os minutos
  var min
  if(minutos < 10){
    min = '0'+minutos
  }else{
    min = minutos
  }

  //verifica se os valores estão em branco
  nome.trim() &&
    mensagem.trim() &&
    socket.emit("chat message", { nome, mensagem, cor, socketID, hora, min });

  //Limpar o input da mensagem
  mensagemInput.value = "";
  //Desabilita o input do usuário
  nomeInput.disabled = true;
});

// Seleciona a div que contém o conteúdo
var minhaDiv = document.getElementById("mensagens");

//Pega o id do usuário para verificação da mensagem
socket.on('connect', function() {
  socketID = socket.id;
  console.log('Socket ID:', socketID);
});

//Envia e recebe a mensagem
socket.on("chat message", (dados) => {
  //Verifica se a mensagem foi enviada ou recebida
  //para posição dela no chat

  if(socketID == dados.socketID){ //Enviada
    
    //Criar um elemento de lista para exibir a mensagem
    const lista = document.createElement("div");
    const mgmEnviada = document.createElement("p");
    const horario = document.createElement("p");

    //Coloca a classe de cor e de enviada
    lista.className = dados.cor + " enviado";
    //Coloca a classe para estilizar o horário
    horario.className = "horario";

    //Define o texto da mensagem
    mgmEnviada.textContent = dados.mensagem
    horario.textContent = `${dados.hora}:${dados.min}`
      
    //Adicionar o elemento de lista de mesnagem
    lista.appendChild(mgmEnviada);
    lista.appendChild(horario);
    mensagens.appendChild(lista);
    
    //Coloca o chat no final
    rolarParaBaixo();

  }else{ //Recebida

    //Criar um elemento de lista para exibir a mensagem
    const lista = document.createElement("div");
    const nomeMgm = document.createElement("b");
    const divisoria = document.createElement("hr");
    const mgmEnviada = document.createElement("p");
    const horario = document.createElement("p");

    //Coloca a classe de cor e de enviada
    lista.className = dados.cor;
    //Coloca a classe para estilizar o horário
    horario.className = "horario";
    
    //Define o texto da mensagem
    nomeMgm.textContent = dados.nome
    mgmEnviada.textContent = dados.mensagem
    horario.textContent = `${dados.hora}:${dados.min}`
      
    //Adicionar o elemento de lista de mesnagem
    lista.appendChild(nomeMgm);
    lista.appendChild(divisoria);
    lista.appendChild(mgmEnviada);
    lista.appendChild(horario);
    mensagens.appendChild(lista);
      
    //Coloca o chat no final
    rolarParaBaixo();

    }
});

//Extra  --------------------------

// Função para rolar a div até o final
function rolarParaBaixo() {
    minhaDiv.scrollTop = minhaDiv.scrollHeight;
}

//Funções modo claro e escuro
function modoEscuro(){
  document.getElementById('css').href = 'style2.css'
  document.getElementById('icone-Modo').innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-brightness-high-fill' viewBox='0 0 16 16' onclick='modoClaro()'><path d='M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708'/></svg>"
}

function modoClaro(){
  document.getElementById('css').href = 'style.css'
  document.getElementById('icone-Modo').innerHTML = "<svg class= xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-moon-fill' viewBox='0 0 16 16' onclick='modoEscuro()'><path d='M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278'/></svg>"
}

//Função que mostra o modal na tela
function mostraModal(){
    //Mostrando o modal do bootstrap
    var galleryModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    });
    galleryModal.show();
}

//Função que limpa todo o chat
function limparChat(){
  Swal.fire({
    title: "Você deseja apagar todas as mensagens?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Apagar",
    denyButtonText: `Manter`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Apagado!", "", "success");
      document.getElementById('mensagens').innerHTML = ""
    } else if (result.isDenied) {
      console.log('negado')
    }
  });
}

//Função para adicionar borda no check
function addBorda(elementoClicado) {
  var elementos = document.querySelectorAll(".escolha");
  elementos.forEach(function(elemento) {
      elemento.classList.remove("borda-branca");
  });
  elementoClicado.classList.add("borda-branca");
}