export default {
  title: 'Home',
  name: 'homePage',
  type: 'document',
  fields: [
    {
      name: 'homePageNote',
      type: 'note',
      options: {
        message:
          'This page is split into redusable sections (modules) that can be created, edited, and organized in any order. To create a new module click ADD ITEM.',
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
