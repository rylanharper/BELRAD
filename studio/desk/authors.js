import S from '@sanity/desk-tool/structure-builder'

// Icons
import {
  Users,
} from 'phosphor-react'

export const authors = S.listItem()
  .title('Authors')
  .icon(Users)
  .schemaType('author')
  .child(
    S.documentTypeList('author')
    .title('Authors')
  )