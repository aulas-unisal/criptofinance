# Criptofinance

### Criptobot

O objetivo de um robô é que o mesmo possa, de maneira ininterrupta, executar uma tarefa preaviamente criada e implementada.
Para o robê de exemplo aqui implementado, a ideia será monitorar um ativo e criar posição de compra e venda de acordo com a estratégia escolhida.
Para consumo de dados, a API utilizada será da Binance.

Para o desenvolvimento do bot, será utilizado Node.js.

#### Criando API KEY e SECRET KEY
1. Criar uma conta no https://github.com
2. Acessar https://testnet.binance.vision 
3. Logar com a conta `github` criada
4. Clicar sobre a opção `Generate HMAC_SHA256 Key` e seguir os passos
5. Salvar as informações pois não será possível recuperá-las novamente

#### Criando o projeto:
1. Criar uma pasta com o nome `cryptobot` e acessar a pasta criada
2. Dentro da pasta, executar `npm init -y`
3. Dentro da pasta, executar `npm install pusher axios crypto ws dotenv`
4. Dentro da pasta, criar um arquivo chamado `.env` e nele deve conter as seguintes variáveis: `API_URL=`, `STREAM_URL=wss://testnet.binance.vision/ws/`, `API_KEY=`, `API_SECRET_KEY=`
5. Dentro da pasta, criar um arquivo chamado `index.js`

### System Desing

![criptofinance](https://github.com/aulas-unisal/criptofinance/blob/main/criptofinance.drawio.png)
