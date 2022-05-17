export default {
  title: 'SEO Settings',
  name: 'seoSettings',
  type: 'document',
  fields: [
    {
      name: 'seoSettingsNote',
      type: 'note',
      options: {
        message:
          'Search Engine Optimization (SEO) helps your content rank better in search engines. The site title, description, and default share graphic are used when users share your site through social media and across the web.',
        tone: 'transparent'
      }
    },
    {
      title: 'Default Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: Rule => Rule.max(50).warning('Longer titles may be truncated by search engines')
    },
    {
      title: 'Default Meta Description',
      name: 'metaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: Rule =>
        Rule.max(150).warning('Longer descriptions may be truncated by search engines')
    },
    {
      title: 'Default Meta Keywords',
      name: 'metaKeywords',
      type: 'array',
      description: 'Keywords used for search engines and browsers',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      title: 'Default Share Graphic',
      name: 'shareGraphic',
      type: 'image',
      description: 'Recommended size: 1200x630 (PNG or JPG)'
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'SEO Settings'
      }
    }
  }
}
