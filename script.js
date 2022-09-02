const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ListItemBase {
  constructor(container) {
    this.container = container;
    this.itemList = [];
  }
}


class ProductList extends ListItemBase {
  constructor(cart, container = '.goods-list') {
    super(container);
    this.cart = cart;
    console.log('cart', this.cart);
  }

  onInit(callback) {
    this._fetchProducts()
      .then((data) => {
        console.log('products', data);
        this.itemList = data;
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
    for (let product of this.itemList) {
      const item = new ProductItem(product);
      block.insertAdjacentElement("beforeend", item.buildHtml(this.cart));
    }
  }

  mathProductsPriceSum() {
    return this.itemList?.length
      ? this.itemList
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

  buildHtml(cart = null) {
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
        <button class="goods-item__control__button" >Купить</button>      
      </div>
    `;
    productHTML.querySelector('.goods-item__control__button')
      .addEventListener('click', () => cart.addItem(this, cart.itemList));
    return productHTML;
  }
}


class Cart extends ListItemBase {
  constructor(container = '.cart-modal-data', containerCommon = '.cart-modal-data-common') {
    super(container);
    this.containerCommon = containerCommon;
    this.itemList = [];
    this.totalSum = 0;
    this.totalQuantity = 0;

    this._fetchCartItems()
      .then((data) => {
        console.log('itemList', data);
        this.totalSum = data?.amount;
        this.totalQuantity = data?.countGoods;
        this.itemList = data?.contents;

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
        console.log('event.target', event.target);
        if (!event.target.closest('.cart-modal')
          && !event.target.classList.contains('goods-item__control__button')
          && !event.target.classList.contains('price-control__button')) {
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

  addItem(item, itemList) {
    const cardDataItem = itemList.find(el => el.id_product === item.id_product);
    if (cardDataItem) {
      cardDataItem.quantity++;
    } else {
      itemList.push(new CartItem(item));
    }
    this.render();
  }

  removeItem(id, itemList) {
    itemList.splice(itemList.findIndex(el => el.id_product === id), 1);
    this.render();
  }

  increaseItem(id, itemList) {
    itemList.find(el => el.id_product === id).quantity++;
    this.render();
  }
  decreaseItem(id, itemList) {
    const cardDataItem = itemList.find(el => el.id_product === id);
    if (cardDataItem.quantity === 1) {
      itemList.splice(itemList.findIndex(el => el.id_product === id), 1);
    } else {
      cardDataItem.quantity--;
    }
    this.render();
  }

  render() {
    const block = document.querySelector(this.container);
    block.innerHTML = null;
    if (this.itemList?.length) {
      for (let product of this.itemList) {
        const item = new CartItem(product);
        block.insertAdjacentElement("beforeend", item.buildHtml(this));
      }
    } else {
      const productHTML = document.createElement("div");
      productHTML.classList.add("cart-empty");
      productHTML.innerHTML = `<div>
          Нет товаров
        </div>`
      block.insertAdjacentElement("beforeend", productHTML);
    }

    this.totalQuantity = this.itemList.reduce( (total, item) => total += item.quantity, 0);
    this.totalSum = this.itemList.reduce( (total, item) => total += item.quantity * item.price, 0);

    const blockCommon = document.querySelector(this.containerCommon);
    blockCommon.innerHTML = null;
    const commonCartHTML = document.createElement("div");
    commonCartHTML.innerHTML = `<div class="cart-total">
          <span>
            всего: ${this.totalQuantity}
          </span>
          <span>
            итого: ${this.totalSum} $
          </span>
        </div>`
    blockCommon.insertAdjacentElement("beforeend", commonCartHTML);
  }
}

class CartItem extends ProductItemBase {
  constructor(item, img = 'https://via.placeholder.com/40x40') {
    super(item, img);
    this.img = img;
    this.quantity = item?.quantity || 1;
  }

  buildHtml(cart = null) {
    const productHTML = document.createElement("div");
    productHTML.classList.add("cart-item");
    productHTML.innerHTML = `
      <div class="cart-item__image-wrapper">
        <img class="cart-item__image-wrapper__image" src="${this.img}" alt="img">
      </div>
      
      <div class="cart-item__header">
        <h3 class="cart-item__header__title">
            <span>
              ${this.product_name}
            </span>          
            <span>
              ${this.quantity > 1 ? ` x ${this.quantity}` : ``}
            </span>
        </h3>      
        <span class="cart-item__header__price">
              ${this.price} $
        </span>
      </div>
       
      <div class="cart-item__info">
        <p class="cart-item__info__price">
          всего: ${this.price * this.quantity} $ 
        </p>
        <div class="price-control">
          <button class="price-control__button price-control__button--minus"> - </button>
          ${this.quantity} шт.
          <button class="price-control__button price-control__button--plus"> + </button>
          <button class="price-control__button price-control__button--delete"> x </button>
        </div>
      </div>       
           
    `;
    productHTML.querySelector('.price-control__button--delete')
      .addEventListener('click', () => cart?.removeItem(this.id_product, cart.itemList));
    productHTML.querySelector('.price-control__button--minus')
      .addEventListener('click', () => cart?.decreaseItem(this.id_product, cart.itemList));
    productHTML.querySelector('.price-control__button--plus')
      .addEventListener('click', () => cart?.increaseItem(this.id_product, cart.itemList));
    return productHTML;
  }
}

