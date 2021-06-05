const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
    constructor(title, price, id, image = 'https://via.placeholder.com/150') {
        this.title = title;
        this.price = price;
        this.id = id;
        this.image = image;
    }
    render() {
        return `<div class="goods-item">
            <img class="goods-item__image" src="${this.image}" alt="Some img">
            <h3 class="goods-item__title">${this.title}</h3>
            <p class="goods-item__price">${this.price}</p>
            <button class="goods-item__add-cart" data-id="${this.id}">В корзину</button>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods  = [];
    }

    async fetchGoods() {
        const responce = await fetch(`${API_URL}/catalogData.json`);
        if (responce.ok) {
          const catalogItems = await responce.json();
          this.goods = catalogItems;
        } else {
          alert("Ошибка при соединении с сервером");
        }
      }

    totalPrice () {
        let total = 0;
        for (let good of this.goods) {
            total += good.price;
            
        }
        return total;
    }

    render() {
        let listHtml = "";
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods').insertAdjacentHTML('beforeend', listHtml);
    }

    addToCart() {
        const cartList = new CartList();
        cartList.fetchGoods()
    
        let cartButtons = document.querySelectorAll('.goods-item__add-cart');
        cartButtons.forEach((add) => {
            add.addEventListener('click', (e) => {
               const dataId = e.target.getAttribute('data-id');
               cartList.render(dataId);
            });
        }); 
    }
}

class CartItem {
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.orderArray = [];
    }

    render() {
        return `<div class="cart-item">
            <h3 class="cart-item__title">${this.title}</h3>
            <p class="cart-item__price">${this.price} ед.</p>
            <p class="cart-item__quant">${this.quantity} шт.</p>
        </div>`;
    }
}

class CartList {
    constructor(quantity = 1) {
        this.orderArray = [];
        this.products = '';
        this.quantity = quantity
    }

    async fetchGoods() {
        const goods = new GoodsList();
        await goods.fetchGoods()
        
        this.products = goods.goods;
    }

    async render(dataId) {
        let listHtml = "";
        let prod = this.products.find(item => item.id_product == dataId);
        this.orderArray.push(prod);
        
        const cartItem = new CartItem(prod.product_name, prod.price, this.quantity);
        listHtml += cartItem.render();
        
        document.querySelector('.cart-section__items').insertAdjacentHTML('beforeend', listHtml);
    }


}

const init = async () => {
    const list = new GoodsList();
    await list.fetchGoods();
    list.render();
    list.addToCart();

    const total = document.querySelector('.total');
    total.innerHTML = `Сумма всех товаров - ${list.totalPrice()} ед.`;

    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        total.classList.toggle('hidden');
    });

    let cartBtn = document.querySelector('.cart-button');
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.cart-section__items').classList.toggle('hidden');
    });
}



window.onload = init;