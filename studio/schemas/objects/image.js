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
    select: {
      asset: 'asset.url',
      title: 'title',
      dimensions: 'asset.metadata.dimensions',
      filename: 'asset.originalFilename'
    },
    prepare(selection) {
      const { asset, title, dimensions, filename } = selection
      return {
        imageUrl: asset ? asset : '',
        title: title ? title : filename,
        subtitle: `${dimensions.width}px × ${dimensions.height}px`
      }
    }
  }
}
