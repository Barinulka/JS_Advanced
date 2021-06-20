const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({extended: true}));
app.use(express.static('../app/')); // Путь до index.html
app.use(cors());

// Подниаем сервер 
app.listen(3000, () => {
    console.log('Server on');
});

// Получаем данные о товарах 
app.get("/catalogData", (req, res) => {
    fs.readFile('data/catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

// Добавляем товары в корзину
app.get('/cartData', (req, res) => {
    fs.readFile('data/cart.json', 'utf-8', (err, data) => {
        res.send(data)
    })
})

app.post("/addToCart", (req, res) => {
    fs.readFile("data/cart.json", "utf-8", (err, data) => {
      if (err) {
        res.send('{"result": 0}');
      } else {
        const cart = JSON.parse(data);
        const item = req.body;

        if (cart.find(elem => elem.id_product == item.id_product )){
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id_product == item.id_product) {
                    cart[i].count += 1;
                    console.log(`update count item(${cart[i].product_name}), count: ${cart[i].count}`);
                } 
            }
        } else {
            item.count = 1;
            cart.push(item);
            console.log(`add one item - ${item.product_name}`);
        }
        
        fs.writeFile("data/cart.json", JSON.stringify(cart), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
            res.send('{"result": 1}');
          }
        });
      }
    });
});