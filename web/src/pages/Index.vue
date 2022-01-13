<template>
  <Layout>
    <content-sections :content="content" />
  </Layout>
</template>

<script>
import ContentSections from '@/components/sections/content-sections.vue'

export default {
  name: 'Index',

  metaInfo: {
    titleTemplate: 'BELRAD'
  },

  components: {
    ContentSections
  },

  computed: {
    content() {
      return this.$page.landingPage.edges[0].node.sections
    }
  }
}
</script>

<page-query>
query {
  # Sanity
  landingPage: allSanityLandingPage {
    edges {
      node {
        sections {
          ... on SanityFeaturedContent {
            _type
            image {
              alt
              asset {
                id
                url
              }
              enabled
              text
              link {
                label
                url
              }
            }
          }
          ... on SanityFeaturedImageArray {
            _type
            images {
              alt
              asset {
                id
                url
              }
              enabled
              text
              link {
                label
                url
              }
            }
          },
          ... on SanityFeaturedProducts {
            _type
            title
          }
        }
      }
    }
  }
}
</page-query>
