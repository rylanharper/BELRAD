<template>
  <div class="content-sections">
    <div :key="section.id" v-for="section in content">
      <featured-content :section="section" v-if="section._type === 'featuredContent'" />
      <featured-image-array :section="section" v-if="section._type === 'featuredImageArray'" />
      <featured-products :section="section" v-if="section._type === 'featuredProducts'" />
    </div>
  </div>
</template>

<script>
import FeaturedContent from '@/components/sections/featured-content.vue'
import FeaturedImageArray from '@/components/sections/featured-image-array.vue'
import FeaturedProducts from '@/components/sections/featured-products.vue'

export default {
  name: 'ContentSections',

  components: {
    FeaturedContent,
    FeaturedImageArray,
    FeaturedProducts
  },

  props: {
    content: {
      type: Array,
      required: true
    }
  }
}
</script>
