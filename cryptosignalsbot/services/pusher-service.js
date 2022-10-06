require("dotenv").config();
const Pusher = require('pusher-js');
const notificator = require("./notification-service");

const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
    cluster: process.env.PUSHER_APP_CLUSTER
});

async function listenerEvents() {
    console.log("Starting to listening events....");
    const dataEvent = {};
    dataEvent.channel = process.env.PUSHER_CHANNEL;
    dataEvent.buy_event = process.env.PUSHER_BUY_EVENT;
    dataEvent.sell_event = process.env.PUSHER_SELL_EVENT;
    console.log(dataEvent);

    const channel = pusher.subscribe(dataEvent.channel);

    channel.bind(dataEvent.buy_event, function(data) {
        // console.log(data);
        notificator.notify(data.message);
    });

    channel.bind(dataEvent.sell_event, function(data) {
        // console.log(data);
        notificator.notify(data.message);
    });
}

module.exports = { listenerEvents };