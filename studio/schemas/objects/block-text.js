import {
  Article,
  ListBullets,
  ListNumbers,
  TextBolder,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  Link
} from 'phosphor-react'

export default {
  title: 'Block Text',
  name: 'blockText',
  type: 'array',
  icon: Article,
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { 
          title: 'Paragraph',
          value: 'normal' 
        }
      ],
      lists: [
        {
          title: 'Bullet',
          value: 'bullet',
          blockEditor: {
            icon: ListBullets
          }
        },
        {
          title: 'Number',
          value: 'number',
          blockEditor: {
            icon: ListNumbers
          }
        }
      ],
      marks: {
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
            blockEditor: {
              icon: TextBolder
            }
          },
          {
            title: 'Emphasis',
            value: 'em',
            blockEditor: {
              icon: TextItalic
            }
          },
          {
            title: 'Underline',
            value: 'underline',
            blockEditor: {
              icon: TextUnderline
            }
          },
          {
            title: 'Strike Through',
            value: 'strike-through',
            blockEditor: {
              icon: TextStrikethrough
            }
          }
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            blockEditor: {
              icon: Link
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          }
        ]
      }
    }
  ]
}
