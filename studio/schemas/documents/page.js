export default {
  title: 'Page',
  name: 'page',
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
      title: 'Enable Contact Link?',
      name: 'enabled',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
