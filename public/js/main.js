var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

// OU atalho $(function() {} 

$(document).ready(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo); // chama a function 
});

function atualizaTamanhoFrase() {

    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);

}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();

    campo.one("focus", function(){
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });

}

function finalizaJogo(){
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaContadores() {

    campo.on("input", function(){

        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
     
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
      
     });
}

function inicializaMarcadores() {

    var frase = $(".frase").text(); // pega o conteudo da frase 

    campo.on("input", function(){
        var digitado = campo.val(); // pega o conteudo q esta digitando 
    
        var comparavel = frase.substr(0,digitado.length);
            
        if(digitado == comparavel){
            campo.addClass("borda-verde");
            campo.removeClas("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClas("borda-verde");
        }
    });
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha"); 
    campo.removeClass("borda-verde"); 
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Thales";
    var numPalavras = $("#contador-palavras").text();

    var linha = "<tr>" +
                    "<td>" + usuario + "</td>" +
                    "<td>" + numPalavras + "</td>" +
                "</tr>";
 
    corpoTabela.prepend(linha);

}

// $("#botao-reiniciar").on("click", function(){
//   console.log("Botão Clicado");
// });


