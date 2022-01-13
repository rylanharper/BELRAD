// Changes here requires a server restart.
const clientConfig = require('./client-config')

// Pages
const createSanityPages = require('./scripts/pages/page')

module.exports = function(api) {
  api.loadSource(store => {
    store.addMetadata('sanityOptions', clientConfig.sanity)
  })

  api.createPages(async ({ createPage, graphql }) => {
    await createSanityPages({ createPage, graphql })
  })
}
