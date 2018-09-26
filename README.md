# SOLARContentFetch-node
Versão da primeira parte da minha aplicação do tcc, dessa vez feita em nodejs

# Como instalar
É preciso clonar esse repositório numa pasta qualquer que você deseje usar

Depois, abra um terminal na raiz da pasta do projeto e digite `npm install`

# Como configurar
Na raiz do projeto, crie um arquivo chamado `login.json` e insira normalmente suas informações no formato

```json
[
    {
        "login" : "logindousuario1aqui",
        "senha" : "senhadousuario1aqui"
    },
    {
        "login" : "logindousuario2aqui",
        "senha" : "senhadousuario2aqui"
    }
]
```

# Como usar
Basta abrir o terminal e digitar `node index.js`

Ao fazer isso, se algum dos usuários tiver uma conta ativa e com disciplinas ativas no SOLAR, será criado um arquivo JSON chamado `textos.json` onde se encontram todos os textos escritos nos fóruns que o usuário tem acesso. 
