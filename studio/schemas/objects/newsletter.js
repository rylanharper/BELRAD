import { EnvelopeSimple } from 'phosphor-react'

export default {
  title: 'Newsletter Form',
  name: 'newsletter',
  type: 'object',
  icon: EnvelopeSimple,
  fields: [
    {
      title: 'Klaviyo List ID',
      name: 'klaviyoListID',
      type: 'string',
      description: 'Klaviyo Dashboard: List & Segments → Newsletter → Settings',
      validation: Rule => Rule.required()
    },
    {
      title: 'Newsletter Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Newsletter Text',
      name: 'text',
      type: 'string'
    },
    {
      title: 'Success Message',
      name: 'success',
      type: 'string'
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Newsletter'
      }
    }
  }
}