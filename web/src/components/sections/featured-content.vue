<template>
  <section class="featured-content">
    <responsive-image
      :url="image.asset.url"
      :alt="image.alt"
      class="pt-[78vh] md:pt-[95vh]"
    />
    <!-- Content Info -->
    <div v-if="image.enabled === true" class="image-link">
      <g-link :to="image.link.url">
        <div class="info">
          <h2>{{ image.text }}</h2>
          <span>{{ image.link.label }}</span>
        </div>
      </g-link>
    </div>
  </section>
</template>

<script>
import ResponsiveImage from '@/components/responsive-image.vue'

export default {
  name: 'FeaturedContent',

  components: {
    ResponsiveImage
  },

  props: {
    section: {
      type: Object,
      required: true
    }
  },

  computed: {
    image() {
      return this.section.image
    }
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/featured-content.scss';
</style>
