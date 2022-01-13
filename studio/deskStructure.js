import S from '@sanity/desk-tool/structure-builder'

// Icons
import {
  House,
  File,
  NavigationArrow,
  Scroll,
  Gear,
  Globe,
  FlagBanner,
  Cookie
} from 'phosphor-react'

// Doc types
const hiddenDocTypes = (listItem) =>
  ![
    'landingPage',
    'page',
    'headerSettings',
    'footerSettings',
    'seoSettings',
    'promoSettings',
    'cookieSettings'
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      // Home
      S.listItem()
        .title('Home')
        .icon(House)
        .child(S.document().title('Landing Page').schemaType('landingPage')),
      // Pages
      S.listItem()
        .title('Pages')
        .icon(File)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Site Pages')),
      // Settings
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(Gear)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Header Settings')
                .icon(NavigationArrow)
                .child(
                  S.editor()
                    .id('headerSettings')
                    .schemaType('headerSettings')
                    .documentId('headerSettings')
                ),
              S.listItem()
                .title('Footer Settings')
                .icon(Scroll)
                .child(
                  S.editor()
                    .id('footerSettings')
                    .schemaType('footerSettings')
                    .documentId('footerSettings')
                ),
              S.listItem()
                .title('SEO Settings')
                .icon(Globe)
                .child(
                  S.editor().id('seoSettings').schemaType('seoSettings').documentId('seoSettings')
                ),
              S.listItem()
                .title('Promo Settings')
                .icon(FlagBanner)
                .child(
                  S.editor()
                    .id('promoSettings')
                    .schemaType('promoSettings')
                    .documentId('promoSettings')
                ),
              S.listItem()
                .title('Cookie Settings')
                .icon(Cookie)
                .child(
                  S.editor()
                    .id('cookieSettings')
                    .schemaType('cookieSettings')
                    .documentId('cookieSettings')
                )
            ])
        ),
      // Filter out docs already defined above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
