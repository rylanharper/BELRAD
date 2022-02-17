<template>
  <Layout :key="$route.fullPath">
    <section class="collection">
      <div class="collection__nav">
        <h1>{{ collection.title }} — {{ collection.products.length }} Items</h1>
        <button @click="showFilterMenu = !showFilterMenu">
          Filter {{ showFilterMenu === true ? '-' : '+' }}
        </button>
      </div>

      <transition
        appear
        mode="out-in"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"
      >
        <div v-show="showFilterMenu" class="collection__filter-menu">
          <!-- <span class="filter-count">Filters: {{ currentFilters.length }}</span> -->
          <div v-for="filter in listOfFilters" :key="filter.id" class="filter">
            <span class="filter-name">{{ filter.name }}</span>
            <label v-for="(option, o) in filter.options" :key="o">
              <input v-model="filters[filter.name]" :value="option" type="checkbox" />
              <span>{{ option }}</span>
            </label>
          </div>
        </div>
      </transition>

      <div class="product-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-grid__product group"
        >
          <product-card :product="product" />
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import ProductCard from '@/components/product-card.vue'

// Gsap
import { gsap, Expo } from 'gsap'

export default {
  name: 'Collection',

  metaInfo() {
    return {
      title: this.$page.shopifyCollection.title,
      meta: [
        {
          key: 'og:title',
          property: 'og:title',
          content: `${this.$page.shopifyCollection.title} - BELRAD`
        },
        {
          key: 'twitter:title',
          property: 'twitter:title',
          content: `${this.$page.shopifyCollection.title} - BELRAD`
        }
      ]
    }
  },

  data() {
    return {
      filters: {},
      showFilterMenu: false
    }
  },

  components: {
    ProductCard
  },

  computed: {
    collection() {
      return this.$page.shopifyCollection
    },

    allProducts() {
      return this.$page.shopifyCollection.products
    },

    listOfFilters() {
      const allFilters = this.allProducts
        .flatMap(product => product.options)
        .reduce((map, { name, values }) => {
          const option = map.get(name)
          if (!option) map.set(name, new Set(values))
          else values.forEach(value => option.add(value))
          return map
        }, new Map())

      return Array.from(allFilters).map(([name, options]) => ({
        name,
        options: Array.from(options)
      }))
    },

    currentFilters() {
      const filters = Object.entries(this.filters)
      return filters.flatMap(([name, values]) => values)
    },

    filteredProducts() {
      if (!this.currentFilters.length) return this.allProducts

      const filters = Object.entries(this.filters)
      return this.allProducts.filter(product => {
        const hasMatchingOption = filters.some(([filterName, filterValues]) => {
          const matchingOption = product.options.find(option => option.name === filterName)
          return matchingOption && matchingOption.values.some(value => filterValues.includes(value))
        })

        return hasMatchingOption
      })
    }
  },

  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        height: 0,
        opacity: 0
      })
    },

    enter(el, done) {
      gsap.to(el, {
        duration: 0.5,
        ease: Expo.easeInOut,
        height: 'auto',
        opacity: 1,
        onComplete: done
      })
    },

    leave(el, done) {
      gsap.to(el, {
        duration: 0.5,
        ease: Expo.easeInOut,
        height: 0,
        opacity: 0,
        onComplete: done
      })
    }
  },

  watch: {
    // Sets the initial data.filters property, as Vue requires an array to use multiple checkboxes
    // I.e. { Color: [], Size: [] }
    listOfFilters: {
      immediate: true,
      handler(listOfFilters) {
        const filters = listOfFilters.map(filter => [filter.name, []])
        this.filters = Object.fromEntries(filters)
      }
    }
  }
}
</script>

<page-query>
query Collection ($id: ID!) {
  # SEO
  metadata {
    siteName
    siteUrl
  }
  shopifyCollection (id: $id) {
    id
    path
    title
    handle
    description
    descriptionHtml
    image {
      id
      altText
      originalSrc
      placeholder: transformedSrc(crop: CENTER)
      thumbnail: transformedSrc(crop: CENTER)
    }
    products (limit: 25, sortBy: "createdAt", order: DESC) {
      id
      path
      title
      handle
      productType
      descriptionHtml
      availableForSale
      metafields {
        edges {
          node {
            key
            value
          }
        }
      }
      variants {
        id
        title
        availableForSale
        compareAtPrice {
          amount
        }
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images (limit: 2) {
        id
        altText
        originalSrc
      }
      options {
        id
        name
        values
      }
      related {
        id
        path
        title
        handle
        productType
        metafields {
          edges {
            node {
              key
              value
            }
          }
        }
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/collection.scss';
</style>
