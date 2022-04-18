<template>
  <div class="address">
    <div v-if="!customer.defaultAddress">
      <p>
        You have no saved address...
      </p>
    </div>
    <div v-if="customer.defaultAddress" class="account-address">
      <p v-for="(line, i) in customer.defaultAddress.formatted" :key="i">
        {{ line }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountAddress',

  props: {
    customer: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/account-address.scss';
</style>
