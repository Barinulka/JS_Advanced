export default Vue.component('cart-list', {
    props: ['cart'],
    data(){
        return {
            isVisibleCart: false,
            componentKey: 0,
        }
    },
    methods: {
        showCart: function() {
            if (this.isVisibleCart == false) {
                this.isVisibleCart = true;
            } else {
                this.isVisibleCart = false;
            }
            this.$emit('get'); // так корзина прогужается при каждом нажатии на кнопку корзины
        },
        async deleteItem(cartItem) {
            const response = await fetch(`${API}/deleteItem`, {
                method: 'POST', 
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(cartItem) 
            });
            this.$emit('get'); 
        },
    },
    template: `
        <div class="cart">
        <button class="cart-button" type="button" v-on:click="showCart">Корзина</button>
            <div class="cart-section__items center" v-if="isVisibleCart" >
                <div class="rotate"></div>
                <h3 class="cart-empty" style="height: 20px;line-height: 20px;padding: 0;margin: 0;" v-if="cart.length == 0">Корзина пуста</h3>
                <div class="cart-item" v-for="cartItem in cart" v-bind:key=cartItem.id_product>
                    <h3 class="cart-item__title">{{cartItem.product_name}}</h3>
                    <p class="cart-item__price">{{cartItem.price}} руб.</p>
                    <p class="cart-item__count">{{cartItem.count}} шт.</p>
                    <div class="cart-item__delete" 
                        v-bind:item-id="cartItem.id_product"
                        v-on:click="deleteItem(cartItem)"
                    >x</div>
                </div>
            </div>
        </div>
    `, 
});