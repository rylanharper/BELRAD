const { api: sanityApi } = require('../studio/sanity.json')

module.exports = {
  sanity: {
    projectId: sanityApi.projectId,
    dataset: sanityApi.dataset
  }
}
