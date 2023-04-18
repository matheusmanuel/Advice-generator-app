var btnConselhos = document.querySelector(".btn-conselhos");

function gerarConselho() {
  var url = "https://api.adviceslip.com/advice";
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function prencherBox() {
  var ELconselhoNumero = document.querySelector(".conselho-numero");
  var ElConselho = document.querySelector(".conselho");

  var conselho = JSON.parse(gerarConselho());

  ElConselho.textContent = conselho.slip.advice;
  ELconselhoNumero.textContent = "advice "+conselho.slip.id;
}


prencherBox();

btnConselhos.addEventListener("click", () => {
    var btn = document.getElementById("img-btn-conselhos");
    btnConselhos.classList.add('ativo');
  //mostra os conselhos
  setTimeout(() => {
    prencherBox();
    btnConselhos.classList.remove('ativo');
  }, 4000);

});


// função responsável pela verificação de internet
function ajax(){
  let xhr = new XMLHttpRequest(); //criando novo objeto XML
  xhr.open("GET","https://jsonplaceholder.typicode.com/posts", true); //sending get request on this URL
  xhr.onload = ()=>{ 
      //uma vez ajax carregado
      //se o status do ajax for igual a 200 ou menor que 300, isso significa que o usuário está obtendo dados desse URL fornecido
      //ou seu status de resposta é 200, o que significa que ele está online
      if(xhr.status == 200 && xhr.status < 300){
         //o usuário está com internet
          setTimeout(()=>{ //ocultar a notificação do brinde automaticamente após 5 segundos
              //remover o prenchimento branco
              online();
          }, 200);
      }else{
          //o usuário está sem internet
          offline(); //chamando a função offline se o status do ajax não for igual a 200 ou não inferior a 300
      }
  }
  xhr.onerror = ()=>{
      offline(); //chamando a função offline se o URL passado não estiver correto ou retornando 404 ou outro erro
  }
  xhr.send(); //enviando solicitação get para o URL passado
}

function offline(){ //função para quando o usúario estiver sem internet ela tem a função de mostrar aquele box de internet
  document.querySelector('body').classList.add('ativo-modal-internet');
}
function online(){ //função para quando o usúario estiver com internet ela tem a função de retirar aquele box de internet
  document.querySelector('body').classList.remove('ativo-modal-internet');
}

window.onload = ()=>{
  setInterval(()=>{ //esta função setInterval chama ajax frequentemente após 100ms
      ajax();
  }, 50);
}