$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").toggle(); 
    // tras o conteudo da requisição e disponibiliza numa var
    $.get("http://localhost:3000/frases", trocaFraseAleatoria) // faz a requisição e chama a função 
    .fail(function(){
        $("#erro").toggle(); // mostra o erro 
        setTimeout(function(){
            $("#erro").toggle(); // esconde o erro apos 1s em meio
        },1500);
    })
    .always(function(){ //sempre escondendo o spinner
        $("#spinner").toggle();
    });
    
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");

    console.log(data); 
    var numeroAleatorio = Math.floor(Math.random() * data.length); // aredonda 

    frase.text(data[numeroAleatorio].texto);  // pega qualquer posição do numero e substitui na frase
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {

    $("#spinner").toggle();
    var fraseId = $("#frase-id").val(); // pega o val digitado pelo user 

    var dados = {id : fraseId}; //criacao do objeto JS que guarda a id

    //passando objeto como segundo parâmetro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

//arquivo frase.js
function trocaFrase(data) {

    console.log(data);

    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}
