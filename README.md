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

#### Pass3 - Implementação

Todos os passos abaixo, deverão ser sequenciais (um após outro conforme tutorial).

No início do arquivo `index.js` importar as dependencias:
```js
require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");
const WebSocket = require("ws");
const Pusher = require("pusher");
```

Criar conexão `WebSocket` com a api de stream da Binance: 

- Par de ativo escolhido: `btcusdt`

```js
const ws = new WebSocket(process.env.STREAM_URL + "btcusdt@markPrice@1s");
```

Criar a variável que terá o valor alterado indicando se está em posição comprada (aberto) ou vendida (fechado):

```js
let isOpened = false;
```

Configurando Pusher para envio de notificações `pub/sub`:
```js
Pusher.logToConsole = true; // Não habilitar log em PROD

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});
```

Abrir conexão com api de stream e habilitar, em modo assíncrono, ficar recebendo informações. Para esse exemplo, uma simples estratégia estará sendo validada dentro do próprio método que está escutando novas mensagens ou atualizações.

Para termos uma visão de preço médio de baixa e alta, necessário avaliar o grafico de mercado para o ativo, nesse caso, BTC e usar uma técnica conhecida como `suporte de resistência`. 
Gráfico em: https://www.binance.com/pt-BR/trade/BTC_BUSD?_from=markets&theme=dark&type=spot 

```js
ws.onmessage = async (event) => {
    const obj = JSON.parse(event.data);
    console.log("Symbol: " + obj.s);
    console.log("Mark Price: " + obj.p);

    const price = parseFloat(obj.p);
    if(price < 19400 && !isOpened){
        console.log("Vender!");
        newOrder("BTCUSDT", "0.001", "SELL");
        isOpened = true;
        
        pusher.trigger("criptofinance-development", "criptobot-sell", {
          message: JSON.stringify(obj)
        });
    }
    else  if(price <= 19100 && isOpened){
        console.log("Comprar!");
        newOrder("BTCUSDT", "0.001", "BUY");
        isOpened = false;
        
        pusher.trigger("criptofinance-development", "criptobot-buy", {
          message: JSON.stringify(obj)
        });
    }
}
```

Criar a função que cria nova order, seja de venda ou de compra:

```js 
async function newOrder(symbol, quantity, side) {
    const data = { symbol, quantity, side };
    data.type = "MARKET";
    data.timestamp = Date.now();

    const signature = crypto
        .createHmac("sha256", process.env.SECRET_KEY)
        .update(new URLSearchParams(data).toString())
        .digest("hex");

    data.signature = signature;

    const result = await axios({
        method: "POST",
        url: process.env.API_URL + "/v1/order?" + new URLSearchParams(data),
        headers: { "X-MBX-APIKEY": process.env.API_KEY }
    });
    console.log(result.data);
}
```

### System Desing

![criptofinance](https://github.com/aulas-unisal/criptofinance/blob/main/criptofinance.drawio.png)
