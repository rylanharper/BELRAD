// Changes here requires a server restart
const { api: sanityApi } = require('../studio/sanity.json')

module.exports = {
  siteName: 'BELRAD',
  siteUrl: 'https://belrad.netlify.app/',
  siteDescription: 'Headless ecommerce powered by Vue, Sanity, and Shopify',
  titleTemplate: "%s — BELRAD",

  templates: {
    ShopifyProduct: [
      {
        path: '/products/:handle',
        component: './src/templates/Product.vue'
      }
    ],
    ShopifyCollection: [
      {
        path: '/collections/:handle',
        component: './src/templates/Collection.vue'
      }
    ]
  },

  plugins: [
    {
      use: 'gridsome-plugin-svg',
    },
    {
      use: 'gridsome-plugin-windicss',
      options: {
        preflight: true
      }
    },
    {
      use: 'gridsome-source-sanity',
      options: {
        projectId: sanityApi.projectId,
        dataset: sanityApi.dataset,
        watchMode: process.env.NODE_ENV === 'development'
      }
    },
    {
      use: 'gridsome-source-shopify',
      options: {
        typeName: 'Shopify',
        storeName: process.env.GRIDSOME_SHOPIFY_STOREFRONT,
        storefrontToken: process.env.GRIDSOME_SHOPIFY_STOREFRONT_TOKEN
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        flexsearch: {
          profile: 'match'
        },
        collections: [
          {
            typeName: 'ShopifyProduct',
            indexName: 'Product',
            fields: [
              'id',
              'handle',
              'title',
              'images',
              'variants',
              'availableForSale',
              'priceRange',
              'compareAtPriceRange',
              'metafields',
              'related'
            ]
          }
        ],
        searchFields: ['title', 'handle', 'tags', 'productType']
      }
    },
    {
      use: 'gridsome-plugin-recommender',
      options: {
        enabled: true,
        typeName: 'ShopifyProduct',
        field: 'productType',
        minScore: 0.1,
        maxRelations: 4
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/account/*'],
        config: {
          '/products/*': {
            changefreq: 'daily',
            priority: 0.5
          },
          '/collections/*': {
            changefreq: 'weekly',
            priority: 0.5
          }
        }
      }
    }
  ]
}
