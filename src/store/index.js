import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token: '',
    cartarr: JSON.parse(localStorage.getItem('cartarr')) || [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    addToCart(state, label) {
      const good = state.cartarr.find(item => item.title == label)
      if(good) {
        good.goodCount++
      } else {
        state.cartarr.push({title: label, goodCount: 1})
      }
    },
    goodCountIncrement (state, index) {
      state.cartarr[index].goodCount++
    },
    goodCountDecrement (state, index) {
      const goodCount = state.cartarr[index].goodCount
      if (goodCount <= 1) {
        if (window.confirm('是否要移除该商品？')) {
          state.cartarr.splice(index, 1)
        }
      } else {
        state.cartarr[index].goodCount--        
      }
    },
    clearCartarr(state) {
      state.cartarr = []
    }
  },
  getters: {
    goodsCount: state => {
      let sum = 0
      state.cartarr.forEach(item => {
        sum += item.goodCount
      })
      return sum
    }
  },
  actions: {
  },
  modules: {
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('cartarr', JSON.stringify(state.cartarr))
})

export default store