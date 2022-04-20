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

export default function(Vue, { appOptions, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Import global plugins
  Vue.use(GraphQL)

  // Global currency
  Currency(Vue)

  // Add vuex store
  const store = State(Vue, { isClient })
  appOptions.store = store
}
