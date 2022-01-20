<template>
  <Layout>
    <div class="register">
      <div class="register__wrapper pt-[14vh] md:pt-[18vh]">
        <div class="register__content">
          <h2>Register</h2>
          <p>Please enter the following information.</p>
          <form @submit.prevent="register">
            <input
              id="first-name"
              type="text"
              name="firstName"
              v-model.trim="user.firstName"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              placeholder="First Name"
              spellcheck="false"
              required
            />
            <input
              id="last-name"
              type="text"
              name="lastName"
              v-model.trim="user.lastName"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              placeholder="Last Name"
              spellcheck="false"
              required
            />
            <input
              id="email"
              type="email"
              name="email"
              v-model.trim="user.email"
              autocapitalize="off"
              autocomplete="off"
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
              <span>Register</span>
            </button>
          </form>
        </div>
        <div class="account-links">
          <g-link to="/account/login">Login</g-link>
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
            Oops. An error has ocurred.
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
// Graphql
import { customerRegisterMutation, customerLoginMutation } from '@/graphql/queries'

export default {
  name: 'Register',

  metaInfo: {
    title: 'Register'
  },

  data() {
    return {
      errorMessage: false,
      isLoading: false,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        acceptsMarketing: false
      }
    }
  },

  methods: {
    async register() {
      const user = this.user
      this.isLoading = true

      try {
        const { customerCreate } = await this.$graphql.request(customerRegisterMutation, { input: user })
        const { customerUserErrors } = customerCreate

        if (customerUserErrors.length) {
          const [{ message }] = customerUserErrors
          throw new Error(message)
        } else {
          await this.$graphql
            .request(customerLoginMutation, {
              input: { email: this.user.email, password: this.user.password }
            })
            .then(res => {
              const { customerAccessToken } = res.customerAccessTokenCreate
              this.$store.dispatch('login', customerAccessToken), this.$router.push('/account/orders')
            })
        }
      } catch (error) {
        this.isLoading = false
        this.errorMessage = true

        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/register.scss';
</style>
