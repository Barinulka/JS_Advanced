// Делаем сервер
const http = require('http');
const static = require('node-static');

const file = new static.Server('.');

http.createServer((req, res) => {
    file.serve(req, res);
}).listen(3000); // порт сервера (localhost:3000)