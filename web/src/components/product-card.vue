<template>
  <div class="product-card">
    <!-- Tags -->
    <div class="card-tags">
      <span v-if="!product.availableForSale" class="card-tags--sold-out">Sold Out</span>
      <span v-if="isSaleItem" class="card-tags--sale-item">On Sale</span>
    </div>
    <!-- Card -->
    <g-link :to="`/products/${product.handle}`" class="card-link relative">
      <div class="card-images relative overflow-hidden mb-4">
        <div class="base-image">
          <responsive-image
            :url="product.images[0].originalSrc"
            :alt="product.images[0].altText || product.title"
            :max-height="800"
            :max-width="600"
          />
        </div>
        <div class="hover-image absolute flex top-0 left-0 h-full w-full opacity-0 transition duration-300 ease delay-150 md:hover:opacity-100">
          <responsive-image
            :url="product.images[1].originalSrc"
            :alt="product.images[1].altText || product.title"
            :max-height="800"
            :max-width="600"
          />
        </div>
      </div>
      <div class="card-details">
        <div>
          <h2 class="card-details__brand">{{ product.tags[0] }}</h2>
          <h3 class="card-details__title">{{ product.title }} ({{ productOptions[1].values[0] }})</h3>
        </div>
        <div class="card-details__price">
          {{ product.priceRange.minVariantPrice.amount | currency }}
          <span v-if="isSaleItem" class="card-details__price-max">
            {{ product.compareAtPriceRange.maxVariantPrice.amount | currency }}
          </span>
        </div>
      </div>
      <!-- Swatch Grid -->
    </g-link>
    <div class="swatch-grid">
      <g-link
        v-for="(color, index) in colors"
        :key="index"
        :to="`/products/${kebabCase(product.tags[0] + product.title + color.name)}`"
        :style="{ background: color.hex }"
        :ariaLabel="`Color Option ${color.name}`"
        />
    </div>
  </div>
</template>

<script>
import ResponsiveImage from '@/components/responsive-image.vue'

// Mixins
import { kebabCase } from '@/utils/text-transform'

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
    productOptions() {
      return this.product.options.filter(({ name }) => name !== 'Title')
    },

    isSaleItem() {
      if (!this.product.variants) return
      const variantOnSale = this.product.variants.some(variant => {
        if (!variant.compareAtPrice.amount) return
        return variant.compareAtPrice.amount > variant.price.amount
      })

      return variantOnSale
    },

    colors() {
      return Object.values(
        this.product.variants.reduce((colors, variant) => {
          if (variant.metafields.edges[0].node.value && variant.selectedOptions && variant.selectedOptions.length > 1) {
            const name = variant.selectedOptions[1].value
            colors[name] = {
              hex: variant.metafields.edges[0].node.value,
              name,
              variant
            }
          }
          return colors
        }, {})
      )
    }
  },

  methods: {
    // Mixin
    kebabCase
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/product-card.scss';
</style>
