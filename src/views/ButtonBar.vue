<template>
  <div>
    <transition :name="transitionName">
      <router-view class="router-view"></router-view>
    </transition>
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler"
      class="button-bar">
    </cube-tab-bar>
    <span class="goods-count">{{ goodsCount }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      transitionName: 'slide-right',
      selectedLabelDefault: '首页',
      tabs: [{
        label: '首页',
        icon: 'cubeic-home',
        routeName: 'Home'
      }, {
        label: '分类',
        icon: 'cubeic-tag',
        routeName: 'List'
      }, {
        label: '搜索',
        icon: 'cubeic-search',
        routeName: 'Search'
      }, {
        label: '购物车',
        icon: 'cubeic-mall',
        routeName: 'Cart'
      }, {
        label: '我的',
        icon: 'cubeic-person',
        routeName: 'Mine'
      }]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      const tab = this.tabs.find((item) => {
        return item.label == label
      })
      this.$router.replace({name: tab.routeName})
    }
  },
  computed: {
    ...mapGetters([
      'goodsCount'
    ])
  },
  created() {
    const routePath = this.$route.path
    switch(routePath) {
      case '/bar/index': 
        this.selectedLabelDefault = '首页'
        break
      case '/bar/list': 
        this.selectedLabelDefault = '分类'
        break
      case '/bar/search': 
        this.selectedLabelDefault = '搜索'
        break
      case '/bar/cart': 
        this.selectedLabelDefault = '购物车'
        break
      case '/bar/mine': 
        this.selectedLabelDefault = '我的'
        break
    }
  }
}
</script>

<style lang="stylus">
  .cube-tab-bar.button-bar
    position fixed
    bottom 0
    left 0
    z-index 1000
    width 100%
    background #ffffff
    .cube-tab div
      font-size 16px
      padding-top 3px
    i
      font-size 20px
  .router-view
    position absolute
    width 100%
    transition all 0.8s ease
  .slide-left-enter, .slide-right-leave-active
    opacity 0
    -webkit-transform translate(100%,0)
    transform translate(100%,0)
  .slide-left-leave-active, .slide-right-enter
    opacity 0
    -webkit-transform translate(-100%, 0)
    transform translate(-100%, 0)
  .goods-count
    position fixed
    float left 
    bottom 33px
    right 23%
    width 18px
    height 18px
    z-index 1001
    line-height 18px
    font-size 14px
    border-radius 50%
    background red
    color #ffffff
</style>