const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true
});

async function sendEvent(channel, event, obj) {
    pusher.trigger(channel, event, {
        message: JSON.stringify(obj)
    });
}

module.exports = { sendEvent };