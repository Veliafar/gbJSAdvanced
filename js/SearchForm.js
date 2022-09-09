const search = {
  template: `
      <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filterItems(filterQuery)">         
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
    clearFilter() {
      this.filterQuery = '';
      this.$root.$refs.products.filterItems(this.filterQuery);
    },
  }
}
