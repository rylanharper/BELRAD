import { ArrowSquareOut } from 'phosphor-react'

export default {
  title: 'Link Item',
  name: 'linkItem',
  type: 'object',
  icon: ArrowSquareOut,
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'string',
      description: 'Enter a URL path → Example: "/collections/new-arrivals"'
    }
  ]
}