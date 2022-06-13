// Changes here requires a server restart
const { api: sanityApi } = require('../studio/sanity.json')

module.exports = {
  siteName: 'BELRAD',
  siteUrl: 'https://belrad.netlify.app',
  siteDescription: 'Headless ecommerce powered by Vue, Sanity, and Shopify',
  titleTemplate: '%s — BELRAD',

  templates: {
    SanityPage: [
      {
        path: '/pages/:slug__current',
        component: './src/templates/page.vue'
      }
    ],
    ShopifyProduct: [
      {
        path: '/products/:handle',
        component: './src/templates/product.vue'
      }
    ],
    ShopifyCollection: [
      {
        path: '/collections/:handle',
        component: './src/templates/collection.vue'
      }
    ]
  },

  plugins: [
    {
      use: 'gridsome-plugin-svg'
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
              'tags',
              'productType',
              'variants',
              'availableForSale',
              'priceRange',
              'compareAtPriceRange',
              'options',
              'images',
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
        maxRelations: 10
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
  ],

  chainWebpack: (config, { isProd, isClient }) => {
    if (isProd && isClient) {
      config.optimization.splitChunks({
        chunks: 'initial',
        maxInitialRequests: Infinity,
        cacheGroups: {
          vueVendor: {
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
            name: 'vue-vendors'
          },
          gridsome: {
            test: /[\\/]node_modules[\\/](gridsome|vue-meta)[\\/]/,
            name: 'gridsome-vendors'
          },
          polyfill: {
            test: /[\\/]node_modules[\\/]core-js[\\/]/,
            name: 'core-js'
          }
        }
      })
    }
  }
}
