import { FileImage } from 'phosphor-react'

export default {
  title: 'Image / Photo Item',
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
      description: 'A short textual description of the image. Important for SEO and accessiblity.',
      validation: Rule => Rule.required(),
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
      filename: 'asset.originalFilename'
    },
    prepare({ asset, title, dimensions, filename }) {
      return {
        imageUrl: asset ? asset : '',
        title: title ? title : filename,
        subtitle: `${dimensions.width}px × ${dimensions.height}px`
      }
    }
  }
}
