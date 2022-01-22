<template>
  <main role="main" id="main">
    <slot />
  </main>
</template>

<script>
// Mixins
import SiteMeta from '@/mixins/site-meta.js'

export default {
  name: 'Layout',

  mixins: [SiteMeta]
}
</script>

<static-query>
query {
  # Sanity
  siteSeo: allSanitySeoSettings {
    edges {
      node {
        metaTitle
        metaDesc
        shareGraphic {
          asset {
            id
            url
          }
        }
      }
    }
  }
}
</static-query>