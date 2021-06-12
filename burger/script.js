class Hamburger {
    constructor(name, title, price, calories, size, stuffing,  ) { 
        this.name = name;
        this.title = title;
        this.price = price;
        this.calories = calories;
        this.size = size;
        this.stuffing = stuffing;
       
    }
    // addTopping(topping) {    // Добавить добавку }
    // removeTopping(topping) { // Убрать добавку }
    // getToppings(topping) {   // Получить список добавок }
    // getSize() {
        
    // }
    // getStuffing() {          // Узнать начинку гамбургера }
    // calculatePrice() {       // Узнать цену }
    // calculateCalories() {    // Узнать калорийность }

    renderSize () {
        return `<label>
            <input type="radio" name="${this.name}" value="${this.title}" data-price="${this.price}" data-calories="${this.calories}"> ${this.title} (${this.price} рублей, ${this.calories} калорий).
        </label>`;
    }
    renderCheckbox () {
        return `<label>
            <input type="checkbox" name="${this.name}" value="${this.title}" data-price="${this.price}" data-calories="${this.calories}"> ${this.title} (${this.price} рублей, ${this.calories} калорий).
        </label>`;
    }
}

class BurgerList {
    constructor() {
        this.size = [];
        this.stuffing = [];
        this.topping = [];
    }

    fetchItems () {
        this.size = [
            {name: 'size', title: 'Большой', price: 100, calories: 40},
            {name: 'size', title: 'Маленький', price: 50, calories: 20},
        ];
        this.stuffing = [
            {name: 'stuffing', title: 'Сырная', price: 10, calories: 20},
            {name: 'stuffing', title: 'С салатом', price: 20, calories: 5},
            {name: 'stuffing', title: 'С картофилем', price: 15, calories: 10},
        ];
        this.topping = [
            {name: 'topping', title: 'Посыпать приправой', price: 15, calories: 0},
            {name: 'topping', title: 'Полить майонезом', price: 20, calories: 5},
        ];
    }

    renderSize() {
        let listHtml = "";
        this.size.forEach((good) => {
            const burgerItem = new Hamburger(good.name, good.title, good.price, good.calories);
            listHtml += burgerItem.renderSize();
        });
        document.querySelector('.form-size').insertAdjacentHTML('beforeend', listHtml);
    }
    renderStuffing() {
        let listHtml = "";
        this.stuffing.forEach((good) => {
            const burgerItem = new Hamburger(good.name, good.title, good.price, good.calories);
            listHtml += burgerItem.renderCheckbox();
        });
        document.querySelector('.form-stuffings').insertAdjacentHTML('beforeend', listHtml);
    }
    renderTopping() {
        let listHtml = "";
        this.topping.forEach((good) => {
            const burgerItem = new Hamburger(good.name, good.title, good.price, good.calories);
            listHtml += burgerItem.renderCheckbox();
        });
        document.querySelector('.form-topping').insertAdjacentHTML('beforeend', listHtml);
    }
}

const init = () => {
    const list = new BurgerList();

    list.fetchItems();
    list.renderSize();
    list.renderStuffing();
    list.renderTopping();

}


window.onload = init;