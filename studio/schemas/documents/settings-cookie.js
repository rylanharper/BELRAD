export default {
  title: 'Cookie Consent Settings',
  name: 'cookieSettings',
  type: 'document',
  fields: [
    {
      name: 'cookiePolicyNote',
      type: 'note',
      options: {
        message:
          'This displays a cookie notice to users to help comply with GDPR laws. It is strongly encouraged to include a link to your cookie usage and privacy policies.',
        tone: 'caution'
      }
    },
    {
      title: 'Enable Cookie Consent?',
      name: 'enabled',
      type: 'boolean'
    },
    {
      title: 'Message',
      name: 'message',
      type: 'text',
      rows: 2,
      description: 'Your cookie consent message'
    },
    {
      title: 'Link',
      name: 'link',
      type: 'string',
      description: 'Enter an external URL'
    }
  ],
  preview: {
    prepare () {
      return {
        title: 'Cookie Consent Settings'
      }
    }
  }
}
