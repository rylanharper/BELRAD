export default {
  title: 'Promo Bar Settings',
  name: 'promoSettings',
  type: 'document',
  fields: [
    {
      title: 'Enable Promo Bar?',
      name: 'enabled',
      type: 'boolean'
    },
    {
      title: 'Promo Bar Title',
      name: 'text',
      type: 'string',
      description: 'The promo banner text',
      validation: rule => rule.required()
    },
    {
      title: 'Promo Bar Color',
      name: 'color',
      type: 'color',
      description: 'The promo banner background color',
      validation: rule => rule.required(),
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Promo Bar Link',
      name: 'link',
      type: 'string',
      description: 'Enter an external URL'
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'Promo Bar Settings'
      }
    }
  }
}
