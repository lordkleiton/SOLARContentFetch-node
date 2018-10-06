//bayes
var bayes = require('bayes');
var classifier = bayes();

//stopwords
sw = require('stopword');
ptSW = sw.pt;

//sistema de arquivos
var fs = require("fs");



//variáveis relacionadas aos json de dicionarios
//dicionario negativo
var arquivoN = fs.readFileSync("./dicionarios/negativo.json");
var conteudoN = JSON.parse(arquivoN);
var palavrasN = conteudoN.palavras;
var tamanhoN = Object.keys(palavrasN).length;

//dicionario positivo
var arquivoP = fs.readFileSync("./dicionarios/positivo.json");
var conteudoP = JSON.parse(arquivoP);
var palavrasP = conteudoP.palavras;
var tamanhoP = Object.keys(palavrasP).length;

//stopwords
var arquivoS = fs.readFileSync("./dicionarios/stopwords-pt.json");
var conteudoS = JSON.parse(arquivoS);
var palavrasS = conteudoS.palavras;
var tamanhoS = Object.keys(palavrasS).length;

//preenche os dicionarios pra uso
var dicionarioN = [];   //negativas
var dicionarioP = [];   //positivas
var dicionarioS = [];   //stopwords

for (var i = 0; i < tamanhoN; i++){
    dicionarioN.push(palavrasN[i].palavra);
}

for (var i = 0; i < tamanhoP; i++){
    dicionarioP.push(palavrasP[i].palavra);
}

for (var i = 0; i < tamanhoS; i++){
    dicionarioS.push(palavrasS[i].palavra);
}



//captura dos textos do json
var textoRaw = fs.readFileSync("./textos.json");
var conteudoTextos = JSON.parse(textoRaw);
var texto = conteudoTextos.textos;
var tamanhoTextos = Object.keys(texto).length;

//preenche o vetor de textos
var todosTextos = [];   

for (var i = 0; i < tamanhoTextos; i++){
    todosTextos.push(texto[i].texto);
}


//ensina ao algoritmo as palavras negativas e positivas
classifier.learn(dicionarioN.toString(), 'negative');
classifier.learn(dicionarioP.toString(), 'positive');

/*
//categoriza a mensagem
console.log(classifier.categorize('Heráclito(Devir) e Parmênides(Ser) nos trasmitem conceitos distintos, uma vez que para Heráclito o devir é a realidade, a harmonia quando se tem os opostos em equilíbrio daí origina-se o Ser. Parmênides defende a ideia de que o Ser, é a única realidade existente pelo princípio não contradição. Entre todas as divergências existentes é notório perceber a influência destes pensamentos no mundo atual e qual a percepção que temos dos mesmos. Somos seres mutáveis há fatos a se pensar!'));
console.log(classifier.categorize('que vontade de matar'));


// serialize the classifier's state as a JSON string.
var stateJson = classifier.toJson()

// load the classifier back from its JSON representation.
var revivedClassifier = bayes.fromJson(stateJson)
*/
//console.log("negativas: ", tamanhoN);
//console.log("positivas: ", tamanhoP);

var tt = 'Você não ouviu o que eu disse?';

//console.log(tt);

tt = sw.removeStopwords(tt.split(' '), dicionarioS).toString().replace(/,/g, ' ');

console.log(tt);

console.log("\n", classifier.categorize(tt));