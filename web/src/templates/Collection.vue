<template>
  <Layout :key="$route.fullPath">
    <section class="collection">
      <div class="collection__nav">
        <g-link to="/">Shop</g-link> / {{ collection.title }}
      </div>
      <div class="collection__title">
        <h1>{{ collection.title }}</h1>
      </div>
      <filter-and-sort :products="allProducts" :showing-sort="showingSort" :showing-filter="showingFilter">
        <template v-slot="filterData">
          <!-- <div>Items:{{ filterData.filteredProducts.length }}</div> -->
          <div class="product-grid">
            <div
              v-for="product in filterData.filteredProducts"
              :key="product.id"
              class="product-grid__product group"
            >
              <product-card :product="product" />
            </div>
          </div>
        </template>
      </filter-and-sort>
      <!-- <div class="collection__nav">
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
      </div> -->
    </section>
  </Layout>
</template>

<script>
import FilterAndSort from '@/components/filter/filter-and-sort.vue'
import ProductCard from '@/components/product-card.vue'

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
      showingFilter: true,
      showingSort: true
    }
  },

  components: {
    ProductCard,
    FilterAndSort
  },

  computed: {
    collection() {
      return this.$page.shopifyCollection
    },

    allProducts() {
      return this.$page.shopifyCollection.products
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
      tags
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
        tags
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
// Using Windicss + @apply Directive
@import '@/assets/scss/collection.scss';
</style>
