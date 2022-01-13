<template>
  <portable-text
    :blocks="blocks"
    :serializers="serializers"
    :projectId="$static.metadata.sanityOptions.projectId"
    :dataset="$static.metadata.sanityOptions.dataset"
  />
</template>

<script>
import PortableText from 'sanity-blocks-vue-component'

export default {
  name: 'BlockContent',

  props: {
    blocks: Array
  },

  components: {
    PortableText
  },

  data() {
    return {
      serializers: {
        types: {}
      }
    }
  }
}
</script>

<static-query>
query {
  metadata {
    sanityOptions{
      projectId
      dataset
    }
  }
}
</static-query>

<style lang="scss" scoped>
p {
  @apply mb-7;
}
</style>
