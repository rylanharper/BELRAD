export default {
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  fieldsets: [
    {
      title: 'Block One',
      name: 'headerBlock1',
      description: 'Settings for the first header block',
      options: { collapsible: true }
    },
    {
      title: 'Block Two',
      name: 'headerBlock2',
      description: 'Settings for the second header block',
      options: { collapsible: true }
    },
    {
      title: 'Block Three',
      name: 'headerBlock3',
      description: 'Settings for the third header block',
      options: { collapsible: true }
    }
  ],
  fields: [
    {
      name: 'navNote',
      type: 'note',
      options: {
        message: 'On desktop, dropdowns (blocks) will appear as a mega-nav. On mobile, dropdowns will appear as accordions. The cart toggle will always appear to the right of the header on all screen sizes.',
        tone: 'default'
      }
    },
    {
      title: 'Block Title',
      name: 'blockTitle1',
      type: 'string',
      fieldset: 'headerBlock1'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu1',
      type: 'array',
      of: [{ type: 'linkItem' }],
      fieldset: 'headerBlock1'
    },
    {
      title: 'Block Title',
      name: 'blockTitle2',
      type: 'string',
      fieldset: 'headerBlock2'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu2',
      type: 'array',
      of: [{ type: 'linkItem' }],
      fieldset: 'headerBlock2'
    },
    {
      title: 'Block Title',
      name: 'blockTitle3',
      type: 'string',
      fieldset: 'headerBlock3'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu3',
      type: 'array',
      of: [{ type: 'linkItem' }],
      fieldset: 'headerBlock3'
    },
    {
      title: 'Upsell Image',
      name: 'image',
      type: 'imageItem',
      description: 'An upsell image pointing to a product or collection',
      options: { collapsible: true }
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'Header Settings'
      }
    }
  }
}
