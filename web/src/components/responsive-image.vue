<template>
  <figure
    class="responsive-image"
    :style="{ paddingTop: `${(maxHeight / maxWidth) * 100}%` }"
  >
    <img
      data-sizes="auto"
      :data-srcset="imageSrcset"
      :alt="alt"
      class="lazyload"
    />
  </figure>
</template>

<script>
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

  computed: {
    imageSrcset() {
      const sizes = [320, 640, 1280, 1600, 1920, 2560, 3200]
      const srcset = []

      sizes.forEach((width) => {
        const url = this.url
        const transform = `?w=${width}&auto=format&fit=max`

        srcset.push(
          `${url}${transform} ${width}w`
        )
      })

      return srcset.join(', ')
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/responsive-image.scss';
</style>
