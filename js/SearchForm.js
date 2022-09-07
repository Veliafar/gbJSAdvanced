Vue.component('search', {
  template: `
      <form action="#" class="search-form" @submit.prevent="$emit('filter-items')">         
        <label for="filter"></label>
        <div class="search-form-input">
          <input id="filter" type="text" class="search-form__input" v-model="$parent.filterQuery">
          <div v-if="$parent.filterQuery" class="search-form__input-clear" @click="$emit('clear-filter')"> &#x2715</div>
        </div>
        <button type="submit" class="search-form__button">
          &#x1F50E;&#xFE0E;
        </button>
      </form>   
  `,
})
