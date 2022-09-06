const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new  Vue({
  el: '#app',
  data: {
    catalogDataURL: '/catalogData.json',
    itemList: [],
    itemListFiltered: [],
    cartList: [],
    totalQuantity: 0,
    totalSum: 0,
    filterQuery: '',
    cartShow: false,
  },
  mounted() {
    this.fetchProducts()
      .then((data) => {
        const mappedData = [...data].map(el => {
          el.img = 'https://via.placeholder.com/218x204';
          return el;
        });
        this.itemList = Array.from(mappedData)
        this.itemListFiltered = Array.from(mappedData);
      });
  },
  methods: {
    fetchProducts() {
      return fetch(`${API_URL}${this.catalogDataURL}`)
        .then((json) => json.json())
        .catch((err) => {
          console.error(err);
        });
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
        cartItem.img = 'https://via.placeholder.com/40x40';
        this.cartList.push(cartItem);
      }
      this.mathTotal();
    },
    mathTotal() {
      this.totalQuantity = this.cartList.reduce( (total, item) => total += item.quantity, 0);
      this.totalSum = this.cartList.reduce( (total, item) => total += item.quantity * item.price, 0);
    },
    filterItems() {
      if (!this.filterQuery) {
        this.itemListFiltered = [...this.itemList];
      } else {
        const regExp = new RegExp(this.filterQuery, 'i');
        this.itemListFiltered = this.itemList.filter(product => regExp.test(product.product_name));
      }
    },
    clearFilter() {
      this.filterQuery = '';
      this.filterItems();
    },
    cartClick() {
      this.cartShow = !this.cartShow;
    },
    removeItem(id) {
      this.cartList.splice(this.cartList.findIndex(el => el.id_product === id), 1);
      this.mathTotal();
    },
    increaseItem(id) {
      this.cartList.find(el => el.id_product === id).quantity++;
      this.mathTotal();
    },
    decreaseItem(id) {
      const cardDataItem = this.cartList.find(el => el.id_product === id);
      if (cardDataItem.quantity === 1) {
        this.cartList.splice(this.cartList.findIndex(el => el.id_product === id), 1);
      } else {
        cardDataItem.quantity--;
      }
      this.mathTotal();
    }
  }
})


