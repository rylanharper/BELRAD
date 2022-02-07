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
      <section class="cart" v-if="cartModalOpen">
        <!-- Cart header -->
        <div class="cart__header">
          <h2>Cart: {{ itemsTotal }}</h2>
          <button @click="closeCartModal" class="shop-menu__close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-width="1.2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Cart content -->
        <div class="cart__content">
          <!-- Cart filled state -->
          <div v-if="cart.length" class="cart__content--filled">
            <!-- Cart item -->
            <div v-for="item in cart" :key="item.variantId" class="cart-item">
              <g-link class="cart-image" :to="item.path">
                <figure class="cart-image__thumbnail">
                  <img :src="item.image.thumbnail" :alt="item.image.altText || item.title" />
                </figure>
              </g-link>
              <div class="cart-details">
                <div class="cart-details__header">
                  <div class="info">
                    <h3 class="name">{{ item.productTitle }}</h3>
                    <span class="variants">
                      {{ item.variantTitle !== 'Default Title' ? item.variantTitle : '' }}
                    </span>
                  </div>
                  <span class="price">{{ item.total | currency }}</span>
                </div>
                <div class="cart-details__tools">
                  <div class="quantity">
                    <div class="quantity-container">
                      <button @click="decreaseItemQty(item)" class="increase">-</button>
                      <span>{{ item.qty }}</span>
                      <button @click="increaseItemQty(item)" class="decrease">+</button>
                    </div>
                  </div>
                  <div @click="removeItem(item.variantId)" class="remove">
                    Remove
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Cart empty state -->
          <div v-else class="cart__content--empty">
            <span>Your Cart is Empty</span>
          </div>
        </div>
        <!-- Cart checkout -->
        <div class="cart__checkout">
          <form @submit.prevent="checkout" v-if="cart.length">
            <button type="submit" class="button--filled">
              Checkout | {{ cartTotal | currency }}
            </button>
          </form>
          <button v-else @click="closeCartModal" class="button--empty">Continue Shopping</button>
          <p v-if="cart.length">Taxes &amp; shipping will be calculated at checkout</p>
        </div>
      </section>
    </transition>
    <!-- Cart backdrop -->
    <transition name="fade">
      <div class="cart-backdrop" v-if="cartModalOpen" @click="closeCartModal"></div>
    </transition>
  </aside>
</template>

<script>
// Graphql
import { checkoutCreateMutation } from '@/graphql/queries'

// Gsap
import { gsap, Power3 } from 'gsap'

export default {
  name: 'CartModal',

  data() {
    return {
      isLoading: false
    }
  },

  computed: {
    cart() {
      return this.$store.getters.cart
    },

    itemsTotal() {
      return this.$store.getters.cartTotalItems
    },

    cartTotal() {
      return this.$store.getters.cartTotal
    },

    cartModalOpen() {
      return this.$store.state.cartModal
    }
  },

  methods: {
    async checkout() {
      this.isLoading = true

      const lineItems = this.cart.map(item => ({
        quantity: item.qty,
        variantId: item.variantId
      }))

      const checkoutInput = { lineItems }

      try {
        const { checkoutCreate } = await this.$graphql.request(checkoutCreateMutation, {
          input: checkoutInput
        })
        const { checkout, checkoutUserErrors } = checkoutCreate

        if (checkoutUserErrors.length) {
          const [{ message }] = checkoutUserErrors
          throw new Error(message)
        }

        window.location = checkout.webUrl
      } catch (error) {
        console.error(error)
        this.isLoading = false
      }
    },

    async removeItem(itemId) {
      await this.$store.dispatch('removeFromCart', itemId)
    },

    async decreaseItemQty(item) {
      if (item.qty === 1) return
      const qty = item.qty - 1
      await this.$store.dispatch('updateItemQty', {
        itemId: item.variantId,
        qty
      })
    },

    async increaseItemQty(item) {
      const qty = item.qty + 1
      await this.$store.dispatch('updateItemQty', {
        itemId: item.variantId,
        qty
      })
    },

    async updateItemQty(item, qty) {
      if (qty <= 0) return
      await this.$store.dispatch('updateItemQty', {
        itemId: item.variantId,
        qty
      })
    },

    closeCartModal() {
      this.$store.commit('CLOSE_CART_MODAL')
    },

    beforeEnter(el) {
      gsap.set(el, {
        x: '100%'
      })
    },

    enter(el, done) {
      gsap.to(el, {
        duration: 0.75,
        ease: Power3.easeInOut,
        x: 0,
        onComplete: done
      })
    },

    leave(el, done) {
      gsap.to(el, {
        duration: 0.75,
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
