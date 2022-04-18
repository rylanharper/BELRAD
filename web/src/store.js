import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default function State(Vue, { isClient }) {
  Vue.use(Vuex)

  const store = new Vuex.Store({
    state: {
      cart: [],
      token: {},
      shopMenu: false,
      cartModal: false
    },

    mutations: {
      UPDATE_CART: (state, cart) => {
        state.cart = cart
      },
      SET_TOKEN: (state, token) => {
        state.token = token
      },
      TOGGLE_SHOP_MENU: state => {
        state.shopMenu = !state.shopMenu
      },
      CLOSE_SHOP_MENU: state => {
        state.shopMenu = false
      },
      TOGGLE_CART_MODAL: state => {
        state.cartModal = !state.cartModal
      },
      CLOSE_CART_MODAL: state => {
        state.cartModal = false
      }
    },

    actions: {
      addToCart: ({ state, commit }, newItem) => {
        const cart = state.cart
        const itemExists = cart.find(item => item.variantId === newItem.variantId)

        if (itemExists) itemExists.qty += newItem.qty
        else cart.push(newItem)

        const updatedCart = cart.map(item => {
          const total = item.price * item.qty
          return { ...item, total }
        })

        commit('UPDATE_CART', updatedCart)
      },
      updateItemQty: ({ state, commit }, { itemId, qty }) => {
        const cart = state.cart
        const item = cart.find(item => item.variantId === itemId)

        item.qty = qty
        item.total = item.price * item.qty

        commit('UPDATE_CART', cart)
      },
      removeFromCart: ({ state, commit }, itemId) => {
        const cart = state.cart
        const updatedCart = cart.filter(item => item.variantId !== itemId)

        commit('UPDATE_CART', updatedCart)
      },
      login: ({ commit }, token) => {
        commit('SET_TOKEN', token)
      },
      logout: ({ commit }) => {
        commit('SET_TOKEN', {})
      }
    },

    getters: {
      cart: ({ cart }) => cart,
      isAuthenticated: ({ token }) => !!token.accessToken,
      accessToken: ({ token }) => token.accessToken,
      cartTotal: ({ cart }) => {
        let total = 0
        cart.forEach(item => {
          total += item.price * item.qty
        })
        return total
      },
      cartTotalItems: ({ cart }) => cart.reduce((total, item) => (total += item.qty), 0)
    }
  })

  if (isClient) {
    createPersistedState({
      key: 'belrad_storefront',
      paths: ['cart', 'token']
    })(store)
  }

  return store
}
