import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Documents
import homePage from './documents/home-page'
import cookieSettings from './documents/settings-cookie'
import footerSettings from './documents/settings-footer'
import headerSettings from './documents/settings-header'
import promoSettings from './documents/settings-promo'
import seoSettings from './documents/settings-seo'
import article from './documents/template-article'
import author from './documents/template-author'
import editorial from './documents/template-editorial'
import page from './documents/template-page'

// Modules
import featuredContent from './modules/featured-content'
import featuredImageArray from './modules/featured-image-array'
import featuredProducts from './modules/featured-products'

// Objects
import authorReference from './objects/author-reference'
import blockText from './objects/block-text'
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
    cookieSettings,
    footerSettings,
    headerSettings,
    promoSettings,
    seoSettings,
    article,
    author,
    editorial,
    page,

    // Modules
    featuredContent,
    featuredImageArray,
    featuredProducts,

    // Objects
    authorReference,
    blockText,
    imageitem,
    linkItem,
    newsletter
  ])
})
