export default {
  metaInfo() {
    return {
      title: this.$page.shopifyProduct.title,
      link: [
        {
          key: 'canonical',
          ref: 'canonical',
          content: this.$page.metadata.siteUrl + this.$page.shopifyProduct.path
        }
      ],
      meta: [
        {
          key: 'og:title',
          property: 'og:title',
          content: this.$page.shopifyProduct.title
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: this.$page.metadata.siteUrl + this.$page.shopifyProduct.path
        },
        {
          key: 'og:image',
          property: 'og:image',
          content: this.currentVariant.image.thumbnail
        },
        {
          key: 'og:type',
          property: 'og:type',
          content: 'product'
        },
        {
          key: 'og:price:amount',
          property: 'og:price:amount',
          content: this.currentVariant.price.amount
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
          content: this.$page.shopifyProduct.title
        },
        {
          key: 'twitter:image',
          property: 'twitter:image',
          content: this.currentVariant.image.thumbnail
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
