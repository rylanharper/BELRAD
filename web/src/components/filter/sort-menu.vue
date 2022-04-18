<template>
  <div class="sort-menu">
    <button
      v-for="sortOption in availableSorts"
      :key="sortOption.value"
      @click="stagedSort = sortOption.value, applySort(activeSort)"
    >
      {{ sortOption.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SortMenu',

  props: {
    availableSorts: {
      type: Array,
      required: true
    },
    currentSort: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      stagedSort: ''
    }
  },

  computed: {
    activeSort() {
      return this.stagedSort ? this.stagedSort : this.currentSort
    }
  },

  methods: {
    applySort(newSort) {
      this.stagedSort = ''
      this.$emit('updateSort', newSort)
    }
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/sort-menu.scss';
</style>
