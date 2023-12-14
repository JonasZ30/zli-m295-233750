const express = require('express');
const readline = require('readline');
const request = require('request');

const app = express();
const port = 3050;
let temperature;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Geben Sie eine Postleitzahl ein: ', (userInput) => {
    let url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${userInput}00`;
    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            const currentWeather = data.currentWeather;
            if (currentWeather) {
                temperature = currentWeather.temperature;
                if (temperature !== undefined) {
                    console.log('Temperature:', temperature);
                    app.get('/', (request, response) => {
                        response.send(`The temperature is: ${temperature.toString()}`);
                    });
                } else {
                    console.log('Temperature information not available.');
                }
            } else {
                console.log('Weather data not available.');
            }
            rl.close()
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
