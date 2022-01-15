<template>
  <Layout :key="$route.fullPath">
    <section class="collection">
      <div class="collection__nav">
        <h1>{{ collection.title }} ({{ collection.products.length }} Items)</h1>
        <button @click="showFilterMenu = !showFilterMenu">Filter +</button>
      </div>

      <!-- Filter options can go here? -->
      <transition
        appear
        mode="out-in"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"
      >
        <div v-show="showFilterMenu" class="filter-menu">
          <div>Example Filter Menu!</div>
        </div>
      </transition>

      <div class="product-grid">
        <div
          v-for="product in collection.products"
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

// Mixins
import CollectionMetaMixin from '@/mixins/collection-meta.js'

// Gsap
import { gsap, Expo } from 'gsap'

export default {
  name: 'Collection',

  mixins: [CollectionMetaMixin],

  data() {
    return {
      showFilterMenu: false
    }
  },

  components: {
    ProductCard
  },

  computed: {
    collection() {
      return this.$page.shopifyCollection
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
  }
}
</script>

<page-query>
query Collection ($id: ID!) {
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
    # image {
    #   id
    #   altText
    #   originalSrc
    #   placeholder: transformedSrc(crop: CENTER)
    #   thumbnail: transformedSrc(crop: CENTER)
    # }
    products (limit: 25, sortBy: "updatedAt", order: DESC) {
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
