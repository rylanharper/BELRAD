import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Documents
import homePage from './documents/home-page'
import page from './documents/page'
import article from './documents/article'
import author from './documents/author'
import headerSettings from './documents/settings-header'
import footerSettings from './documents/settings-footer'
import seoSettings from './documents/settings-seo'
import promoSettings from './documents/settings-promo'
import cookieSettings from './documents/settings-cookie'

// Modules
import featuredContent from './modules/featured-content'
import featuredImageArray from './modules/featured-image-array'
import featuredProducts from './modules/featured-products'

// Objects
import blockText from './objects/block-text'
import authorReference from './objects/author-reference'
import imageitem from './objects/image'
import linkItem from './objects/link'
import newsletter from './objects/newsletter'

/*  ------------------------------------------ */
/*  Your Schema documents / modules / objects
/*  ------------------------------------------ */
export default createSchema({
  name: 'content',

  types: schemaTypes.concat([
    // Documents
    homePage,
    page,
    article,
    author,
    footerSettings,
    headerSettings,
    seoSettings,
    promoSettings,
    cookieSettings,

    // Modules
    featuredContent,
    featuredImageArray,
    featuredProducts,

    // Objects
    blockText,
    authorReference,
    imageitem,
    linkItem,
    newsletter
  ])
})
