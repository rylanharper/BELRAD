<template>
  <div>
    <g-link
      v-if="!newTab"
      :to="url"
      class="inline-flex md:transition md:duration-300 md:ease"
      :class="{ 'hover:md:text-gray-400': label }"
    >
      <slot>{{ label }}</slot>
    </g-link>
    <a
      v-else-if="newTab"
      :href="url"
      class="inline-flex md:transition md:duration-300 md:ease"
      :class="{ 'hover:md:text-gray-400': label }"
      target="_blank"
      rel="noopener"
    >
      <slot>{{ label }}</slot>
    </a>
  </div>
</template>

<script>
export default {
  name: 'NavLink',

  props: {
    label: {
      type: String
    },
    url: {
      type: String,
      default: ''
    },
    newTab: {
      type: Boolean
    }
  },

  // This is here if you want an active style for each route
  // add to link :class -> 'border-b-black border-current': isActive
  computed: {
    isActive() {
      return this.url && this.$route.path.includes(this.url)
    }
  }
}
</script>
