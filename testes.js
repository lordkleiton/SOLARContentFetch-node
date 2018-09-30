var bayes = require('bayes');
var classifier = bayes();

//sistema de arquivos
var fs = require("fs");

//variáveis relacionadas ao json de senhas
var arquivoN = fs.readFileSync("./dicionarios/negativo.json");
var conteudoN = JSON.parse(arquivoN);
var palavrasN = conteudoN.palavras;
var tamanhoN = Object.keys(palavrasN).length;

var arquivoP = fs.readFileSync("./dicionarios/positivo.json");
var conteudoP = JSON.parse(arquivoP);
var palavrasP = conteudoP.palavras;
var tamanhoP = Object.keys(palavrasP).length;

var dicionarioN = [];
var dicionarioP = [];

for (var i = 0; i < tamanhoN; i++){
    dicionarioN.push(palavrasN[i].palavra);
}

for (var i = 0; i < tamanhoP; i++){
    dicionarioP.push(palavrasP[i].palavra);
}

//ensina ao algoritmo as palavras negativas e positivas
classifier.learn(dicionarioN.toString(), 'negative');
classifier.learn(dicionarioP.toString(), 'positive');


//categoriza a mensagem
console.log(classifier.categorize(''));

// serialize the classifier's state as a JSON string.
var stateJson = classifier.toJson()

// load the classifier back from its JSON representation.
var revivedClassifier = bayes.fromJson(stateJson)

console.log("negativas: ", tamanhoN);
console.log("positivas: ", tamanhoP);