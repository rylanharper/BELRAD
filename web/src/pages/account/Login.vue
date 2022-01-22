<template>
  <Layout>
    <section class="login">
      <div class="login__wrapper pt-[14vh] md:pt-[18vh]">
        <div class="login__content">
          <h2>Login</h2>
          <p>Enter your email and password.</p>
          <form @submit.prevent="login">
            <input
              id="email"
              type="email"
              name="email"
              v-model.trim="user.email"
              autocapitalize="off"
              autocorrect="off"
              placeholder="Email Address"
              spellcheck="false"
              required
            />
            <input
              id="password"
              type="password"
              name="password"
              v-model.trim="user.password"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              placeholder="Password"
              spellcheck="false"
              required
            />
            <button type="submit">
              <span>{{ isLoading === true ? 'Working...' : 'Login' }}</span>
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
            Incorrect email or password.
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
// Graphql
import { customerLoginMutation } from '@/graphql/queries'

export default {
  name: 'Login',

  metaInfo: {
    title: 'Login',
    meta: [
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Login - BELRAD'
      },
      {
        key: 'twitter:title',
        property: 'twitter:title',
        content: 'Login - BELRAD'
      }
    ]
  },

  data() {
    return {
      errorMessage: false,
      isLoading: false,
      user: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async login() {
      const user = this.user
      this.isLoading = true

      try {
        const { customerAccessTokenCreate } = await this.$graphql.request(customerLoginMutation, {
          input: user
        })
        const { customerAccessToken, customerUserErrors } = customerAccessTokenCreate

        if (customerUserErrors.length) {
          const [{ message }] = customerUserErrors
          throw new Error(message)
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
@import '@/assets/scss/login.scss';
</style>
