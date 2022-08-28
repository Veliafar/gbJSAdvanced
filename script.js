
class ProductList {
  constructor(container='.goods-list') {
    this.container = container;
    this.goods = [];
    this._fetchProducts();
    this.render();
  }


  _fetchProducts() {
    this.goods = [
      {title: 'Shirt', price: 150},
      {title: 'Socks', price: 50},
      {title: 'Jacket', price: 350},
      {title: 'Shoes', price: 250},
      {title: 'T-shirt', price: 300},
    ];
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentElement("beforeend", item.buildHtml());
    }
  }

  mathProductsPriceSum() {
    return this.goods
      .reduce((total, item) => total += item.price, 0);
  }
}

class ProductItemBase {
  constructor(item, img = 'https://via.placeholder.com/218x204') {
    this.title = item.title;
    this.id = item.id;
    this.price = item.price;
    this.img = item.img || img;
  }
}


class ProductItem extends ProductItemBase {
  constructor(item, img = 'https://via.placeholder.com/218x204') {
    super();
    this.title = item.title;
    this.id = item.id;
    this.price = item.price;
    this.img = item.img || img;
  }

  buildHtml() {
    const productHTML = document.createElement("div");
    productHTML.classList.add("goods-item");
    productHTML.innerHTML = `
      <h3 class="goods-item__header">${this.title}</h3>
      <div class="goods-item__info">
        <p class="goods-item__info__price">
          ${this.price} $
        </p>
        <p class="goods-item__info__text">
          Lorem ipsum dolor.
        </p>
      </div>
      <div class="goods-item__image-wrapper">
        <img class="goods-item__image-wrapper__image" src="${this.img}" alt="img">
      </div>
      <div class="goods-item__control">
        <button class="goods-item__control__button">Купить</button>      
      </div>
    `;
    return productHTML;
  }
}

const productList = new ProductList();
console.log(`Общая сумма товаров %c${productList.mathProductsPriceSum()}`, 'background-color: green;color: white;');



class Cart {
  constructor() {
  }

  mathTotal() {
  }
  addItem(item) {
  }
  removeItem(id) {
  }
  changeItem() {
  }
}

class CartItem extends ProductItemBase {
  constructor() {
    super();
  }
}

