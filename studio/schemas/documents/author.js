export default {
  title: 'Author',
  name: 'author',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageItem'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
