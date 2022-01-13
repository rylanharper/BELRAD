import { Image } from 'phosphor-react'

export default {
  title: 'Featured Image Array',
  name: 'featuredImageArray',
  type: 'object',
  icon: Image,
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'images' }]
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'Featured Image Array'
      }
    }
  }
}
