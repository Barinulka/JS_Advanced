const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('.')); // будет смотреть в index.html в корне каталога

app.listen(3000, () => {
    console.log('server run')
});

app.get('/data', (req, res) => {
    res.send('data');
});

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {

});