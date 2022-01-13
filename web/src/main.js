// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// GraphQL
import GraphQL from './graphql/graphql'

// Vuex
import State from './store'

// Filters
import Currency from './helpers/currency'

// Global Styles
import './assets/scss/app.scss'

// Lazysizes
import 'lazysizes'

export default function(Vue, { appOptions, isClient, router, head }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Typekit
  head.link.push({
    rel: 'stylesheet',
    href: 'https://use.typekit.net/cmw8wuf.css'
  })

  // Return to top of page on route change
  router.options.scrollBehavior = function() {
    return { x: 0, y: 0 }
  }

  // Import global plugins
  Vue.use(GraphQL)

  // Global currency
  Currency(Vue)

  // Add vuex store
  const store = State(Vue, { isClient })
  appOptions.store = store
}
