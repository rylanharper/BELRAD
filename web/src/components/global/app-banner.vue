<template>
  <div
    v-if="promo.enabled === true"
    :style="{ background: this.promo.color.hex }"
    class="app-banner"
  >
    <g-link :to="promo.link" class="app-banner__link group">
      <marquee-text :repeat="10" :duration="15">
        <h3>{{ promo.text }}</h3>
      </marquee-text>
    </g-link>
  </div>
</template>

<script>
// Marquee
import MarqueeText from 'vue-marquee-text-component/src/components/MarqueeText.vue'

export default {
  name: 'AppBanner',

  components: {
    MarqueeText
  },

  computed: {
    promo() {
      return this.$static.promoSettings.edges[0].node
    }
  }
}
</script>

<static-query>
query {
  # Sanity
  promoSettings: allSanityPromoSettings {
    edges {
      node {
        enabled
        text
        color {
          hex
        }
        link
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/app-banner.scss';
</style>
