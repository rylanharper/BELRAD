<template>
  <div class="filter-and-sort">
    <!-- Filter and sort menus -->
    <div class="filter-and-sort__cotainer flex mb-3 justify-between">
      <div class="flex">
        <div
          :class="[
            'filter',
            showingFilter ? '-showing' : '-hidden',
            selectedMenu === 'filter' ? '-selected' : '-not-selected'
          ]"
        >
          <button type="button" @click="selectedMenu = 'filter'" class="mr-8">
            Filter
          </button>
          <div :class="['menu', selectedMenu === 'filter' ? '-showing' : '-hidden']">
            <filter-menu
              :available-filters="availableFilters"
              :current-filters="currentFilters"
              :staged-filters="stagedFilters"
              :products="products"
              @selectStagedNewFilter="selectStagedNewFilter"
              @updateCurrentFilters="updateCurrentFilters"
            />
          </div>
        </div>
        <div
          :class="[
            'sort',
            showingSort ? '-showing' : '-hidden',
            selectedMenu === 'sort' ? '-selected' : '-not-selected'
          ]"
        >
          <button @click="selectedMenu = 'sort'">
            Sort
          </button>
          <div :class="['menu', selectedMenu === 'sort' ? '-showing' : '-hidden']">
            <sort-menu
              :available-sorts="availableSorts"
              :current-sort="currentSort"
              @updateSort="updateSort"
            />
          </div>
        </div>
        <div :class="['mask', selectedMenu ? '-showing' : '-hidden']" @click="selectedMenu = ''" />
      </div>
      <div class="text-gray-500">{{ filteredProducts.length }} Items</div>
    </div>
    <!-- Filter and sort results -->
    <div class="selected-filters-and-sorts flex mb-3 flex-wrap">
      <div v-for="filterType in availableFilters" :key="filterType" class="flex flex-wrap">
        <div v-for="filter in currentFilters[filterType]" :key="filter">
          <div
            class="filtered-and-sorted-options cursor-pointer mr-2"
            @click="removeFilter(filterType, filter)"
          >
            <span
              v-if="filter.includes('#')"
              :style="{ background: filter }"
              class="flex w-[12px] h-[12px] rounded-full"
              :class="[
                'filter-option',
                stagedFilters[filterType].includes(filter) ? '-color-selected' : '-unselected'
              ]"
            />
            <span
              v-else-if="!filter.includes('#')"
              :class="[
                'filter-option',
                stagedFilters[filterType].includes(filter) ? '-selected' : '-unselected'
              ]"
              >{{ filter }}</span
            >
          </div>
        </div>
      </div>
      <div v-if="currentSort" @click="currentSort = ''">
        <span class="filtered-and-sorted-options">{{ currentSort }}</span>
      </div>
    </div>
    <!-- Filter and sort slot -->
    <div>
      <slot :filteredProducts="filteredAndSortedProducts"></slot>
    </div>
  </div>
</template>

<script>
import FilterMenu from './filter-menu.vue'
import SortMenu from './sort-menu.vue'

export default {
  name: 'FilterAndSort',

  props: {
    products: {
      type: Array,
      default: () => {
        return []
      }
    },
    availableSorts: {
      type: Array,
      default: () => {
        return [
          { label: 'Trending', value: 'Trending' },
          { label: 'Price High to Low', value: 'price-high-to-low' },
          { label: 'Price Low to High', value: 'price-low-to-high' }
        ]
      }
    },
    availableFilters: {
      type: Array,
      default: () => {
        return ['brand', 'color', 'size', 'price']
      }
    },
    defaultSort: {
      type: String,
      default: ''
    },

    showingSort: {
      type: Boolean,
      default: true
    },
    showingFilter: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const filters = this.clearedFilterObj()
    return {
      currentFilters: { ...filters },
      stagedFilters: { ...filters },
      currentSort: this.defaultSort,
      selectedMenu: ''
    }
  },

  components: {
    FilterMenu,
    SortMenu
  },

  computed: {
    filteredAndSortedProducts() {
      return this.filteredProducts ? this.filteredProducts.slice().sort(this.sortDefinition) : []
    },

    hasFilters() {
      return this.currentFilters && [].concat(...Object.values(this.currentFilters))
    },

    filteredProducts() {
      const filtered = this.hasFilters ? this.products.filter(this.filterDefinition) : this.products
      return filtered.sort(this.sortDefinition)
    },

    sortDefinition() {
      switch (this.currentSort) {
        case 'price-high-to-low':
          return this.sortPriceHighToLow
        case 'price-low-to-high':
          return this.sortPriceLowToHigh
        default:
          return this.sortByManual
      }
    }
  },

  methods: {
    // Filtering logic
    filterDefinition(product) {
      return this.availableFilters.every(filterType => {
        switch (filterType) {
          case 'color':
            return !this.currentFilters.color.length || this.colorFilterDefinition(product)
          case 'brand':
            return (
              !this.currentFilters.brand.length ||
              this.currentFilters.brand.includes(product.tags[0])
            )
          case 'size':
            return !this.currentFilters.size.length || this.sizeFilterDefinition(product)
          case 'price':
            return !this.currentFilters.price.length || this.priceFilterDefinition(product)
        }
      })
    },

    colorFilterDefinition(product) {
      return (
        product.metafields.edges[0].node.value &&
        product.metafields.edges[0].node.value
          .split(',')
          .some(color => this.currentFilters.color.includes(color))
      )
    },

    sizeFilterDefinition(product) {
      return product.variants.some(variant => {
        return this.currentFilters.size.includes(variant.selectedOptions[0].value)
      })
    },

    priceFilterDefinition(product) {
      const price = parseFloat(product.variants[0].price.amount)
      return this.currentFilters.price.some(priceRange => {
        switch (priceRange) {
          case '$25 - $100':
            return price > 0 && price <= 100
          case '$100 - $200':
            return price >= 100 && price <= 200
          case '$200 - $300':
            return price >= 200 && price <= 300
          case '$300+':
            return price >= 300
        }
      })
    },

    // Sorting logic
    sortPriceHighToLow(p1, p2) {
      return parseFloat(p2.variants[0].price.amount) - parseFloat(p1.variants[0].price.amount)
    },

    sortPriceLowToHigh(p1, p2) {
      return parseFloat(p1.variants[0].price.amount) - parseFloat(p2.variants[0].price.amount)
    },

    sortByManual(p1, p2) {
      return p1.manualSortWeight - p2.manualSortWeight
    },

    // State update methods
    updateSort(newSort) {
      this.currentSort = newSort
      this.selectedMenu = ''
    },

    selectStagedNewFilter(type, value) {
      const isRemove = this.stagedFilters[type].includes(value)
      this.stagedFilters[type] = isRemove
        ? this.stagedFilters[type].filter(filter => filter !== value)
        : [...this.stagedFilters[type], value]
    },

    removeFilter(type, value) {
      this.selectStagedNewFilter(type, value)
      this.updateCurrentFilters()
    },

    updateCurrentFilters(isReset) {
      this.selectedMenu = ''

      if (isReset) {
        this.stagedFilters = this.clearedFilterObj()
      }

      this.currentFilters = { ...this.stagedFilters }
    },

    clearedFilterObj() {
      return this.availableFilters.reduce((filters, category) => {
        filters[category] = []
        return filters
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
// Using Windicss + @apply Directive
@import '@/assets/scss/filter-and-sort.scss';
</style>
