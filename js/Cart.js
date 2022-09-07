Vue.component('cart', {
  props: ['visibility', 'cartList', 'totalQuantity', 'totalSum'],
  template: `
    {{visibility}}
    <div class="cart-modal" v-show="visibility">
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
                        @click="$emit('decrease-item', item.id_product)"> -
                </button>
                {{item.quantity}} шт.
                <button class="price-control__button price-control__button--plus"
                        @click="$emit('increase-item', item.id_product)"> +
                </button>
                <button class="price-control__button price-control__button--delete"
                        @click="$emit('remove-item', item.id_product)"> &#x2715
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
  `
})
