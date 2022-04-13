import S from '@sanity/desk-tool/structure-builder'

// Icons
import {
  House,
} from 'phosphor-react'

export const home = S.listItem()
  .title('Home')
  .icon(House)
  .child(
    S.document()
    .schemaType('landingPage')
    .title('Home Page')
  )