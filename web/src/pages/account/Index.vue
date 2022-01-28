<template>
  <Layout>
    <section class="account">
      <div class="account__wrapper pt-[10vh] md:pt-[12vh]">
        <div v-if="isAuthenticated" class="account__content--auth">
          <h2>My Account</h2>
          <p>Order History</p>
          <div v-if="customer">
            <account-orders :orders="orders" />
            <account-details :customer="customer" />
          </div>
          <button @click="logout">Logout</button>
        </div>
        <div v-else class="account__content--null">
          <p>
            To view your order account information, please
            <span class="underline"><g-link to="/account/login">sign in</g-link></span>.
          </p>
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
import AccountDetails from '@/components/account/account-details.vue'

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
    AccountDetails
  },

  data() {
    return {
      customer: null,
      index: 0
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
// Using BEM + Tailwind @apply
@import '@/assets/scss/account.scss';
</style>
