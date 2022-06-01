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
          'This module displays the most recent products added to Shopify. No configuration is required.',
        tone: 'positive'
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