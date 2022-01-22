<template>
  <Layout :key="$route.fullPath">
    <section class="page">
      <div class="page__wrapper">
        <h1>{{ $page.page.title }}</h1>
        <block-content
          class="description"
          :blocks="$page.page._rawDescription"
        />
        <div v-if="$page.page.enabled === true" class="contact">
          Have Questions? <span><a href="mailto: nat@silenelyalli.com">Contact Us</a></span>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import BlockContent from '@/components/block-content.vue'

export default {
  name: 'Page',

  metaInfo() {
    return {
      title: this.$page.page.title,
      meta: [
        {
          key: 'og:title',
          property: 'og:title',
          content: `${this.$page.page.title} - BELRAD`
        },
        {
          key: 'twitter:title',
          property: 'twitter:title',
          content: `${this.$page.page.title} - BELRAD`
        }
      ]
    }
  },

  components: {
    BlockContent
  }
}
</script>

<page-query>
query Page ($id: ID!) {
  # SEO
  metadata {
    siteName
    siteUrl
    sanityOptions {
      projectId
      dataset
    }
  }
  page: sanityPage (id: $id) {
    title
    _rawDescription
    enabled
  }
}
</page-query>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/site-page.scss';
</style>
