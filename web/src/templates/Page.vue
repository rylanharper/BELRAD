<template>
  <Layout :key="$route.fullPath">
    <section class="page">
      <div class="page__wrapper pt-[10vh] md:pt-[14vh]">
        <h1>{{ $page.page.title }}</h1>
        <block-content
          class="description"
          :blocks="$page.page._rawDescription"
        />
        <div v-if="$page.page.enabled === true" class="contact">
          Have Questions? <span><a href="mailto:webmaster@example.com">Contact Us</a></span>
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
  }
  page: sanityPage (id: $id) {
    title
    _rawDescription
    enabled
  }
}
</page-query>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/site-page.scss';
</style>
