<template>
  <div class="orders">
    <p v-if="!orders.length">
      You haven't placed any orders yet...
    </p>
    <div v-else class="orders__grid">
      <ul>
        <li>Order #</li>
        <li>Receipt</li>
        <li>Total</li>
        <li>Status</li>
      </ul>
      <ul v-for="order in orders" :key="order.id">
        <li>{{ order.name }}</li>
        <li>
          <a :href="order.statusUrl" target="_blank" rel="noreferrer">
            View Order
          </a>
        </li>
        <li>{{ order.totalPrice.amount | currency }}</li>
        <li>{{ order.fulfillmentStatus }}</li>
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
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/account-orders.scss';
</style>
