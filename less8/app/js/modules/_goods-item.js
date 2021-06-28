export default Vue.component('goods-item', {
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
            
            // this.$root.getCartItems();  // Так корзина прогружается моментально даже при открытом poup-е корзины
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