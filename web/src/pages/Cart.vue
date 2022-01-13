<template>
  <Layout>
    <section class="cart">
      <!-- Cart filled state -->
      <div v-if="cart.length" class="cart-content">
        <h2 class="cart-content__title">Your Cart</h2>
        <span class="cart-content__count">Items: {{ itemsTotal }}</span>
        <!-- Cart item -->
        <div v-for="item in cart" :key="item.variantId" class="cart-item">
          <!-- Cart item image -->
          <g-link class="cart-item__link" :to="item.path">
            <figure class="cart-item__thumbnail-image">
              <picture>
                <img :src="item.image.thumbnail" :alt="item.image.altText || item.title" />
              </picture>
            </figure>
          </g-link>
          <!-- Cart item details -->
          <div class="cart-item__details">
            <!-- Cart item header -->
            <div class="cart-item__header">
              <div class="cart-item__title">
                <h3 class="cart-item__name">{{ item.productTitle }}</h3>
                <span class="cart-item__variant">
                  Size:
                  {{ item.variantTitle !== 'Default Title' ? item.variantTitle : '' }}
                </span>
              </div>
              <div @click="removeItem(item.variantId)" class="cart-item__remove">
                &#215; Remove
              </div>
            </div>
            <!-- Cart item tools -->
            <div class="cart-item__tools">
              <div class="cart-item__quantity">
                <div>
                  <span @click="decreaseItemQty(item)" class="increase">-</span>
                  <span>{{ item.qty }}</span>
                  <span @click="increaseItemQty(item)" class="decrease">+</span>
                </div>
              </div>
              <span class="cart-item__price">{{ item.total | currency }}</span>
            </div>
          </div>
        </div>
        <!-- Checkout -->
        <div class="cart-checkout">
          <span class="cart-checkout__total">Subtotal: {{ cartTotal | currency }}</span>
          <form @submit.prevent="checkout" class="cart-checkout__submit">
            <button :class="{ 'is-loading': isLoading }" type="submit">
              <span>Checkout &#8594;</span>
            </button>
          </form>
        </div>
      </div>
      <!-- Cart empty state -->
      <div v-else class="cart-empty">
        <h2 class="cart-empty__title">Your Cart is Empty</h2>
        <g-link to="/" class="cart-empty__link">Shop Products</g-link>
      </div>
    </section>
  </Layout>
</template>

<script>
// Graphql
import { checkoutCreateMutation } from '@/graphql/queries'

export default {
  name: 'Cart',

  metaInfo: {
    title: 'Your Cart'
  },

  data() {
    return {
      isLoading: false
    }
  },

  computed: {
    cart() {
      return this.$store.state.cart
    },
    itemsTotal() {
      return this.$store.getters.cartTotalItems
    },
    cartTotal() {
      return this.$store.getters.cartTotal
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
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/cart.scss';
</style>
