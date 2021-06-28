export default Vue.component('search', {
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