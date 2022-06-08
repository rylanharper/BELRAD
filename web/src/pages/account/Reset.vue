<template>
  <Layout>
    <div class="reset">
      <div class="reset__wrapper pt-[14vh] md:pt-[18vh]">
        <div class="reset__content">
          <h2>Reset</h2>
          <p>Please enter a new password.</p>
          <form @submit.prevent="reset">
            <input
              type="password"
              name="password"
              v-model.trim="user.password"
              autocapitalize="off"
              autocomplete="new-password"
              autocorrect="off"
              placeholder="New Password"
              spellcheck="false"
              required
            />
            <input
              type="password"
              name="password"
              v-model.trim="check.confirm"
              autocapitalize="off"
              autocomplete="new-password"
              autocorrect="off"
              placeholder="Confirm Password"
              spellcheck="false"
              required
            />
            <button type="submit">
              <span>Reset</span>
            </button>
          </form>
        </div>
        <div class="account-links">
          <g-link to="/account/register">Create account</g-link>
          <g-link to="/account/recover">Recover Password</g-link>
        </div>
        <div class="action-status">
          <div class="error-message" v-if="errorMessage === true">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Oops. An error occured.
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
// Graphql
import { customerResetMutation } from '@/graphql/queries'

export default {
  name: 'Reset',

  metaInfo: {
    title: 'Reset Password',
    meta: [
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Reset - BELRAD'
      },
      {
        key: 'twitter:title',
        property: 'twitter:title',
        content: 'Reset - BELRAD'
      }
    ]
  },

  data() {
    return {
      errorMessage: false,
      isLoading: false,
      check: {
        confirm: ''
      },
      id: '',
      user: {
        resetToken: '',
        password: ''
      }
    }
  },

  created() {
    if (process.isClient) {
      let url = new URL(document.URL)
      this.id = 'gid://shopify/Customer/' + url.searchParams.get('id')
      this.user.resetToken = url.searchParams.get('token')
    }
  },

  methods: {
    async reset() {
      const user = this.user
      const id = this.id
      this.isLoading = true

      if (this.user.password === this.check.confirm) {
        try {
          const { customerReset } = await this.$graphql.request(customerResetMutation, { id: id, input: user })
          const { customerAccessToken, customerUserErrors } = customerReset

          if (customerUserErrors.length) {
            const [firstError] = customerUserErrors
            throw new Error(firstError.message)
          }

          await this.$store.dispatch('login', customerAccessToken)
          this.$router.push('/account')
        } catch (error) {
          this.isLoading = false
          this.errorMessage = true

          console.error(error)
        }
      }
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
@import '@/assets/scss/reset-password.scss';
</style>
