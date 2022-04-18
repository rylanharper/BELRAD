<template>
  <footer class="footer">
    <!-- Navigation -->
    <nav role="contentinfo" class="footer__nav">
      <!-- Desktop footer -->
      <div class="footer-desktop">
        <div class="footer-desktop__column">
          <klaviyo-subscribe v-if="!emailSent" @handleSuccess="handleSuccess" />
          <span v-if="emailSent" class="newsletter-success">{{ footer.newsletter.success }}</span>
        </div>
        <div class="footer-desktop__column">
          <ul v-if="secondMenu.length">
            <li v-for="link in secondMenu" :key="link.id">
              <g-link :to="link.url">
                {{ link.label }}
              </g-link>
            </li>
          </ul>
        </div>
        <div class="footer-desktop__column">
          <ul v-if="firstMenu.length">
            <li v-for="link in firstMenu" :key="link.id">
              <g-link :to="link.url">
                {{ link.label }}
              </g-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Desktop mobile -->
      <div class="footer-mobile">
        <div class="footer-mobile__column">
          <klaviyo-subscribe v-if="!emailSent" @handleSuccess="handleSuccess" />
          <span v-if="emailSent" class="newsletter-success">{{ footer.newsletter.success }}</span>
        </div>
        <div class="footer-mobile__column">
          <ul v-if="secondMenu.length">
            <li v-for="link in secondMenu" :key="link.id">
              <g-link :to="link.url">
                {{ link.label }}
              </g-link>
            </li>
          </ul>
          <ul v-if="firstMenu.length">
            <li v-for="link in firstMenu" :key="link.id">
              <g-link :to="link.url">
                {{ link.label }}
              </g-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <section class="footer__brand">
      <div class="brand-copyright">{{ footer.copyright }}</div>
      <div class="brand-logo">
        <g-link to="/">
          <logo />
        </g-link>
      </div>
    </section>
  </footer>
</template>

<script>
import KlaviyoSubscribe from '@/components/klaviyo-subscribe.vue'

// Logo
import Logo from '@/assets/svg/belrad.svg'

export default {
  name: 'AppFooter',

  components: {
    KlaviyoSubscribe,
    Logo
  },

  data() {
    return {
      emailSent: false
    }
  },

  computed: {
    footer() {
      return this.$static.footerSettings.edges[0].node
    },

    firstMenu() {
      return this.$static.footerSettings.edges[0].node.blockMenu1
    },

    secondMenu() {
      return this.$static.footerSettings.edges[0].node.blockMenu2
    }
  },

  methods: {
    handleSuccess() {
      this.emailSent = true
    }
  }
}
</script>

<static-query>
query {
  # Sanity
  footerSettings: allSanityFooterSettings {
    edges {
      node {
        blockTitle1
        blockMenu1 {
          label
          url
        }
        blockTitle2
        blockMenu2 {
          label
          url
        }
        newsletter {
          klaviyoListID
          title
          text
          success
        }
        copyright
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/app-footer.scss';
</style>
