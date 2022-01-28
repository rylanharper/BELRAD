<template>
  <transition
    appear
    mode="out-in"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    :css="false"
  >
    <div class="shop-menu" v-if="shopMenuOpen">
      <transition-group
        appear
        mode="out-in"
        @before-enter="menuBeforeEnter"
        @enter="menuEnter"
        :css="false"
      >
        <!-- Shop menu desktop -->
        <div class="menu-desktop" key="desktop" @mouseleave="closeShopMenu">
          <div class="menu-desktop__links">
            <div class="column">
              <span>{{ menu.blockTitle1 }}</span>
              <ul v-if="menu.blockMenu1.length">
                <li v-for="link in menu.blockMenu1" :key="link.id">
                  <g-link :to="link.url">
                    {{ link.label }}
                  </g-link>
                </li>
              </ul>
            </div>
            <div class="column">
              <span>{{ menu.blockTitle2 }}</span>
              <ul v-if="menu.blockMenu2.length">
                <li v-for="link in menu.blockMenu2" :key="link.id">
                  <g-link :to="link.url">
                    {{ link.label }}
                  </g-link>
                </li>
              </ul>
            </div>
            <div class="column">
              <span>{{ menu.blockTitle3 }}</span>
              <ul v-if="menu.blockMenu3.length">
                <li v-for="link in menu.blockMenu3" :key="link.id">
                  <g-link :to="link.url">
                    {{ link.label }}
                  </g-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="menu-desktop__upsell">
            <responsive-image
              :url="menu.image.asset.url"
              :alt="menu.image.alt"
              :max-height="800"
              :max-width="600"
            />
            <div v-if="menu.image.enabled === true" class="image-link">
              <g-link :to="menu.image.link.url">
                <div class="info">
                  <h2>{{ menu.image.text }}</h2>
                  <span>{{ menu.image.link.label }}</span>
                </div>
              </g-link>
            </div>
          </div>
        </div>

        <!-- Shop menu mobile -->
        <div class="menu-mobile" key="mobile">
          <div class="menu-mobile__links">
            <ul v-if="menu.blockMenu1.length">
              <li v-for="link in menu.blockMenu1" :key="link.id">
                <g-link :to="link.url">
                  {{ link.label }}
                </g-link>
              </li>
            </ul>
            <span @click="showBlock2 = !showBlock2">{{ menu.blockTitle2 }} +</span>
            <transition
              appear
              mode="out-in"
              @before-enter="acBeforeEnter"
              @enter="acEnter"
              @leave="acLeave"
              :css="false"
            >
              <ul v-show="showBlock2" v-if="menu.blockMenu2.length" class="ml-4 overflow-hidden relative">
                <li v-for="link in menu.blockMenu2" :key="link.id">
                  <g-link :to="link.url">
                    {{ link.label }}
                  </g-link>
                </li>
              </ul>
            </transition>
            <span @click="showBlock3 = !showBlock3">{{ menu.blockTitle3 }} +</span>
            <transition
              appear
              mode="out-in"
              @before-enter="acBeforeEnter"
              @enter="acEnter"
              @leave="acLeave"
              :css="false"
            >
              <ul v-show="showBlock3" v-if="menu.blockMenu3.length" class="ml-4 overflow-hidden relative">
                <li v-for="link in menu.blockMenu3" :key="link.id">
                  <g-link :to="link.url">
                    {{ link.label }}
                  </g-link>
                </li>
              </ul>
            </transition>
            <div class="page-links">
              <g-link to="/search">
                Editorials
              </g-link>
              <g-link to="/search">
                About
              </g-link>
              <g-link to="/search">
                Search
              </g-link>
              <g-link :to="isAuthenticated ? '/account' : '/account/login'">
                Account
              </g-link>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </transition>
</template>

<script>
import ResponsiveImage from '@/components/responsive-image.vue'

// Gsap
import { gsap, Expo } from 'gsap'

export default {
  name: 'ShopMenu',

  components: {
    ResponsiveImage
  },

  data() {
    return {
      showBlock2: false,
      showBlock3: false
    }
  },

  computed: {
    menu() {
      return this.$static.headerSettings.edges[0].node
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },

    shopMenuOpen() {
      return this.$store.state.shopMenu
    }
  },

  methods: {
    closeShopMenu() {
      this.$store.commit('CLOSE_SHOP_MENU')
    },

    toggleShopMenu() {
      this.$store.commit('TOGGLE_SHOP_MENU')
    },

    beforeEnter(el) {
      gsap.set(el, {
        y: '-100%'
      })
    },

    enter(el, done) {
      gsap.to(el, {
        duration: 0.75,
        ease: Expo.easeInOut,
        y: 0,
        onComplete: done
      })
    },

    leave(el, done) {
      gsap.to(el, {
        duration: 0.75,
        ease: Expo.easeInOut,
        y: '-100%',
        onComplete: done
      })
    },

    menuBeforeEnter(el) {
      gsap.set(el, {
        opacity: 0
      })
    },

    menuEnter(el, done) {
      gsap.to(el, {
        duration: 0.5,
        delay: 0.5,
        ease: Expo.easeInOut,
        opacity: 1,
        onComplete: done
      })
    },

    acBeforeEnter(el) {
      gsap.set(el, {
        height: 0,
        opacity: 0
      })
    },

    acEnter(el, done) {
      gsap.to(el, {
        duration: 0.5,
        ease: Expo.easeInOut,
        height: 'auto',
        opacity: 1,
        onComplete: done
      })
    },

    acLeave(el, done) {
      gsap.to(el, {
        duration: 0.5,
        ease: Expo.easeInOut,
        height: 0,
        opacity: 0,
        onComplete: done
      })
    }
  },

  watch: {
    $route(to, from) {
      this.$store.commit('CLOSE_SHOP_MENU')
    }
  }
}
</script>

<static-query>
query {
  # Sanity
  headerSettings: allSanityHeaderSettings {
    edges {
      node {
        blockTitle1
        blockMenu1 {
          label
          url
        }
        blockTitle2
        blockMenu2 {
          label
          url
        }
        blockTitle3
        blockMenu3 {
          label
          url
        }
        image {
          alt
          asset {
            id
            url
          }
          enabled
          text
          link {
            label
            url
          }
        }
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
// Using BEM + Tailwind @apply
@import '@/assets/scss/shop-menu.scss';
</style>
