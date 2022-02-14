<template>
  <div class="orders">
    <p v-if="!orders.length">
      You haven't placed any orders yet...
    </p>
    <div v-else class="orders__grid">
      <ul>
        <li>Order #</li>
        <li>Total</li>
        <li>Status</li>
        <li>Digital Receipt</li>
      </ul>
      <ul v-for="order in orders" :key="order.id">
        <li>{{ order.name }}</li>
        <li>{{ order.totalPrice | currency }}</li>
        <li>{{ order.fulfillmentStatus }}</li>
        <li>
          <a :href="order.statusUrl" target="_blank" rel="noreferrer">
            View Order &#8599;
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountOrders',

  props: {
    orders: {
      type: Array,
      required: true
    }
  },

  methods: {
    formatCurrency({ currencyCode, amount }) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
      }).format(amount).replace('.00', '')
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/account-orders.scss';
</style>
