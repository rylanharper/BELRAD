import S from '@sanity/desk-tool/structure-builder'

// Icons
import {
  File,
  NewspaperClipping
} from 'phosphor-react'

export const pages = S.listItem()
  .title('Pages')
  .icon(File)
  .child(
    S.list()
      .title('Pages')
      .items([
        S.listItem()
          .title('Pages')
          .icon(File)
          .schemaType('page')
          .child(
            S.documentTypeList('page')
          ),
        S.listItem()
          .title('Articles')
          .icon(NewspaperClipping)
          .schemaType('article')
          .child(
            S.documentTypeList('article')
          )
      ])
  )