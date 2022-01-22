export default {
  metaInfo() {
    return {
      meta: [
        {
          name: 'description',
          content: this.$static.siteSeo.edges[0].node.metaDesc
        },
        {
          key: 'og:site_name',
          property: 'og:site_name',
          content: this.$page.metadata.siteName
        },
        {
          key: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          key: 'og:description',
          property: 'og:description',
          content: this.$static.siteSeo.edges[0].node.metaDesc
        },
        {
          key: 'og:image',
          property: 'og:image',
          content: this.$static.siteSeo.edges[0].node.shareGraphic.asset.url
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: this.$page.metadata.siteUrl + this.$route.fullPath
        },
        {
          key: 'twitter:title',
          property: 'twitter:title',
          content: this.titleTemplate
        },
        {
          key: 'twitter:description',
          property: 'twitter:description',
          content: this.$static.siteSeo.edges[0].node.metaDesc
        },
        {
          key: 'twitter:image',
          property: 'twitter:image',
          content: this.$static.siteSeo.edges[0].node.shareGraphic.asset.url
        },
        {
          key: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  }
}
