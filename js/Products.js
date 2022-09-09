const products = {
  template: `
    <div class="goods-list">
      <div class="goods-item" v-for="item of itemListFiltered">
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
            @click="$root.$refs.cart.addItemToCart(item)" >
              Купить
            </button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      catalogDataURL: '/catalogData.json',
      itemList: [],
      itemListFiltered: [],
      productImg: 'https://via.placeholder.com/218x204',
    }
  },
  mounted() {
    this.$parent.getJson(this.catalogDataURL)
      .then(data => {
        const mappedData = [...data].map(el => {
          el.img = this.productImg;
          return el;
        });
        this.itemList = Array.from(mappedData)
        this.itemListFiltered = Array.from(mappedData);
      })
  },
  methods: {
    filterItems(filterValue) {
      if (!filterValue) {
        this.itemListFiltered = [...this.itemList];
      } else {
        const regExp = new RegExp(filterValue, 'i');
        this.itemListFiltered = this.itemList.filter(product => regExp.test(product.product_name));
      }
    },
  }
}
