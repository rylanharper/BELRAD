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
      title: 'Alternative text',
      name: 'alt',
      type: 'string',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Enable text and link?',
      name: 'enabled',
      type: 'boolean'
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      description: 'Image display text',
    },
    {
      title: 'Link Item',
      name: 'link',
      type: 'linkItem'
    }
  ],
  preview: {
    select: {
      asset: 'asset.url',
      title: 'caption',
      dimensions: 'asset.metadata.dimensions',
    },
    prepare({ asset, title, dimensions }) {
      return {
        imageUrl: asset ? asset : '',
        title: title,
        subtitle: `${dimensions.width}px × ${dimensions.height}px`
      }
    }
  }
}
