export default {
  title: 'Footer Settings',
  name: 'footerSettings',
  type: 'document',
  fieldsets: [
    {
      title: 'Block One',
      name: 'footerBlock1',
      description: 'Settings for the first footer block',
      options: { collapsible: true }
    },
    {
      title: 'Block Two',
      name: 'footerBlock2',
      description: 'Settings for the second footer block',
      options: { collapsible: true }
    },
    {
      title: 'Newsletter Settings',
      name: 'newsletterSettings',
      description: 'Settings for the Newsletter',
      options: { collapsible: true }
    }
  ],
  fields: [
    {
      title: 'Block Title',
      name: 'blockTitle1',
      type: 'string',
      fieldset: 'footerBlock1'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu1',
      type: 'array',
      of: [{ type: 'linkItem' }],
      fieldset: 'footerBlock1'
    },
    {
      title: 'Block Title',
      name: 'blockTitle2',
      type: 'string',
      fieldset: 'footerBlock2'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu2',
      type: 'array',
      of: [{ type: 'linkItem' }],
      fieldset: 'footerBlock2'
    },
    {
      title: 'Newsletter',
      name: 'newsletter',
      type: 'newsletter',
      fieldset: 'newsletterSettings'
    },
    {
      title: 'Copyright',
      name: 'copyright',
      type: 'string',
      description: 'Site copyright text',
      validation: rule => rule.required()
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'Footer Settings'
      }
    }
  }
}
