<template>
  <Layout>
    <section class="search">
      <!-- Search menu -->
      <div class="search__menu">
        <input
          id="search"
          type="text"
          name="search"
          v-model="searchTerm"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          aria-label="Search"
          placeholder="Search Products..."
        />
      </div>
      <!-- Search results -->
      <div class="search__results">
        <div class="results">
          <div
            v-for="{ node: result } in searchResults"
            :key="result.id"
            class="results__product group"
          >
            <product-card :product="result" />
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import ProductCard from '@/components/product-card.vue'

export default {
  name: 'Search',

  metaInfo: {
    title: 'Search'
  },

  components: {
    ProductCard
  },

  data() {
    return {
      searchTerm: '',
    }
  },

  computed: {
    searchResults() {
      const searchTerm = this.searchTerm
      if (searchTerm.length < 2) return []
      return this.$search.search({ query: searchTerm, limit: 100, suggest: true })
    }
  },

  watch: {
    $route(to, from) {
      this.searchTerm = ''
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/search.scss';
</style>
