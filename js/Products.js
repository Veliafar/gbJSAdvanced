Vue.component('products', {
  props: ['products'],
  template: `
    <div class="goods-list">
      <div class="goods-item" v-for="item of products">
        <h3 class="goods-item__header">{{item.product_name}}</h3>
        <div class="goods-item__info">
          <p class="goods-item__info__price">
            {{item.price}} $
          </p>
          <p class="goods-item__info__text">
            Lorem ipsum dolor.
          </p>
        </div>
        <div class="goods-item__image-wrapper">
          <img class="goods-item__image-wrapper__image" :src="item.img" :alt="item.product_name">
        </div>
        <div class="goods-item__control">
          <button class="goods-item__control__button"
            @click="$emit('add-product', item)" >
              Купить
            </button>
        </div>
      </div>
    </div>
  `
})
