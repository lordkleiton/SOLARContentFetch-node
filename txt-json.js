/*

Código para a abertura de txt => https://stackoverflow.com/a/46801928

o método pra abrir o txt é bem desnecessariamente complicado, mas nao tava com vontade
de criar o meu próprio

essa aplicação pega um arquivo txt simples, onde cada palavra fica em uma linha
e transforma em um json.

os arquivos devem se chamar, respectivamente: positivo.txt e negativo.txt;
ambos devem se localizar na pasta dicionarios

*/

var fs = require('fs');
var path = require('path');
var readStream = fs.createReadStream(path.join(__dirname, './dicionarios') + '/positivo.txt', 'utf8');
let data = ''
readStream.on('data', function(chunk) {
    data += chunk;
}).on('end', function() {
    dados = data.split("\n");

    var palavras = {
        "palavras":[]
    };

    
    for (var i = 0; i < dados.length; i++){
        palavras.palavras.push({"palavra": dados[i]});
    }

    console.log(palavras);
    fs.writeFile('./dicionarios/teste.json', JSON.stringify(palavras, null, 4), (err) => {  
        if (err) throw err;
    });
});