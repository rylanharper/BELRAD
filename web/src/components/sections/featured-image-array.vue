<template>
  <section class="featured-array">
    <div class="featured-array__gallery">
      <div
        v-for="image in images"
        :key="image.asset.id"
        class="featured-array__image"
      >
        <responsive-image
          :url="image.asset.url"
          :alt="image.alt"
          class="pt-[78vh] md:pt-[95vh]"
        />
        <!-- Image link info -->
        <div v-if="image.enabled === true" class="image-link">
          <g-link :to="image.link.url">
            <div class="info">
              <h2>{{ image.caption }}</h2>
              <span>{{ image.link.label }}</span>
            </div>
          </g-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ResponsiveImage from '@/components/responsive-image.vue'

export default {
  name: 'FeaturedContentArray',

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
    images() {
      return this.section.images
    }
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/featured-image-array.scss';
</style>
