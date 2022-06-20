<template>
  <Layout>
    <section class="account">
      <div class="account__wrapper pt-[10vh] md:pt-[14vh]">
        <div v-if="isAuthenticated" class="account__content--auth">
          <h2>My Account</h2>
          <div class="content">
            <div class="content__select">
              <button
                @click="index = 0"
                :class="{
                  'text-white bg-dark-800': index === 0
                }"
              >
                Orders
              </button>
              <button
                @click="index = 1"
                :class="{
                  'text-white bg-dark-800': index === 1
                }"
              >
                Address
              </button>
              <button
                @click="logout"
                :class="{
                  'text-white bg-dark-800': index === 2
                }"
              >
                Logout
              </button>
            </div>
            <div v-if="customer" class="content__data">
              <account-orders v-if="index == 0" :orders="orders" />
              <account-address v-else-if="index == 1" :customer="customer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
// Graphql
import { customerDetails } from '@/graphql/queries'

// Components
import AccountOrders from '@/components/account/account-orders.vue'
import AccountAddress from '@/components/account/account-address.vue'

export default {
  name: 'Account',

  metaInfo: {
    title: 'Account',
    meta: [
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Account - BELRAD'
      },
      {
        key: 'twitter:title',
        property: 'twitter:title',
        content: 'Account - BELRAD'
      }
    ]
  },

  components: {
    AccountOrders,
    AccountAddress
  },

  data() {
    return {
      customer: null,
      index: 0
    }
  },

  async beforeCreate() {
    const userAuth = await this.$store.getters.isAuthenticated
    
    if (!userAuth) {
      this.$router.push({ path: '/account/login' })
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },

    orders() {
      return this.customer.orders.edges.map(({ node }) => node)
    }
  },

  async mounted() {
    const variables = { accessToken: this.$store.getters.accessToken }
    const { customer } = await this.$graphql.request(customerDetails, variables)

    this.customer = customer
  },

  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/account/login')
    }
  }
}
</script>

<page-query>
query {
  # SEO
  metadata {
    siteName
    siteUrl
  }
}
</page-query>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/account.scss';
</style>
