<template>
  <div class="filter-container">
    <div class="filter-menu">
      <div v-for="filterType in availableFilters" :key="filterType" class="filter-menu__column">
        <h4 class="filter-title">{{ filterType }}</h4>
        <div
          v-for="filter in filterOptions(filterType)"
          :key="filter"
          @click="$emit('selectStagedNewFilter', filterType, filter)"
          class="filter-option"
        >
          <span
            v-if="filter.includes('#')"
            :style="{ backgroundColor: filter }"
            :class="[
              'option',
              stagedFilters[filterType].includes(filter) ? '--color-selected' : '--unselected'
            ]"
            class="flex w-[12px] h-[12px] rounded-full"
          />
          <span
            v-else-if="!filter.includes('#')"
            :class="[
              'option',
              stagedFilters[filterType].includes(filter) ? '--selected' : '--unselected'
            ]"
            >{{ filter }}</span
          >
        </div>
      </div>
    </div>
    <div class="filter-actions">
      <button @click="$emit('updateCurrentFilters')">
        Apply
      </button>
      <button @click="$emit('updateCurrentFilters', 'reset')">
        &#10005; Reset Filter
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterMenu',

  props: {
    products: {
      type: Array,
      default: () => {
        return []
      }
    },
    availableFilters: {
      type: Array,
      default: () => {
        return ['brand', 'color', 'size', 'price']
      }
    },
    stagedFilters: {
      type: Object,
      required: true
    },
    currentFilters: {
      type: Object,
      required: true
    }
  },

  computed: {
    colorOptions() {
      return this.uniqNonNullAndFlat(
        this.products.map(product => {
          return product.metafields.edges[0].node.value
            ? product.metafields.edges[0].node.value.split(',')
            : 'null'
        })
      )
    },

    priceOptions() {
      return ['$25 - $100', '$100 - $200', '$200 - $300', '$300+']
    },

    brandOptions() {
      if (!this.availableFilters.includes('brand')) return
      return this.uniqNonNullAndFlat(
        this.products.map(product => {
          return product.tags[0]
        })
      )
    },

    sizeOptions() {
      if (!this.availableFilters.includes('size')) return
      return this.uniqNonNullAndFlat(
        this.products.map(product => {
          return [].concat(product.variants.map(variant => variant.selectedOptions[0].value))
        })
      )
    },

    allActiveFilters() {
      return this.availableFilters.reduce((activeFilters, filterType) => {
        activeFilters[filterType] = [
          ...this.currentFilters[filterType],
          ...this.stagedFilters[filterType]
        ]
        return activeFilters
      }, {})
    }
  },

  methods: {
    uniqNonNullAndFlat(arr) {
      return [].concat(...arr).filter((value, index, ar) => {
        return value !== 'null' && ar.indexOf(value) === index
      })
    },

    filterOptions(type) {
      return this[`${type}Options`]
    }
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/filter-menu.scss';
</style>
