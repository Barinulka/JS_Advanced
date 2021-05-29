const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks'},
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'T-shirt', price: 350 },
    { title: 'Pants', price: 250 },
    
  ]

/**
 * По 2-му заданию
 * Значения по умолчанию используются тогда, когда функция принимает несколько значений
 * И, если одно из значений приходит пустое, то берется значение, заданное по умолчанию
 * чтобы не нарушить работу функции и не получить ошибку.
 * Для примера убрал у 1 товара цену и у функции поставил значение по умолчанию.
 */
const renderGoodsItem = (title, price = 100) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
}

/**
 *  По 3-му заданию
 *  map отдает массив, а innerHTML построчно вставляет элементы этого массива разделенные запятой,
 *  поэтому на странице получаем запятые. Самый простой способ использовать метод join(""),
 *  который объединит все элементы массива в строку без разделителя.
 *  Так же можно вместо map пройтись циклом for...of и методом insertAdjacentHTML
 *  добавить верстку.
 */
const renderGoodsList = list => {
    // let goodsList = list.map(item => renderGoodsItem(item.title, item.price))
     
    // document.querySelector('.goods-list').innerHTML = goodsList.join("");
    
    for (good of list) {
        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', renderGoodsItem(good.title, good.price));
    }
  
}
  
const init = () => {
    renderGoodsList(goods)
}
  
window.onload = init