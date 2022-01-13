<template>
  <div class="product-card">
    <!-- Tags -->
    <div class="card-tags">
      <span v-if="!product.availableForSale" class="card-tags--sold-out">Sold Out</span>
      <span v-if="isSaleItem" class="card-tags--sale-item">On Sale</span>
    </div>
    <!-- Card -->
    <g-link :to="`/products/${product.handle}`" class="card-link">
      <responsive-image
        class="mb-2"
        :url="product.images[0].originalSrc"
        :alt="product.images[0].altText || product.title"
        :max-height="900"
        :max-width="600"
      />
      <div class="card-details">
        <h3 class="card-details__title">{{ product.title }}</h3>
        <div class="card-details__price">
          {{ product.priceRange.minVariantPrice.amount | currency }}
          <span v-if="isSaleItem" class="card-details__price-max">
            {{ product.compareAtPriceRange.maxVariantPrice.amount | currency }}
          </span>
        </div>
      </div>
      <!-- Swatch Grid -->
      <div class="swatch-grid">
        <span :style="{background: product.metafields.edges[0].node.value }" />
        <div
          v-for="product in product.related"
          :key="product.id"
          class="inline-flex"
        >
          <span :style="{background: product.metafields.edges[0].node.value }" />
        </div>
      </div>
    </g-link>
  </div>
</template>

<script>
import ResponsiveImage from '@/components/responsive-image.vue'

export default {
  name: 'ProductCard',

  components: {
    ResponsiveImage
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  computed: {
    isSaleItem() {
      if (!this.product.variants) return
      const variantOnSale = this.product.variants.some(variant => {
        if (!variant.compareAtPrice.amount) return
        return (variant.compareAtPrice.amount) > (variant.price.amount)
      })

      return variantOnSale
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/product-card.scss';
</style>
