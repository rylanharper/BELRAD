<template>
  <figure
      class="responsive-image"
      :style="{ paddingTop: `${(maxHeight / maxWidth) * 100}%` }">
    <picture>
      <source
        :data-srcset="getSizedImage(url, 1400)"
        media="(min-width: 1200px)"
      />
      <source
        :data-srcset="getSizedImage(url, 1200)"
        media="(min-width: 800px)"
      />
      <source
        :data-srcset="getSizedImage(url, 800)"
        media="(min-width: 600px)"
      />
      <img
        data-sizes="auto"
        :data-src="getSizedImage(url, 600)"
        :alt="alt"
        class="lazyload"
      />
    </picture>
  </figure>
</template>

<script>
import { getSizedImageUrl } from '@shopify/theme-images'

export default {
  name: 'ResponsiveImage',

  props: {
    url: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: Number,
      default: 0
    },
    maxWidth: {
      type: Number,
      default: 0
    }
  },

  methods: {
    getSizedImage(url, width, format) {
      if (url.includes('cdn.shopify.com')) {
        return getSizedImageUrl(url, `${width}x`)
      }
      // Format is used for Sanity hotspot images
      return `${url}?w=${width}${format ? `&fm=${format}` : ''}`
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/responsive-image.scss';
</style>
