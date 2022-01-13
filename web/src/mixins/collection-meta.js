export default {
  metaInfo() {
    return {
      title: this.$page.shopifyCollection.title,
      link: [
        {
          key: 'canonical',
          ref: 'canonical',
          content: this.$page.metadata.siteUrl + this.$page.shopifyCollection.path
        }
      ],
      meta: [
        {
          key: 'og:title',
          property: 'og:title',
          content: this.$page.shopifyCollection.title
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: this.$page.metadata.siteUrl + this.$page.shopifyCollection.path
        },
        // {
        //   key: 'og:image',
        //   property: 'og:image',
        //   content: this.$page.shopifyCollection.image.thumbnail
        // },
        {
          key: 'og:type',
          property: 'og:type',
          content: 'collection'
        },
        {
          key: 'og:price:currency',
          property: 'og:price:currency',
          content: 'USD'
        },
        {
          key: 'og:site_name',
          property: 'og:site_name',
          content: this.$page.metadata.siteName
        },
        {
          key: 'twitter:title',
          property: 'twitter:title',
          content: this.$page.shopifyCollection.title
        },
        // {
        //   key: 'twitter:image',
        //   property: 'twitter:image',
        //   content: this.$page.shopifyCollection.image.thumbnail
        // },
        {
          key: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  }
}
