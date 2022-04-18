<template>
  <div class="product-carousel">
    <div ref="slider" class="keen-slider">
      <div v-for="image in images" :key="image.id" class="keen-slider__slide">
        <responsive-image
          :url="image.originalSrc"
          :alt="image.altText"
          :max-height="800"
          :max-width="600"
        />
      </div>
    </div>
    <div v-if="slider" class="dots">
      <button
        v-for="(_slide, idx) in dotHelper"
        @click="slider.moveToIdx(idx)"
        :class="{ dot: true, active: current === idx }"
        :key="idx"
      />
    </div>
  </div>
</template>

<script>
import ResponsiveImage from '@/components/responsive-image.vue'

// Keen Slider
import KeenSlider from 'keen-slider'
import 'keen-slider/keen-slider.min.css'

export default {
  name: 'ProductCarousel',

  components: {
    ResponsiveImage
  },

  props: {
    images: {
      type: Array,
      require: true,
      default: () => []
    }
  },

  data() {
    return {
      current: 0,
      slider: null
    }
  },

  computed: {
    dotHelper() {
      return this.slider ? [...Array(this.slider.track.details.slides.length).keys()] : []
    }
  },

  mounted() {
    this.slider = new KeenSlider(this.$refs.slider, {
      initial: this.current,
      slideChanged: s => {
        this.current = s.track.details.rel
      }
    })
  },

  // beforeDestroy() {
  //   if (this.slider) this.slider.destroy()
  // }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/product-carousel.scss';
</style>
