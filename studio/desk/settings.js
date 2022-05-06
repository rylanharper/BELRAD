import S from '@sanity/desk-tool/structure-builder'

import {
  Sliders,
  NavigationArrow,
  List,
  Globe,
  FlagBanner,
  Cookie
} from 'phosphor-react'

export const settings = S.listItem()
  .title('Settings')
  .icon(Sliders)
  .child(
    S.list()
      .title('Settings')
      .items([
        S.listItem()
          .title('Header')
          .icon(NavigationArrow)
          .child(
            S.editor()
              .schemaType('headerSettings')
              .documentId('headerSettings')
          ),
        S.listItem()
          .title('Footer')
          .icon(List)
          .child(
            S.editor()
              .schemaType('footerSettings')
              .documentId('footerSettings')
          ),
        S.listItem()
          .title('SEO')
          .icon(Globe)
          .child(
            S.editor()
              .id('seoSettings')
              .schemaType('seoSettings')
              .documentId('seoSettings')
          ),
        S.listItem()
          .title('Promo Bar')
          .icon(FlagBanner)
          .child(
            S.editor()
              .schemaType('promoSettings')
              .documentId('promoSettings')
          ),
        S.listItem()
          .title('Cookies')
          .icon(Cookie)
          .child(
            S.editor()
              .schemaType('cookieSettings')
              .documentId('cookieSettings')
          )
      ])
  )
