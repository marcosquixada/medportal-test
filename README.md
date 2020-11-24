# medportal-test

## Descrição do Projeto
<p align="justify"> Projeto de um APP em React Native + Api em Node desenvolvido para o teste da MedPortal </p>

### Lista ordenada
1. Cadastro de Usuários(SignUp);
2. Login de Usuários(SignIn);
3. Atualização de Grupos de Interesse pré-configurados(Subscribe/Unsubscribe);
4. Parametrização e Integração com Push Notifications One Signal;

> Status do Projeto: Concluído :heavy_check_mark:

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/marcosquixada/medportal-test.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd backend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ node server.js

# O servidor inciará na porta:8080 - acesse <http://localhost:8080>

```

### 🎲 Rodando o Front End (APP)

```bash

# Acesse uma nova pasta do projeto no terminal/cmd
$ cd mobile2

# Instale as dependências
$ npm install

# Certifique-se de ter um emulador rodando em sua máquina, acesse o arquivo src/service/api.js e coloque o ip da máquina servidor.

# Execute o comando de acordo com seu aparelho android ou ios:
$ react-native run-android
$ react-native run-ios

```
