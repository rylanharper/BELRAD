export default {
  widgets: [
    {
      name: 'project-users',
      layout: {
        width: 'medium',
        height: 'small'
      }
    },
    {
      name: 'project-info',
      layout: {
        width: 'medium',
        height: 'small'
      },
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '619725f7b47741601c52b591',
                  title: 'Silene Lyalli Studio',
                  name: 'silene-lyalli-studio',
                  apiId: 'f4c17e13-7b2c-4c62-bd2e-eb1cb90da8bc'
                },
                {
                  buildHookId: '6197269b41d10a5068cec5e1',
                  title: 'Silene Lyalli Website',
                  name: 'silene-lyalli',
                  apiId: 'b34d2cb8-c201-475d-a06f-13758df06538'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub Repo',
            value: 'https://github.com/rylanharper/Silene-Lyalli',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://silene-lyalli.netlify.app',
            category: 'apps'
          }
        ]
      }
    }
  ]
}
