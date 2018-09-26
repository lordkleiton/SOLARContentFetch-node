/*
    Criado em:
        25/09/18 - por Mario Silva

    Última edição em:
        25/09/18 - por Mario Silva
*/

//sistema de arquivos
var fs = require("fs");
//requests
var request = require('request');
//remove as tags html do conteudo
var striptags = require('striptags');
//transforma o texto em utf-8
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();


//variáveis relacionadas ao json de senhas
var arquivo = fs.readFileSync("login.json");
var conteudo = JSON.parse(arquivo);
var tamanho = Object.keys(conteudo).length;


//variável relacionada ao json de resultados
var dados = {
    "textos":[]
};


//executa pra cada usuario salvo
for (var i = 0; i < tamanho; i++){
    postToken();
}

//post inicial, pega o token de acesso
function postToken(){
    request.post(
        "http://solar.virtual.ufc.br/oauth/token",
        { 
            json:   {
                        grant_type: "password",
                        login: conteudo[i].login,
                        password: conteudo[i].senha,
                    } 
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var access_token = body.access_token;

                console.log("token de acesso:\n" + access_token + "\n");
                getGrupos(access_token);
            }
        }
    );
}

//pega as turmas do usuario
function getGrupos(access_token){
    request(
        "http://solar.virtual.ufc.br/api/v1/curriculum_units/groups/?access_token=" + access_token,
        {
            json: true 
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body != ""){
                    for (var i = 0; i < body.length; i++){
                        for (var j = 0; j < body[i].groups.length; j++){
                            var group_id = body[i].groups[j].id;

                            console.log("id da turma: " + group_id + "\n");
                            getForumID(access_token, group_id);
                        }
                    }
                }
            }
        }
    );
}

//pega a id dos foruns
function getForumID(access_token, group_id){
    request(
        "http://solar.virtual.ufc.br/api/v1/groups/" + group_id + "/discussions/?access_token=" + access_token,
        {
            json: true 
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body != ""){
                    for (var i = 0; i < body.length; i++){
                        var forum_id = body[i].id;

                        console.log("id do forum: " + forum_id + "\n");
                        getForumContent(access_token, group_id, forum_id);
                    }
                }
            }
        }
    );
}

//pega o conteudo dos foruns
function getForumContent(access_token, group_id, forum_id){
    request(
        "http://solar.virtual.ufc.br/api/v1/discussions/" + forum_id + "/posts/?group_id=" + group_id + "&access_token=" + access_token,
        {
            json: true 
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body != ""){
                    for (var i = 0; i < body.length; i++){
                        var content = striptags(body[i].content);
                        content = entities.decode(content);

                        console.log("mensagem:\n" + content + "\n");

                        //limpa o texto
                        content = content.replace(/(\r\n|\n|\r)/gm,"");
                        content = content.replace(/(\")/gm,"");

                        dados.textos.push({"texto": content});

                        fs.writeFile('textos.json', JSON.stringify(dados, null, 4), (err) => {  
                            if (err) throw err;
                        });
                    }
                }
            }
        }
    );
}