/**
 * https://telegraf.js.org/index.html
 */
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

async function notify(data) {
    console.log(data);
    const message = JSON.parse(data);
    // console.log(message);
    // console.log(message.event);
    // console.log(message.data);

    try {
        const text = `
            <b>Action:</b> ${ message.event }
            <b>Symbol:</b> ${ message.data.s }
            <b>Price:</b>  ${ message.data.a }
        `;
        bot.telegram.sendMessage(-1001855500426, text, { parse_mode: 'HTML' });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { notify };