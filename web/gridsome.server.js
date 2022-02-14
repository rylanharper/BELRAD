// Changes here requires a server restart.
const clientConfig = require('./client-config')

module.exports = function(api) {
  api.loadSource(store => {
    store.addMetadata('sanityOptions', clientConfig.sanity)
  })
}
