import S from '@sanity/desk-tool/structure-builder'

// Icons
import {
  File,
} from 'phosphor-react'

export const pages = S.listItem()
  .title('Pages')
  .icon(File)
  .schemaType('page')
  .child(
    S.documentTypeList('page')
    .title('Pages')
  )