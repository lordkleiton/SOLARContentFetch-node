/*

Código para a abertura de txt => https://stackoverflow.com/a/46801928

essa aplicação pega um arquivo txt simples, onde cada palavra fica em uma linha
e transforma em um json.

os arquivos devem se chamar, respectivamente: positivo.txt e negativo.txt;
ambos devem se localizar na pasta dicionarios

por enquanto ele não faz nada, só lê o arquivo e imprime no console

*/

var fs = require('fs');
var path = require('path');
var readStream = fs.createReadStream(path.join(__dirname, './dicionarios') + '/positivo.txt', 'utf8');
let data = ''
readStream.on('data', function(chunk) {
    data += chunk;
}).on('end', function() {
    console.log(data);
});