$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Thales"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();

}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $('html, body').animate(
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}

function novaLinha(usuario,palavras){

    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
}

function mostraPlacar() {
       /* $(".placar").toggle(); /* mostra ou esconde um elemento */
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");// seletor de hierarquia, obter as linhas da tr 
    
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text(); // seletores avançados do css, usuarios
        var palavras = $(this).find("td:nth-child(2)").text(); // palavras

        var score = { // cria um array 
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score); // coloca no array 

    });

    var dados = { placar: placar };  // cria o obj JavaScript 
    $.post("http://localhost:3000/placar", dados, function(){
        console.log("Salvou os dados no Servidor");
    })
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        
    $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos); // cria uma nova linha 
            
            //modificado aqui
            linha.find(".botao-remover").click(removeLinha);
            
            $("tbody").append(linha);
        });
    });
}