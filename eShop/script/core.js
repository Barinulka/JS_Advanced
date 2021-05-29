class GoodsItem {
    constructor(title, image, price) {
        this.title = title;
        this.image = image;
        this.price = price;
    }
    render(title, image, price) {
        return `<div class="goods-item">
            <img class="goods-item__image" src="${image}" alt="Some img">
            <h3 class="goods-item__title">${title}</h3>
            <p class="goods-item__price">${price}</p>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods  = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt',   image: 'https://via.placeholder.com/150',  price: 250 },
            { title: 'Socks',   image: 'https://via.placeholder.com/150',  price: 150},
            { title: 'Jacket',  image: 'https://via.placeholder.com/150',  price: 350 },
            { title: 'Shoes',   image: 'https://via.placeholder.com/150',  price: 250 },
        ];
    }

    totalPrice () {
        let total = 0;
        for (let good of this.goods) {
            total += good.price;
            
        }
        return total;
    }

    render() {
        const goodItem = new GoodsItem();

        this.goods.forEach((good) => {
            document.querySelector('.goods').insertAdjacentHTML('beforeend', goodItem.render(good.title, good.image, good.price));
        });
            
    }
}

class Cart {
    constructor() {
        this.products = [];
    }

    removeCart () {

    }
    
    render () {

    }
}

class CartItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.quantity = 1;
    }

    selectQuantity () {

    }
}

const init = () => {
    const list = new GoodsList();
    list.fetchGoods();
    list.render();

    const total = document.querySelector('.total');
    total.innerHTML = `Сумма всех товаров - ${list.totalPrice()} ед.`;

    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        total.classList.toggle('hidden');
    });
    
}

window.onload = init;