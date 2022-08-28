const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';


class ProductList {
  constructor(container = '.goods-list') {
    this.container = container;

    this._fetchProducts()
      .then((data) => {
        console.log('data', data);
        this.goods = data;
        this.render();
        console.log(`Общая сумма товаров %c${productList.mathProductsPriceSum()}`, 'background-color: green;color: white;');
      });
  }


  _fetchProducts() {
    return fetch(`${API_URL}catalogData.json`)
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

const productList = new ProductList();


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

