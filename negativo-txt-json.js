/*

Código para a abertura de txt => https://stackoverflow.com/a/46801928

o método pra abrir o txt é bem desnecessariamente complicado, mas nao tava com vontade
de criar o meu próprio

essa aplicação pega um arquivo txt simples, onde cada palavra fica em uma linha
e transforma em um json.

o arquivo deve se chamar positivo.txt e deve se localizar na pasta dicionarios

os dois arquivos que convertem deveriam ser os mesmos, mas aconteceram problemas 
que não permitiram, entao ate ou eu ter tempo ou ter outra ideia, ficam separados mesmo

*/

var path = require('path');
let data = '';

converteNegativo();

function converteNegativo(){

    var fs = require('fs');
    var arquivo = fs.createReadStream(path.join(__dirname, './dicionarios') + '/negativo.txt', 'utf8');
    
    arquivo.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {

        var dados = data.split("\n");

        var palavras = {
            "palavras":[]
        };

        
        for (var i = 0; i < dados.length; i++){
            palavras.palavras.push({"palavra": dados[i]});
        }

        fs.writeFile('./dicionarios/negativo.json', JSON.stringify(palavras, null, 4), (err) => {  
            if (err) throw err;
            console.log("Arquivo criado com sucesso.");
        });
    });

}
