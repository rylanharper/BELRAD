import S from '@sanity/desk-tool/structure-builder'

// Icons
import {
  NewspaperClipping,
} from 'phosphor-react'

export const articles = S.listItem()
  .title('Articles')
  .icon(NewspaperClipping)
  .schemaType('article')
  .child(
    S.documentTypeList('article')
    .title('Articles')
  )