<template>
  <div id="app">
    <app-header />
    <shop-menu />

    <transition
      appear
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
    >
      <router-view />
    </transition>

    <app-footer />
    <cart-modal />
  </div>
</template>

<script>
import AppHeader from '@/components/global/app-header.vue'
import AppFooter from '@/components/global/app-footer.vue'
import ShopMenu from '@/components/global/shop-menu.vue'
import CartModal from './components/global/cart-modal.vue'

// Gsap
import { gsap, Power2 } from 'gsap'

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    ShopMenu,
    CartModal
  },

  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        opacity: 0
      })
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 0.3,
        delay: 0.3,
        ease: Power2.easeOut,
        opacity: 1,
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.2,
        ease: Power2.easeOut,
        opacity: 0,
        onComplete: done
      })
    }
  }
}
</script>
