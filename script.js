const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductList {
  constructor(container = '.goods-list') {
    this.container = container;
    this.goods = [];


  }

  onInit(callback) {
    this._fetchProducts()
      .then((data) => {
        console.log('products', data);
        this.goods = data;
        this.render();

        callback.bind(this)();
      });
  }

  _fetchProducts() {
    return fetch(`${API_URL}/catalogData.json`)
      .then((json) => json.json())
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentElement("beforeend", item.buildHtml());
    }
  }

  mathProductsPriceSum() {
    return this.goods?.length
      ? this.goods
        .reduce((total, item) => total += item.price, 0)
      : 'Товаров нет'
      ;
  }
}

class ProductItemBase {
  constructor(item, img = 'https://via.placeholder.com/218x204') {
    this.product_name = item?.product_name;
    this.id_product = item?.id_product;
    this.price = item?.price;
    this.img = item?.img || img;
  }
}


class ProductItem extends ProductItemBase {
  constructor(item, img = 'https://via.placeholder.com/218x204') {
    super(item, img);
  }

  buildHtml() {
    const productHTML = document.createElement("div");
    productHTML.classList.add("goods-item");
    productHTML.innerHTML = `
      <h3 class="goods-item__header">${this.product_name}</h3>
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


class Cart {
  constructor(container = '.cart-modal') {
    this.container = container;
    this.cartData = [];
    this.totalSum = 0;
    this.totalQuantity = 0;

    this._fetchCartItems()
      .then((data) => {
        console.log('cartData', data);
        this.totalSum = data?.amount;
        this.totalQuantity = data?.countGoods;
        this.cartData = data?.contents;

        this.render();
      });
  }

  _fetchCartItems() {
    return fetch(`${API_URL}/getBasket.json`)
      .then((json) => json.json())
      .catch((err) => {
        console.log(err);
      });
  }

  static _onCartButtonCLick() {
    const element = document.querySelector('.cart-modal');

    function hideOnClickOutside(element) {
      const outsideClickListener = event => {
        if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
          element.classList.add('cart-modal--hidden');
          removeClickListener();
        }
      }
      const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
      }
      document.addEventListener('click', outsideClickListener);
    }

    if (element.classList.contains('cart-modal--hidden')) {
      element.classList.remove('cart-modal--hidden');
      setTimeout(( ) => {
        hideOnClickOutside(element);
      }, 200);
    } else if (!element.classList.contains('cart-modal--hidden')) {
      element.classList.add('cart-modal--hidden');
    }
  }

  mathTotalSum() {
  }

  addItem(item) {
  }

  removeItem(id) {
  }

  changeItem() {
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.cartData) {
      const item = new CartItem(product);
      block.insertAdjacentElement("beforeend", item.buildHtml());
    }
  }
}

class CartItem extends ProductItemBase {
  constructor(item, img = 'https://via.placeholder.com/40x40') {
    super(item, img);
    this.quantity = item?.quantity;
  }

  buildHtml() {
    const productHTML = document.createElement("div");
    productHTML.classList.add("cart-item");
    productHTML.innerHTML = `
      <div class="cart-item__image-wrapper">
        <img class="cart-item__image-wrapper__image" src="${this.img}" alt="img">
      </div>
      <h3 class="cart-item__header">${this.product_name}</h3>       
      <div class="cart-item__info">
        <p class="cart-item__info__price">
          ${this.price} $
        </p>
        <div>
          <button style="font-weight: bold"> - </button>
          ${this.quantity} шт.
          <button style="font-weight: bold"> + </button>
        </div>
      </div>       
           
    `;
    return productHTML;
  }
}

