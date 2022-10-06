const axios = require("axios");
const crypto = require("crypto");

async function newOrder(symbol, quantity, side) {
    const data = { symbol, quantity, side };
    data.type = "MARKET";
    data.timestamp = Date.now();

    const signature = crypto
        .createHmac("sha256", process.env.API_SECRET_KEY)
        .update(new URLSearchParams(data).toString())
        .digest("hex");

    data.signature = signature;

    try {
        const result = await axios({
            method: "POST",
            url: process.env.API_URL + "/v3/order?" + new URLSearchParams(data),
            headers: { "X-MBX-APIKEY": process.env.API_KEY }
        });
        console.log(result.data);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { newOrder };