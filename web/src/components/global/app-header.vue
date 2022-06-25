<template>
  <header class="header">
    <app-banner />
    <!-- Navigation -->
    <nav role="navigation" class="header__nav">
      <!-- Desktop nav -->
      <div class="nav-desktop">
        <div class="nav-desktop--left">
          <button
            aria-label="menu"
            aria-haspopup="true"
            aria-expanded="false"
            @mouseover="toggleShopMenu"
            class="menu-toggle"
          >
            Shop
          </button>
          <g-link to="/collections/new-arrivals">
            Editorials
          </g-link>
          <g-link to="/collections/new-arrivals">
            About
          </g-link>
        </div>

        <div id="logo">
          <g-link to="/">
            <logo />
          </g-link>
        </div>

        <div class="nav-desktop--right">
          <g-link to="/search">
            Search
          </g-link>
          <g-link :to="isAuthenticated ? '/account' : '/account/login'">
            Account
          </g-link>
          <button
            aria-label="cart"
            aria-haspopup="true"
            aria-expanded="false"
            @click="toggleCartModal"
            class="cart-toggle"
          >
            Bag ({{ cart }})
          </button>
        </div>
      </div>

      <!-- Mobile nav -->
      <div class="nav-mobile">
        <div class="nav-mobile--left">
          <button
            aria-label="menu"
            aria-haspopup="true"
            aria-expanded="false"
            @click="toggleShopMenu"
            class="menu-toggle"
          >
            Menu
          </button>
        </div>

        <div id="logo">
          <g-link to="/">
            <logo />
          </g-link>
        </div>

        <div class="nav-mobile--right">
          <button
            aria-label="cart"
            aria-haspopup="true"
            aria-expanded="false"
            @click="toggleCartModal"
            class="cart-toggle"
          >
            Bag ({{ cart }})
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import AppBanner from './app-banner.vue'

// Logo
import Logo from '@/assets/svg/belrad.svg'

export default {
  name: 'AppHeader',

  components: {
    AppBanner,
    Logo
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },

    cart() {
      return this.$store.getters.cartTotalItems
    }
  },

  methods: {
    toggleShopMenu() {
      this.$store.commit('TOGGLE_SHOP_MENU')
    },

    toggleCartModal() {
      this.$store.commit('TOGGLE_CART_MODAL')
    }
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/app-header.scss';
</style>
