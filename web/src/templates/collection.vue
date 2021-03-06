<template>
  <Layout :key="$route.fullPath">
    <section class="collection">
      <div class="collection__nav">
        <g-link to="/">Shop</g-link> / {{ collection.title }}
      </div>
      <!-- <div class="collection__title">
        <h1>{{ collection.title }}</h1>
      </div> -->
      <filter-and-sort :products="allProducts" :showing-sort="showingSort" :showing-filter="showingFilter">
        <template v-slot="filterData">
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
      # related {
      #   id
      #   path
      #   title
      #   handle
      #   tags
      #   productType
      #   metafields {
      #     edges {
      #       node {
      #         key
      #         value
      #       }
      #     }
      #   }
      # }
    }
  }
}
</page-query>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/collection.scss';
</style>
