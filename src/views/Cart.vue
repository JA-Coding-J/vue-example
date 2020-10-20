<template>
  <div id="cart">
    <div v-for="(item, index) in cartarr" :key="index" class="cart-item">
      {{ item.title }}
      <div class="cart-item-count">
        <i class="cubeic-remove" @click="decrement(index)"></i>
        {{ item.goodCount }}
        <i class="cubeic-add" @click="increment(index)"></i>
      </div>
    </div>
    <cube-button style="margin: 10px 0">下单</cube-button>
    <cube-button @click="clearCart">清空购物车</cube-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'cartarr'
  ]),
  methods: {
    increment(index) {
      this.$store.commit('goodCountIncrement', index)
    },
    decrement(index) {
      this.$store.commit('goodCountDecrement', index)
    },
    clearCart() {
      this.$store.commit('clearCartarr')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cart-item
    padding 10px
    text-align left 
    font-size 18px
    .cart-item-count
      float right
    i 
      font-size 18px
</style>>