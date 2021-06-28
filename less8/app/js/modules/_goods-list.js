export default Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div class="goods">
            <goods-item v-for="good in goods" v-bind:good="good" v-bind:key="good.id_product"></goods-item>
        </div> 
    `,
});