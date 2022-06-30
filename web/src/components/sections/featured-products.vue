<template>
  <section class="featured-products">
    <div class="product-grid">
      <div
        v-for="{ node: product } in products"
        :key="product.id"
        class="product-grid__product group"
      >
        <product-card :product="product" />
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from '@/components/product-card.vue'

export default {
  name: 'FeaturedProducts',

  components: {
    ProductCard
  },

  computed: {
    products() {
      return this.$static.shopifyProducts.edges
    }
  }
}
</script>

<static-query>
query {
  shopifyProducts: allShopifyProduct (limit: 4, sortBy: "createdAt", order: DESC) {
    edges {
      node {
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
          metafields {
            edges {
              node {
                key
                value
              }
            }
          }
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
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/featured-products.scss';
</style>
