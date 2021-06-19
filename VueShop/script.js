const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const search = document.querySelector('.goods-search');

const app = new Vue({
    el: "#app",
    data: {
      goods: [],
      filteredGoods: [],
      searchLine: '',
      image: 'https://via.placeholder.com/150',
      isVisibleCart: false,
      cartItems: [],
      count: 1,
    },
  
    methods: {
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData.json`);
            if (responce.ok) {
            const catalogItems = await responce.json();
            this.goods = catalogItems;
            this.filteredGoods = catalogItems;
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
        
        addToCart: function(event) {
            const dataId = event.target.getAttribute('data-id');
            // console.log(id);
            // console.log(this.goods.filter(item => item.id_product == id));
            let product = this.goods.find(item => item.id_product == dataId);
            const obj = { id: product.id_product, title: product.product_name, price: product.price, count: this.count, }
            // console.log(obj);
            if (this.cartItems.find(item => item.id == dataId )){
                for (let i = 0; i < this.cartItems.length; i++) {
                    if (this.cartItems[i].id == dataId) {
                        this.cartItems[i].count += 1;
                        console.log(this.cartItems[i].price);
                    } 
                }
            } else {
                this.cartItems.push(obj);
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

        showCart: function() {
            if (this.isVisibleCart == false) {
                this.isVisibleCart = true;
            } else {
                this.isVisibleCart = false;
            }
        },
    },
  
    async mounted() {
      await this.getProducts()
    },

    computed: {
        
    },
  });