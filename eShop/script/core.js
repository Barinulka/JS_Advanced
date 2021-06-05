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
        this.filteredGoods = [];
    }

    async fetchGoods() {
        const responce = await fetch(`${API_URL}/catalogData.json`);
        if (responce.ok) {
          const catalogItems = await responce.json();
          this.goods = catalogItems;
          this.filteredGoods = catalogItems
        } else {
          alert("Ошибка при соединении с сервером");
        }
      }

    filterGoods(value) {
        const regExp = new RegExp(value, 'i')
        this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name))
        this.render()
    }

    render() {
        let listHtml = "";
        this.filteredGoods.forEach((good) => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector(".goods").innerHTML = listHtml;

        /**
         * Если добавлять верстку на страницу таким способом, то поиск не работает как надо
         * он вставляет на страницу еще один товар
         * document.querySelector('.goods').insertAdjacentHTML('beforeend', listHtml);
         */
    }
}

class BusketItems {
    constructor(title, price, id, count) {
      this.title = title;
      this.price = price;
      this.id = id;
      this.count = count;
    }

    render() {
        return `<div class="cart-item">
            <h3 class="cart-item__title">${this.title}</h3>
            <p class="cart-item__price">${this.price} ед.</p>
            <p class="cart-item__count">${this.count} шт.</p>
            <div class="cart-item__delete" itemId=${this.id}>x</div>
        </div>`;
    }
    
    
}

class BusketLists {
    constructor(count = 1) {
        this.count = count;
        this.cartItems = [];
    }

    fillArray(goods) {
        const addToBasketBtn = document.querySelectorAll('.goods-item__add-cart');

        addToBasketBtn.forEach((addBnt) => {
            addBnt.addEventListener('click', (e) => {
                e.preventDefault();
                const dataId = e.target.getAttribute('data-id');
                let product = goods.find(item => item.id_product == dataId);
                const obj = { id: product.id_product, title: product.product_name, price: product.price, count: this.count, }
                
                if(this.cartItems.find((id) => id.id == dataId )){
                    for (let i = 0; i < this.cartItems.length; i++) {
                        if (this.cartItems[i].id == dataId) {
                            this.cartItems[i].count += 1;
                        }
                    }
                } else {
                    this.cartItems.push(obj);
                }

                this.addToCart();
            });
        });
    }

    addToCart() {
        let listHtml = "";
        
        this.cartItems.forEach((item) => {
            const BusketItem = new BusketItems(item.title, item.price, item.id, item.count);
            listHtml += BusketItem.render(this.count);
        });
        document.querySelector(".cart-section__items").innerHTML = listHtml;

        this.initDelBtns();
    }

    initDelBtns() {
        const delBtns = document.querySelectorAll('.cart-item__delete');
        delBtns.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                this.deleteProducts(e.target.getAttribute('itemId'));
            });
        });
    }

    deleteProducts(itemId) {
        const as = new BusketItems()
        if(this.cartItems.find((id) => id.id == itemId )){
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].id == itemId) {
                    if (this.cartItems[i].count > 1) {
                        this.cartItems[i].count -= 1;
                        as.render();
                    } else {
                        this.cartItems.splice(i);
                    }
                }
            }
        } 
    }
}

const init = async () => {
    const list = new GoodsList();
    await list.fetchGoods();
    list.render();

    const showBusket = document.querySelector('.cart-button');

    showBusket.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.cart-section__items').classList.toggle('hidden');
    });

    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.goods-search');

    searchButton.addEventListener('click', () => {
        list.filterGoods(searchInput.value);
    });

    const cartList = new BusketLists();
    cartList.fillArray(list.goods);
    
}

window.onload = init;
