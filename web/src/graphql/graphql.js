import { GraphQLClient } from 'graphql-request'

const endpoint = `https://${process.env.GRIDSOME_SHOPIFY_STOREFRONT}.myshopify.com/api/2022-04/graphql.json`

export default {
  install (Vue) {
    Vue.prototype.$graphql = new GraphQLClient(endpoint, {
      headers: {
        'X-Shopify-Storefront-Access-Token': 
          process.env.GRIDSOME_SHOPIFY_STOREFRONT_TOKEN
      }
    }) 
  }
}
