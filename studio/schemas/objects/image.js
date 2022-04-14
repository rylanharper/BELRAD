import { FileImage } from 'phosphor-react'

export default {
  title: 'Image Item',
  name: 'imageItem',
  type: 'image',
  icon: FileImage,
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
  ],
  preview: {
    prepare () {
      return {
        title: 'Content Image'
      }
    }
  }
}
