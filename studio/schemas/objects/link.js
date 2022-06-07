import { Link } from 'phosphor-react'

export default {
  title: 'Link Item',
  name: 'linkItem',
  type: 'object',
  icon: Link,
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      description: 'Link display text'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'string',
      description: 'Enter an external or relative URL path',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    },
    {
      title: 'Open in new tab?',
      name: 'newTab',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      label: 'label',
      url: 'url',
      newTab: 'newTab'
    },
    prepare({ label, url, newTab }) {
      return {
        title: `${label}${newTab ? ' (New Tab Link)' : ''}`,
        subtitle: url
      }
    }
  }
}
