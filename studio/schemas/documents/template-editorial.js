export default {
  title: 'Editorial',
  name: 'editorial',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Page title'
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(required)',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: rule => rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'blockText'
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'imageItem' }]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
