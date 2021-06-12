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

    
}



window.onload = init;