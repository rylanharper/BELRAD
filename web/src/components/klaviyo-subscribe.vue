<template>
  <div class="newsletter">
    <span>{{ newsletter.title }}</span>
    <p>{{ newsletter.text }}</p>
    <form aria-label="Newsletter Signup" class="klaviyo-form">
      <input
        :class="{
          input: true,
          'is-invalid': isEmailValid()
        }"
        type="text"
        name="email"
        v-model="userEmail"
        placeholder="Email Address"
        aria-label="Email Address"
      />
      <button type="button" @click="sendForm" :disabled="!isValid">
        <span>{{ isSending === true ? 'Sending...' : 'Send' }}</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'KlaviyoSubscribe',

  data() {
    return {
      userEmail: '',
      isValid: false,
      isSending: false,
      hasSent: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },

  computed: {
    newsletter() {
      return this.$static.footerSettings.edges[0].node.newsletter
    },
    klaviyoListID() {
      return this.$static.footerSettings.edges[0].node.newsletter.klaviyoListID
    }
  },

  methods: {
    sendForm() {
      this.isSending = true

      const config = Object.assign(
        {},
        {
          g: this.klaviyoListID,
          email: this.userEmail
        }
      )

      const body = Object.keys(config).reduce((str, key) => {
        str.append(key, config[key])
        return str
      }, new URLSearchParams())

      return fetch('https://manage.kmail-lists.com/ajax/subscriptions/subscribe', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body
      }).then(res => {
        this.isSending = false
        this.$emit('handleSuccess')
      })
    },

    signupError(e) {
      const errorMessage =
        (e.response && e.response.statusText === 'BAD REQUEST') || 'Form is invalid.'
          ? "You're already on the list"
          : 'Sorry, something went wrong'
      this.$emit('showMessage', errorMessage, 'error')
    },

    isEmailValid() {
      return this.userEmail == ''
        ? ''
        : this.reg.test(this.userEmail)
        ? (this.isValid = true)
        : (this.isValid = false)
    }
  }
}
</script>

<static-query>
query {
  footerSettings: allSanityFooterSettings {
    edges {
      node {
        newsletter {
          klaviyoListID
          title
          text
          success
        }
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/klaviyo-subscribe.scss';
</style>
