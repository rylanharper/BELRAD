import S from '@sanity/desk-tool/structure-builder'

// Icons
import {
  House,
  File,
  NewspaperClipping,
  Users,
  NavigationArrow,
  List,
  Sliders,
  Globe,
  FlagBanner,
  Cookie
} from 'phosphor-react'

// Doc types
const hiddenDocTypes = (listItem) =>
  ![
    'landingPage',
    'page',
    'article',
    'author',
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
        .child(S.document().title('Home Page').schemaType('landingPage')),
      // Pages
      S.listItem()
        .title('Pages')
        .icon(File)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Articles')
        .icon(NewspaperClipping)
        .schemaType('article')
        .child(S.documentTypeList('article').title('Articles')),
      // Authors
      S.divider(),
      S.listItem()
        .title('Authors')
        .icon(Users)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      // Settings
      S.divider(),
      S.listItem()
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
                    .id('headerSettings')
                    .schemaType('headerSettings')
                    .documentId('headerSettings')
                ),
              S.listItem()
                .title('Footer')
                .icon(List)
                .child(
                  S.editor()
                    .id('footerSettings')
                    .schemaType('footerSettings')
                    .documentId('footerSettings')
                ),
              S.listItem()
                .title('SEO')
                .icon(Globe)
                .child(
                  S.editor().id('seoSettings').schemaType('seoSettings').documentId('seoSettings')
                ),
              S.listItem()
                .title('Promo Bar')
                .icon(FlagBanner)
                .child(
                  S.editor()
                    .id('promoSettings')
                    .schemaType('promoSettings')
                    .documentId('promoSettings')
                ),
              S.listItem()
                .title('Cookies')
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
