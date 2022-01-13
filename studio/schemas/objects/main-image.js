import { Image } from 'phosphor-react'

export default {
  title: 'Main Image',
  name: 'mainImage',
  type: 'image',
  icon: Image,
  options: {
    hotspot: false
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Enable Text and Link?',
      name: 'enabled',
      type: 'boolean'
    },
    {
      title: 'Title',
      name: 'text',
      type: 'string'
    },
    {
      title: 'Link Item',
      name: 'link',
      type: 'linkItem'
    }
  ]
}
