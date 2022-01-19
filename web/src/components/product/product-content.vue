<template>
  <div class="product-content">
    <div class="product-content__wrapper">
      <!-- Product details -->
      <div class="product-details">
        <h1 class="product-details__title">{{ product.title }}</h1>
        <div v-if="currentVariant" class="product-details__price">
          {{ currentVariant.price.amount | currency }}
          <span v-if="isSaleItem" class="product-details__price--max">
            {{ product.compareAtPriceRange.maxVariantPrice.amount | currency }}
          </span>
        </div>
      </div>
      <!-- Swatch Grid -->
      <div class="swatch-grid">
        <div class="swatch-grid__title">Color: {{ product.tags[0] }}</div>
        <div class="swatch-grid__swatches">
          <span
            :style="{ background: product.metafields.edges[0].node.value }"
            class="color-primary"
          />
          <div v-for="product in product.related" :key="product.id" class="related-colors">
            <g-link :to="`/products/${product.handle}`">
              <span :style="{ background: product.metafields.edges[0].node.value }" />
            </g-link>
          </div>
        </div>
      </div>
      <!-- Product options -->
      <div class="product-options">
        <div v-if="productOptions[0].name === 'Size'">
          <div class="product-options__name">
            <span>{{ productOptions[0].name }}:</span>
            <div
              :class="{ 'oos-warning': !currentVariant.availableForSale }"
              class="product-options__status"
            >
              <span>
                {{ currentVariant.availableForSale ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>
          </div>
          <div class="product-options__variants">
            <label v-for="value in productOptions[0].values" :key="value">
              <input
                v-model="selectedOptions[productOptions[0].name]"
                :value="value"
                type="radio"
                :class="{ 'oos-option': hasNoAvailableProducts(productOptions[0].name, value) }"
              />
              <span>{{ value }}</span>
            </label>
          </div>
        </div>
      </div>
      <!-- Product actions -->
      <div class="product-actions">
        <button
          :disabled="!currentVariant.availableForSale"
          :class="{ 'oos-button': !currentVariant.availableForSale }"
          @click="addToCart"
        >
          <span v-if="currentVariant.availableForSale">{{
            isLoading === true ? 'Adding...' : 'Add to Cart'
          }}</span>
          <span v-if="!currentVariant.availableForSale">Sold Out</span>
        </button>
      </div>
      <!-- Product description -->
      <div class="product-description" v-html="product.descriptionHtml" />
    </div>
  </div>
</template>

<script>
// Mixins
import ProductMetaMixin from '@/mixins/product-meta.js'

export default {
  name: 'ProductContent',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  mixins: [ProductMetaMixin],

  data() {
    return {
      isLoading: false,
      selectedOptions: {},
      quantity: 1
    }
  },

  computed: {
    productOptions() {
      return this.product.options.filter(({ name }) => name !== 'Title')
    },

    currentVariant() {
      const matchedVariant = this.product.variants.find(variant =>
        variant.selectedOptions.every(({ name, value }) => value === this.selectedOptions[name])
      )
      return matchedVariant
    },

    isSaleItem() {
      if (!this.product.variants) return
      const hasVariantOnSale = this.product.variants.some(variant => {
        if (!variant.compareAtPrice.amount) return
        return variant.compareAtPrice.amount > variant.price.amount
      })

      return hasVariantOnSale
    }
  },

  watch: {
    $route(to, from) {
      const [firstVariant] = this.product.variants
      this.selectedOptions = firstVariant.selectedOptions.reduce(
        (options, { name, value }) => ({ [name]: value, ...options }),
        {}
      )
    }
  },

  created() {
    const [firstVariant] = this.product.variants
    this.selectedOptions = firstVariant.selectedOptions.reduce(
      (options, { name, value }) => ({ [name]: value, ...options }),
      {}
    )
  },

  methods: {
    hasNoAvailableProducts(name, value) {
      const matchingVariants = this.product.variants.filter(variant =>
        variant.selectedOptions.find(option => option.name === name && option.value === value)
      )
      return matchingVariants.every(variant => !variant.availableForSale)
    },

    async addToCart() {
      const variant = this.currentVariant
      const payload = {
        path: this.product.path,
        qty: this.quantity,
        productTitle: this.product.title,
        variantTitle: variant.title,
        variantId: variant.id,
        price: variant.price.amount,
        image: variant.image
      }

      await this.$store.dispatch('addToCart', payload)

      let _this = this
      _this.isLoading = true
      setTimeout(function() {
        _this.isLoading = false
        _this.$store.commit('TOGGLE_CART_MODAL')
      }, 1200)
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/product-content.scss';
</style>
