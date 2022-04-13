import { Star } from 'phosphor-react'

export default {
  title: 'Featured Content',
  name: 'featuredContent',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Main Image',
      name: 'image',
      type: 'imageItem'
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'Featured Content'
      }
    }
  }
}
