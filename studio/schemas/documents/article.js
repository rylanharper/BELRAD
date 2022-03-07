export default {
  title: 'Articles',
  name: 'article',
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
      title: 'Authors',
      name: 'authors',
      type: 'array',
      of: [
        {
          type: 'authorReference'
        }
      ]
    },
    {
      title: 'Description',
      name: 'description',
      type: 'blockText'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
