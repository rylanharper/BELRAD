export default {
  title: 'Home',
  name: 'homePage',
  type: 'document',
  fields: [
    {
      name: 'homePageNote',
      type: 'note',
      options: {
        headline: 'Page Builder',
        message:
          'This page is split into redusable parts (modules) that can be created, edited, and organized in any order. To create a new module click "Add Item"',
        tone: 'default'
      }
    },
    {
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        { type: 'featuredContent' },
        { type: 'featuredImageArray' },
        { type: 'featuredProducts' }
      ]
    }
  ]
}
