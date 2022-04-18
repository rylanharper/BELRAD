<template>
  <Layout>
    <div class="recover">
      <div class="recover__wrapper pt-[14vh] md:pt-[18vh]">
        <div class="recover__content">
          <h2>Recover</h2>
          <p>Enter email to reset your password.</p>
          <form @submit.prevent="recover">
            <input
              id="email"
              type="email"
              name="email"
              v-model.trim="email"
              autocapitalize="off"
              autocorrect="off"
              placeholder="Email Address"
              spellcheck="false"
              required
            />
            <button type="submit">
              <span>{{ isLoading === true ? 'Working...' : 'Recover' }}</span>
            </button>
          </form>
        </div>
        <div class="account-links">
          <g-link to="/account/login">Login</g-link>
          <g-link to="/account/register">Create Account</g-link>
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
            The provided email does not exist.
          </div>
          <div class="success-message" v-if="successMessage === true">
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
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Success! Please check email to reset password.
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
// Graphql
import { customerRecoverMutation } from '@/graphql/queries'

export default {
  name: 'Recover',

  metaInfo: {
    title: 'Recover Password',
    meta: [
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Recover Password - BELRAD'
      },
      {
        key: 'twitter:title',
        property: 'twitter:title',
        content: 'Recover Password - BELRAD'
      }
    ]
  },

  data() {
    return {
      successMessage: false,
      errorMessage: false,
      isLoading: false,
      email: ''
    }
  },

  methods: {
    async recover() {
      const email = this.email
      this.isLoading = true

      try {
        const { customerRecover } = await this.$graphql.request(customerRecoverMutation, { email })
        const { customerUserErrors } = customerRecover

        if (customerUserErrors.length) {
          const [{ message }] = customerUserErrors
          throw new Error(message)
        }

        this.successMessage = true
      } catch (error) {
        this.isLoading = false
        this.errorMessage = true

        console.error(error)
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
@import '@/assets/scss/recover.scss';
</style>
