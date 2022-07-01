<template>
  <div class="product-content">
    <div class="product-content__wrapper top-[2.5vh] md:top-[20vh]">
      <!-- Product details -->
      <div class="product-details">
        <h2 class="product-details__brand mb-4">{{ product.tags[0] }}</h2>
        <h3 class="product-details__title">{{ product.title }}</h3>
        <div v-if="currentVariant" class="product-details__price">
          {{ currentVariant.price.amount | currency }}
          <span v-if="isSaleItem" class="product-details__price--max">
            {{ product.compareAtPriceRange.maxVariantPrice.amount | currency }}
          </span>
        </div>
      </div>
      <!-- Swatch Grid -->
      <div v-if="productOptions[1] && productOptions[1].name.toLowerCase() === 'color' || 'colour'">
        <div class="swatch-grid">
          <div class="swatch-grid__title">Color: {{ productOptions[1].values[0] }}</div>
          <div class="swatch-grid__swatches">
            <g-link
            v-for="(color, index) in colors.sort((a, b) => (a.name > b.name) ? 1 : -1)"
            :key="index"
            :to="`/products/${kebabCase(product.tags[0] + product.title + color.name)}`"
            :style="{ background: color.hex }"
            :ariaLabel="`Color Option ${color.name}`"
            />
          </div>
        </div>
      </div>
      <!-- Product options -->
      <div v-if="productOptions[0] && productOptions[0].name.toLowerCase() === 'size'">
        <div class="product-options">
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
          <span v-if="currentVariant.availableForSale">
            {{ isLoading === true ? 'Adding...' : 'Add to Cart' }}
          </span>
          <span v-if="!currentVariant.availableForSale">Sold Out</span>
        </button>
      </div>
      <!-- Product description -->
      <div class="product-description">
        <div v-if="productDescription[0]" v-html="productDescription[0]" class="mb-10"></div>
        <div v-if="productDescription[1]" class="product-description__content">
          <button @click="showDetails = !showDetails">
            {{ showDetails === true ? 'Details -' : 'Details +' }}
          </button>
          <transition
            appear
            mode="out-in"
            @before-enter="acBeforeEnter"
            @enter="acEnter"
            @leave="acLeave"
            :css="false"
          >
            <div v-show="showDetails" class="overflow-hidden relative">
              <div v-html="productDescription[1]" class="mb-6" />
            </div>
          </transition>
        </div>
        <div v-if="productDescription[2]" class="product-description__content">
          <button @click="showCare = !showCare">
            {{ showCare === true ? 'Care -' : 'Care +' }}
          </button>
          <transition
            appear
            mode="out-in"
            @before-enter="acBeforeEnter"
            @enter="acEnter"
            @leave="acLeave"
            :css="false"
          >
            <div v-show="showCare" class="overflow-hidden relative">
              <div v-html="productDescription[2]" class="mb-6" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Mixins
import { kebabCase } from '@/utils/text-transform'

// Gsap
import { gsap, Expo } from 'gsap'

export default {
  name: 'ProductContent',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isLoading: false,
      selectedOptions: {},
      quantity: 1,
      showDetails: false,
      showCare: false
    }
  },

  computed: {
    productOptions() {
      return this.product.options.filter(({ name }) => name !== 'Title')
    },

    productDescription() {
      return this.product.descriptionHtml.split(/---/)
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
      }, 800)
    },

    acBeforeEnter(el) {
      gsap.set(el, {
        height: 0,
        opacity: 0
      })
    },

    acEnter(el, done) {
      gsap.to(el, {
        duration: 0.3,
        ease: Expo.easeInOut,
        height: 'auto',
        opacity: 1,
        onComplete: done
      })
    },

    acLeave(el, done) {
      gsap.to(el, {
        duration: 0.3,
        ease: Expo.easeInOut,
        height: 0,
        opacity: 0,
        onComplete: done
      })
    },

    // Mixin
    kebabCase
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/product-content.scss';
</style>
