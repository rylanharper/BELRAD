<template>
  <div id="app">
    <app-header />
    <shop-menu />

    <!-- View -->
    <router-view />

    <app-footer />
    <cart-modal />
  </div>
</template>

<script>
import AppHeader from '@/components/global/app-header.vue'
import AppFooter from '@/components/global/app-footer.vue'
import ShopMenu from '@/components/global/shop-menu.vue'
import CartModal from './components/global/cart-modal.vue'

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    ShopMenu,
    CartModal
  }
}
</script>
