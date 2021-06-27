const API = 'http://localhost:3000';

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
    },
  
    async mounted() {
        await this.getProducts();
        await this.getCartItems();
    },

    computed: {
        
    },
});

module.exports = {
    app: app
}