<template>
  <div v-if="customer.defaultAddress" class="account-address">
    <p v-for="(line, i) in customer.defaultAddress.formatted" :key="i">
      {{ line }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AccountDetails',

  props: {
    customer: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/account-details.scss';
</style>
