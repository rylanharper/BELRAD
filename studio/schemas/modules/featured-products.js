import { TShirt } from 'phosphor-react'

export default {
  title: 'Featured Products',
  name: 'featuredProducts',
  type: 'object',
  icon: TShirt,
  fields: [
    {
      name: 'featuredProductsNote',
      type: 'note',
      options: {
        message:
          'This module displays the most recent products from the Shopify storefront. No configuration is required.',
        tone: 'default'
      }
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Product / Collection Title'
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'Featured Products'
      }
    }
  }
}