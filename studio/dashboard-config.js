export default {
  widgets: [
    {
      name: 'netlify',
      options: {
        title: 'Website Deployment',
        description:
          'NOTE: Because this is a statically built website, it needs to be re-deployed to see changes made when documents are published.',
        sites: [
          {
            title: 'BELRAD',
            apiId: process.env.SANITY_STUDIO_NETLIFY_API_ID,
            buildHookId: process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_ID,
            name: process.env.SANITY_STUDIO_FRONTEND_NAME,
            url: process.env.SANITY_STUDIO_FRONTEND_URL
          }
        ]
      }
    },
    {
      name: 'project-info',
      layout: {
        width: 'medium',
        height: 'small'
      }
    }
  ]
}
