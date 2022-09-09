const cart = {
  template: `   
   <div>
    <button class="cart-button" type="button" @click="cartClick()">
        Корзина
        <span class="cart-button__count" v-if="cartList?.length">
          {{totalQuantity}}
        </span>
    </button>
    <div class="cart-modal" v-show="isCartShow">
        <div class="cart-modal-data">
          <div class="cart-empty" v-if="!cartList?.length">
            <div>
              добавьте товаров
            </div>
          </div>
          <div class="cart-item" v-for="item of cartList">
            <div class="cart-item__image-wrapper">
              <img class="cart-item__image-wrapper__image" :src="item.img" :alt="item.product_name">
            </div>

            <div class="cart-item__header">
              <h3 class="cart-item__header__title" :title="item.product_name">
                {{item.product_name}}
              </h3>
              <span class="cart-item__header__price" :title="item.price">
                {{item.price}} $
              </span>
            </div>

            <div class="cart-item__info">
              <div class="price-control">
                <button class="price-control__button price-control__button--minus "
                        @click="decreaseItem(item.id_product)"> -
                </button>
                {{item.quantity}} шт.
                <button class="price-control__button price-control__button--plus"
                        @click="increaseItem(item.id_product)"> +
                </button>
                <button class="price-control__button price-control__button--delete"
                        @click="removeItem(item.id_product)"> &#x2715
                </button>
              </div>
              <p class="cart-item__info__price">
                всего: {{item.price * item.quantity}} $
              </p>
            </div>
          </div>

        </div>
        <div v-if="cartList?.length" class="cart-modal-data-common">

          <div class="cart-total">
            <span>
            всего: {{totalQuantity}}
          </span>
            <span>
            итого: {{totalSum}} $
          </span>
          </div>
        </div>
      </div>
    </div>   
  `,
  data() {
    return {
      isCartShow: false,
      cartURL: '/getBasket.json',
      addFromBasketURL: '/addFromBasket.json',
      deleteFromBasketURL: '/deleteFromBasket.json',
      cartList: [],
      totalQuantity: 0,
      totalSum: 0,
      cartImg: 'https://via.placeholder.com/40x40',
    }
  },
  mounted() {
    this.$parent.getJson(this.cartURL)
      .then((data) => {
        for (const item of data.contents) {
          item.img = this.cartImg;
          this.cartList.push(item);
        }
        this.mathTotal();
      })
  },
  methods: {
    mathTotal() {
      this.totalQuantity = this.cartList.reduce((total, item) => total += item.quantity, 0);
      this.totalSum = this.cartList.reduce((total, item) => total += item.quantity * item.price, 0);
    },
    addItemToCart(item) {
      const cartItem = this.cartList.find(el => el.id_product === item.id_product);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        const cartItem = {
          ...item,
          quantity: 1
        };
        cartItem.img = this.cartImg;
        this.cartList.push(cartItem);
      }
      this.mathTotal();
    },
    deleteFromCart() {
      return fetch(`${API_URL}${this.deleteFromBasketURL}`)
        .then((json) => json.json())
        .catch((err) => {
          console.error(err);
        });
    },
    removeItem(id) {
      this.deleteFromCart()
        .then((res) => {
          if (res.result === 1) {
            this.cartList.splice(this.cartList.findIndex(el => el.id_product === id), 1);
            this.mathTotal();
          }
        });
    },
    increaseItem(id) {
      this.cartList.find(el => el.id_product === id).quantity++;
      this.mathTotal();
    },
    decreaseItem(id) {
      this.deleteFromCart()
        .then((res) => {
          if (res.result === 1) {
            const cardDataItem = this.cartList.find(el => el.id_product === id);
            if (cardDataItem.quantity === 1) {
              this.cartList.splice(this.cartList.findIndex(el => el.id_product === id), 1);
            } else {
              cardDataItem.quantity--;
            }
            this.mathTotal();
          }
        });
    },
    cartClick() {
      this.isCartShow = !this.isCartShow;
    },
  }
}
