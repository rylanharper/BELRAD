<template>
  <div class="product-gallery">
    <div v-for="image in images" :key="image.id" class="image">
      <responsive-image
        :url="image.originalSrc"
        :alt="image.altText"
        :max-height="900"
        :max-width="600"
      />
    </div>
  </div>
</template>

<script>
import ResponsiveImage from '@/components/responsive-image.vue'

export default {
  name: 'ProductGallery',

  components: {
    ResponsiveImage
  },

  props: {
    images: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/product-gallery.scss';
</style>
