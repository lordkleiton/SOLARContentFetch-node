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

//caso queira testar com um texto qualquer descomente a linha abaixo e comente a outra
var tt = 'Para odiar alguém gastamos energia, neurônios e tempo.';
//var tt = todosTextos[40];


//essa parte é pra quando tudo ja funcionar direitinho
/*
for (var i = 0; i < tamanhoTextos; i++){
    console.log(todosTextos[i]);
    console.log("\n", classifier.categorize(todosTextos[i]));
}

for (var i = 0; i < tamanhoTextos; i++){
    tt = sw.removeStopwords(todosTextos[i].split(' '), dicionarioS).toString().replace(/,/g, ' ');
    console.log(tt);
    console.log("\n", classifier.categorize(tt));
}
*/

console.log(tt);
console.log("\n", classifier.categorize(tt));

tt = sw.removeStopwords(tt.split(' '), dicionarioS).toString().replace(/,/g, ' ');
console.log(tt);
console.log("\n", classifier.categorize(tt));