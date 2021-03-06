<template>
  <Layout :key="$route.fullPath">
    <section class="product">
      <div class="product__wrapper">
        <!-- Product images -->
        <product-gallery :images="productImages" class="hidden md:block" />
        <product-carousel :images="productImages" class="block md:hidden" />
        <!-- Product content -->
        <product-content :product="product" />
      </div>
    </section>
  </Layout>
</template>

<script>
import ProductGallery from '@/components/product/product-gallery.vue'
import ProductCarousel from '@/components/product/product-carousel.vue'
import ProductContent from '@/components/product/product-content.vue'

export default {
  name: 'Product',

  metaInfo() {
    return {
      title: this.$page.shopifyProduct.title,
      meta: [
        {
          key: 'og:title',
          property: 'og:title',
          content: `${this.$page.shopifyProduct.title} - BELRAD`
        },
        {
          key: 'twitter:title',
          property: 'twitter:title',
          content: `${this.$page.shopifyProduct.title} - BELRAD`
        }
      ]
    }
  },

  components: {
    ProductGallery,
    ProductCarousel,
    ProductContent,
  },

  computed: {
    product() {
      return this.$page.shopifyProduct
    },

    productImages() {
      return this.$page.shopifyProduct.images
    }
  }
}
</script>

<page-query>
query Product ($id: ID!) {
  # SEO
  metadata {
    siteName
    siteUrl
  }
  shopifyProduct (id: $id) {
    id
    path
    title
    handle
    tags
    productType
    description
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
      image {
        id
        altText
        thumbnail: transformedSrc(maxWidth: 400, maxHeight: 400)
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
    images (limit: 10) {
      id
      altText
      originalSrc
      placeholder: transformedSrc(crop: CENTER)
      thumbnail: transformedSrc(crop: CENTER)
    }
    options {
      id
      name
      values
    }
  }
}
</page-query>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/product.scss';
</style>
