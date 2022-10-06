/**
 * Imports
 * 
 * https://www.stanleyulili.com/node/node-modules-import-and-use-functions-from-another-file/
 */
require("dotenv").config();
const pusherService = require("./services/pusher-service");
const orderService = require("./services/order-service");
const WebSocket = require("ws");

/**
 * Variables
 */
const pair = "btcusdt";
let BUY_WHEN_AMOUNT = 20399;
let SELL_WHEN_AMOUNT = BUY_WHEN_AMOUNT + (BUY_WHEN_AMOUNT * (0.01/100));
const AMOUNT_TO_BUY = "0.001";
const AMOUNT_TO_SELL = "0.001";
let isOpened = false;

/**
 * Start a websocket stream connection
 */
const ws = new WebSocket(process.env.STREAM_URL + pair + "@bookTicker");

/**
 * Start to listening stream updates
 */
ws.onmessage = async (event) => {
    const obj = JSON.parse(event.data);
    const price = parseFloat(obj.a);
    const symbol = obj.s;

    const data = {};
    data.symbol = symbol;
    data.price = price;
    console.log(data);

    if (price < BUY_WHEN_AMOUNT && !isOpened) {
        orderService.newOrder("BTCUSDT", AMOUNT_TO_BUY, "BUY")
            .then(() => {
                pusherService
                    .sendEvent(process.env.PUSHER_CHANNEL, "criptobot-buy", {
                        event: "BUY",
                        data: obj
                    });
            });
        isOpened = true;
        SELL_WHEN_AMOUNT = price + (price * (0.03/100));
        console.log("Next sell will be: " + SELL_WHEN_AMOUNT);
    }
    
    if (price > SELL_WHEN_AMOUNT && isOpened) {
        orderService.newOrder("BTCUSDT", AMOUNT_TO_SELL, "SELL")
            .then(() => {
                pusherService
                    .sendEvent(process.env.PUSHER_CHANNEL, "criptobot-sell", {
                        event: "SELL",
                        data: obj
                    });
            });
        isOpened = false;
        BUY_WHEN_AMOUNT = price - (price * (0.05/100));
        console.log("Next buy will be: " + SELL_WHEN_AMOUNT);
    }
}
