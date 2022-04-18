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
    title: 'Search',
    meta: [
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Search - BELRAD'
      },
      {
        key: 'twitter:title',
        property: 'twitter:title',
        content: 'Search - BELRAD'
      }
    ]
  },

  components: {
    ProductCard
  },

  data() {
    return {
      searchTerm: ''
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

<page-query>
query {
  # SEO
  metadata {
    siteName
    siteUrl
  }
}
</page-query>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/search.scss';
</style>
