import S from '@sanity/desk-tool/structure-builder'

import { home } from './desk/home'
import { pages } from './desk/pages'
import { authors } from './desk/authors'
import { settings } from './desk/settings'

// Doc types
const hiddenDocTypes = (listItem) =>
  ![
    'homePage',
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
      home,
      pages,
      S.divider(),
      authors,
      S.divider(),
      settings,

      // Filter out docs already defined above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
