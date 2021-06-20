const API = 'http://localhost:3000';

// Рендер товаров
Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div class="goods">
            <goods-item v-for="good in goods" v-bind:good="good"></goods-item>
        </div> 
    `,
});

Vue.component('goods-item', {
    props: ['good'],
    data() {
        return {
            image: 'https://via.placeholder.com/150',
        }
    },
    methods: {
        async addToCart() {
            const response = await fetch(`${API}/addToCart`, {
              method: 'POST', 
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(this.good) 
            });
          },
    },
    template: `
        <div class="goods-item">
            <img class="goods-item__image" alt="Some img" v-bind:src="image">
            <h3 class="goods-item__title">{{good.product_name}}</h3>
            <p class="goods-item__price">{{good.price}}</p>
            <button class="goods-item__add-cart" 
                v-bind:data-id="good.id_product"
                v-on:click="addToCart"
            >В корзину</button>
        </div>  
    `,
});

// Рендер поиска
Vue.component('search', {
    data() {
        return {
          searchLine: '',
        }
    },
    methods: {
        filtered: function(value) {
            this.$root.filterGoods(value);
        }
    },
    template: `
        <div class="logo">
            <a href="#" class="logo-title">e-Shop</a>
            <input type="text" class="goods-search" v-model="searchLine">
            <button class="search-button" type="button" v-on:click="filtered(searchLine)">Искать</button>
        </div>
    `,
});

// Рендер корзины
Vue.component('cart-list', {
    props: ['cart'],
    data(){
        return {
            isVisibleCart: false,
        }
    },
    methods: {
        showCart: function() {
            if (this.isVisibleCart == false) {
                this.isVisibleCart = true;
            } else {
                this.isVisibleCart = false;
            }
        },
        // deleteItem: function(event) {
        //     this.$root.deleteItem(event);
        // }
    },
    template: `
        <div class="cart">
        <button class="cart-button" type="button" v-on:click="showCart">Корзина</button>
            <div class="cart-section__items center" v-if="isVisibleCart">
                <div class="rotate"></div>
                <h3 class="cart-empty" style="height: 20px;line-height: 20px;padding: 0;margin: 0;" v-if="cart.length == 0">Корзина пуста</h3>
                <div class="cart-item" v-for="cartItem in cart" v-bind:key=cartItem.id_product>
                    <h3 class="cart-item__title">{{cartItem.product_name}}</h3>
                    <p class="cart-item__price">{{cartItem.price}} руб.</p>
                    <p class="cart-item__count">{{cartItem.count}} шт.</p>
                    <div class="cart-item__delete" 
                        v-bind:item-id="cartItem.id_product"
                        
                    >x</div>
                </div>
            </div>
        </div>
    `, 
});

const app = new Vue({
    el: "#app",
    data: {
      goods: [],
      filteredGoods: [],
      cartItems: [],
      count: 1,
    },
  
    methods: {
        async getProducts() {
            const responce = await fetch(`${API}/catalogData`);
            if (responce.ok) {
                const catalogItems = await responce.json();
                this.goods = catalogItems;
                this.filteredGoods = catalogItems;
            } else {
                alert("Ошибка при соединении с сервером");
            }
        },

        async getCartItems() {
            const resp = await fetch(`${API}/cartData`);
            if (resp.ok) {
                const getCart = await resp.json();
                this.cartItems = getCart;
            } else {
                alert("Ошибка при соединении с сервером");
            }
        },

        filterGoods(value) {
            console.log(value);
            const regExp = new RegExp(value, 'i');
            const filterItems = this.goods.filter(good => regExp.test(good.product_name));
            if (filterItems.length > 0) {
                this.filteredGoods = filterItems;
            } else {
                alert(`Товар "${value}" не найден`);
            }
        },

        deleteItem: function(event) {
            const itemId = event.target.getAttribute('item-id');
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].id == itemId) {
                    if (this.cartItems[i].count > 1) {
                        this.cartItems[i].count -= 1;
                    } else {
                        this.cartItems.splice(i, 1);
                    }
                } 
            }
        },
    },
  
    async mounted() {
        await this.getProducts();
        await this.getCartItems();
    },

    computed: {
        
    },
  });