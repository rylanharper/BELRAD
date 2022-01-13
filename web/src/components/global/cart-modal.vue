<template>
  <aside>
    <transition
      appear
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
    >
      <section class="cart-modal" v-if="cartModalOpen">
        <button @click="toggleCartModal" class="shop-menu__close">Close Menu</button>
      </section>
    </transition>
    <!-- Cart backdrop -->
    <transition name="fade">
      <div class="cart-backdrop" v-if="cartModalOpen" @click="toggleCartModal"></div>
    </transition>
  </aside>
</template>

<script>
// Gsap
import { gsap, Power3 } from 'gsap'

export default {
  name: 'CartModal',

  computed: {
    cartModalOpen() {
      return this.$store.state.cartModal
    }
  },

  methods: {
    toggleCartModal() {
      this.$store.commit('TOGGLE_CART_MODAL')
    },

    beforeEnter(el) {
      gsap.set(el, {
        x: '100%'
      })
    },
    enter(el, done) {
      gsap.to(el, {
        duration: .75,
        ease: Power3.easeInOut,
        x: 0,
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        duration: .75,
        ease: Power3.easeInOut,
        x: '100%',
        onComplete: done
      })
    }
  },

  watch: {
    $route(to, from) {
      this.$store.commit('CLOSE_CART_MODAL')
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/cart-modal.scss';
</style>
