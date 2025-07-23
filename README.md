# fullso_part3

1. Crie uma pasta para o projeto
Abra o terminal (ou prompt de comando) e execute:

mkdir backend
cd backend

2. depois  Inicialize o projeto com:

npm init

Responda às perguntas como:

name: backend
version: 0.0.1
description: Projeto de backend com Node.js
entry point: index.js
test command: (pressione Enter)
git repository: (pressione Enter)
author: dwp
license: MIT

3. Vamos fazer uma pequena alteração no objeto scripts:

{
  // ...
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}

4. iniciar o servidor:

npm install express

5. Instalar o Express:

node index.js
ou
npm start

6. Vamos instalar o nodemon definindo-o como uma dependência de desenvolvimento (development dependency) com o comando:
(o nodemon é usado para atualizar a aplicação e não precisarmos reinicializá-la toda vez que fizermos alguma alteração)

npm install --save-dev nodemon

7. Podemos iniciar nossa aplicação com o nodemon assim:

node_modules/.bin/nodemon index.js

8. O comando é longo e bastante desagradável, portanto, vamos definir um script npm dedicado para ele no arquivo package.json:

{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}

9. Agora só precisamos digitar:

npm run dev

10. Instalar o morgan:

npm install morgan

11. Instalar o cors no backend:

npm install cors

12. Criar conta no Render e logar no github

13. ir ao diretorio do frontend e rodar:

npm run build

14. copiar este diretorio para a raiz do backend

15. alterar no package.json:

{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../frontend && npm run build && cp -r build ../backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
  }
}

npm run build:ui        constrói o front-end e copia a versão de produção no repositório do back-end. 
npm run deploy:full     contém também os comandos necessários git para atualizar o repositório do back-end.

16. No Windows, scripts npm são executados em cmd.exe como o shell padrão que não oferece suporte a 
comandos bash. Para que os comandos bash acima funcionem, é possível alterar o shell padrão para Bash 
(na instalação padrão do Git para Windows) da seguinte forma:

17. dependendo do computador pode ter esses caminhos:

npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
npm config set script-shell "C:\\Users\\daniel.pitsch\\AppData\\Local\\Programs\\Git\\bin\\bash.exe"

18. nas dependencias do backend em package.json (usar só em ambiente de desenvolvimento):

"proxy": "http://localhost:3001"

19. As Ferramentas do Desenvolvedor do Chrome:

node --inspect index.js

20. Obs.: Uma versão mais recente do Visual Studio Code pode ter Run em vez de Debug. Além disso, talvez você 
precise configurar seu arquivo launch.json para iniciar a depuração. Isso pode ser feito selecionando Add Configuration... 
no menu, que está localizado ao lado do botão verde de play e acima do menu VARIABLES, selecionando Run "npm start" in a 
debug terminal. Para instruções de configuração mais detalhadas, leia a documentação sobre depuração do Visual Studio Code.

21. Também é possível depurar o código com o Console do Desenvolvedor do Chrome, iniciando a aplicação com o comando:

node --inspect index.js

22. MongoDB Atlas, ----, mongose:
https://www.youtube.com/watch?v=bBA9rUdqmgY
https://www.youtube.com/watch?v=-AQZuPL1hD0

23. Criar database: (cluster)

Free => aws, sao paulo => create deployment

24. Quickstart:

Username, Password => Create user => Add my current ip adress => Finish and close => Go to database

25. Clusters:

Connect => Drivers => Node.js
nom install mongodb
mongodb+srv://danielwarellapitsch:<db_password>@cluster0...  => Done

26. usaremos a biblioteca Mongoose, que oferece uma API de alto nível, para instala-la:

npm install mongoose

27. Ainda não vamos adicionar nenhum código relacionado ao Mongo em nosso backend. Em vez disso, 
vamos fazer uma aplicação prática criando um novo arquivo, mongo.js.
Depois de criado o arquivo vamos rodar:

node mongo.js yourpassword

28. Browse collections:
Collections => podemos ver que a api que foi criada no mongo.js

29. mudar nome padrão:

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/PhonebookApp?retryWrites=true&w=majority`
  MONGODB_URI=mongodb+srv://danielwarellapitsch:mongo@cluster0.tboy7ef.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=Cluster0

30. post:

node mongo.js suasenha Anna 040-1234556

31. get:

node mongo.js suasenha

32. Rodar backend:

npm run dev

33. Rodar frontend:

npm start --reset-cache

