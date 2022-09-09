const search = {
  template: `
      <form action="#" class="search-form" @submit.prevent="filterItems()">         
        <label for="filter"></label>
        <div class="search-form-input">
          <input id="filter" type="text" class="search-form__input" v-model="filterQuery">
          <div v-if="$parent.filterQuery" class="search-form__input-clear" @click="clearFilter()"> &#x2715</div>
        </div>
        <button type="submit" class="search-form__button">
          &#x1F50E;&#xFE0E;
        </button>
      </form>   
  `,
  data() {
    return {
      filterQuery: '',
    }
  },
  methods: {
    filterItems() {
      if (!this.filterQuery) {
        this.$root.$refs.products.itemListFiltered = [...this.$root.$refs.products.itemList];
      } else {
        const regExp = new RegExp(this.filterQuery, 'i');
        this.$root.$refs.products.itemListFiltered = this.$root.$refs.products.itemList.filter(product => regExp.test(product.product_name));
      }
    },
    clearFilter() {
      this.filterQuery = '';
      this.filterItems();
    },
  }
}
