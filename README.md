# Criptofinance

### Criptobot

O objetivo de um robô é que o mesmo possa, de maneira ininterrupta, executar uma tarefa preaviamente criada e implementada.
Para o robê de exemplo aqui implementado, a ideia será monitorar um ativo e criar posição de compra e venda de acordo com a estratégia escolhida.
Para consumo de dados, a API utilizada será da Binance.

Para o desenvolvimento do bot, será utilizado Node.js.

API Rest da Binance: https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md

#### Passo 1 - Criando API KEY e SECRET KEY
1. Criar uma conta no https://github.com
2. Acessar https://testnet.binance.vision 
3. Logar com a conta `github` criada
4. Clicar sobre a opção `Generate HMAC_SHA256 Key` e seguir os passos
5. Salvar as informações pois não será possível recuperá-las novamente

#### Passo 2 - Criando o projeto:
1. Criar uma pasta com o nome `cryptobot` e acessar a pasta criada
2. Dentro da pasta, executar `npm init -y`
3. Dentro da pasta, executar `npm install pusher axios crypto ws dotenv`
4. Dentro da pasta, criar um arquivo chamado `.env` e nele deve conter as seguintes variáveis: 

Variável            | Valor
--------------------|---------------------------------------------
API_URL             | https://testnet.binance.vision/api
STREAM_URL          | wss://testnet.binance.vision/ws/
API_KEY             | Valor para `API KEY` gerado no passo 1
API_SECRET_KEY      | Valor para `SECRET KEY` gerado no passo 1
PUSHER_APP_ID       | 1487951
PUSHER_APP_KEY      | f5c7a4cb577986aa4895
PUSHER_APP_SECRET   | 9acb182b7197af722a83
PUSHER_APP_CLUSTER  | us2
  
5. Dentro da pasta, criar um arquivo chamado `index.js`
6. Seguir os passos de implementação a seguir (sempre no arquivo `index.js`)

#### Passo 3 - Implementação Cryptobot

Todos os passos abaixo, deverão ser sequenciais (um após outro conforme tutorial).

Adaptar o `cryptobot` como mostra a imagem abaixo baseando no código fonte presente no repositório:

![cryptobot](https://github.com/aulas-unisal/criptofinance/blob/main/cryptobot.png)

Variáveis de ambiente:

```shell
API_URL=https://testnet.binance.vision/api
STREAM_URL=wss://testnet.binance.vision/ws/
API_KEY=
API_SECRET_KEY=
PUSHER_APP_ID=1487951
PUSHER_APP_KEY=f5c7a4cb577986aa4895
PUSHER_APP_SECRET=9acb182b7197af722a83
PUSHER_APP_CLUSTER=us2
PUSHER_CHANNEL=criptofinance-development
```

Para termos uma visão de preço médio de baixa e alta, necessário avaliar o grafico de mercado para o ativo, nesse caso, BTC e usar uma técnica conhecida como `suporte de resistência`. 
Gráfico em: https://www.binance.com/pt-BR/trade/BTC_BUSD?_from=markets&theme=dark&type=spot 

#### Passo 4 - Implementação Cryptosignals

Seguir os passos de criar um projeto com node.js como indicado no `Passo 2`. 

Implementar os arquivos no projeto conforme o código presente no repositório.

Estrutura do projeto:
![cryptosignals](https://github.com/aulas-unisal/criptofinance/blob/main/cryptosignals.png)

Variáveis de ambiente:
```shell
PUSHER_APP_ID=1487951
PUSHER_APP_KEY=f5c7a4cb577986aa4895
PUSHER_APP_SECRET=9acb182b7197af722a83
PUSHER_APP_CLUSTER=us2
PUSHER_CHANNEL=criptofinance-development
PUSHER_BUY_EVENT=criptobot-buy
PUSHER_SELL_EVENT=criptobot-sell
```

### System Desing

![cryptofinance](https://github.com/aulas-unisal/criptofinance/blob/main/cryptofinance.png)
