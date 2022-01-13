const path = require('path')

module.exports = async ({ createPage, graphql }) => {
  const { data } = await graphql(`
    query {
      allSanityPage {
        edges {
          node {
            id
            title
            slug {
              current
            }
            _rawDescription
            enabled
          }
        }
      }
    }
  `)

  data.allSanityPage.edges.forEach(({ node: page }) => {
    createPage({
      path: `/pages/${page.slug.current}/`,
      component: path.resolve(__dirname, '../../src/templates/Page.vue'),
      context: page
    })
  })
}
