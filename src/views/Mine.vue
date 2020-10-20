<template>
  <div id="mine">
    <ul>
      <li v-for="item in mineArra" :key="item.label" @click="itemClick(item)" class="mine-item">
        <span class="mine-title">{{ item.label }}</span>
        <i class="cubeic-arrow"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mineArra: [
        {label: '商品收藏'},
        {label: '我的足迹'},
        {label: '店铺收藏'},
        {label: '我的订单'},
        {label: '退出', type: 'exit'},
      ]
    }
  },
  methods: {
    itemClick(item) {
      if (item.type && item.type == 'exit') {
        this.$store.commit('setToken', '')
        localStorage.removeItem('token')
        this.$router.push({path:'/login'})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mine-item
    font-size 14px
    text-align left 
    height 50px
    line-height 50px
    padding-left 5%
    border-bottom 1px solid #eeeeee
    .mine-title
      display inline-block
      width 90%
</style>>
