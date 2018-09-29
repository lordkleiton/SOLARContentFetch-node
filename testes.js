var bayes = require('bayes');
var classifier = bayes();

//sistema de arquivos
var fs = require("fs");

//variáveis relacionadas ao json de senhas
var arquivo = fs.readFileSync("./dicionarios/negativo.json");
var conteudo = JSON.parse(arquivo);
var palavras = conteudo.palavras;
var tamanho = Object.keys(palavras).length;

var dicionario = [];

for (var i = 0; i < tamanho; i++){
    dicionario.push(palavras[i].palavra);
}

classifier.learn(dicionario.toString(), 'negative');

classifier.categorize('oi, meu nome é mário silva e eu amo muito mesmo essa função, é super interessante e me sinto muito motivado a continuar estudando sobre esse assunto');

// serialize the classifier's state as a JSON string.
var stateJson = classifier.toJson()

// load the classifier back from its JSON representation.
var revivedClassifier = bayes.fromJson(stateJson)

console.log(stateJson);