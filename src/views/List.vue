<template>
  <div id="list">
    <cube-scroll class="left-panels">
      <ul>
        <li 
          v-for="(tab, index) in tabsLabel" 
          :key="index" 
          @click="selectList(index)"
          :class="tab.active ? 'active' : ''">
          {{ tab.label }}
        </li>
      </ul>
    </cube-scroll>
    <cube-scroll class="right-panels">
      <ul>
        <li 
          v-for="(item, index) in items" 
          :key="index" >
          <img :src="item.image">
          <p>{{ item.label }} <i class="cubeic-add" @click="addToCart($event, item.label)"></i></p>
        </li>
      </ul>
    </cube-scroll>
    <div class="ball-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball" v-if="ball.show">
          <div class="inner">
            <i class="cubeic-add"></i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ball: {
        show: false,
        el: ''
      },
      tabsLabel: [
        {
          label: '热门推荐',
          active: true
        },
        {
          label: '手机数码',
          active: false
        },
        {
          label: '居家电器',
          active: false
        },
        {
          label: '电脑硬件',
          active: false
        },
        {
          label: '生活用品',
          active: false
        },
        {
          label: '休闲零食',
          active: false
        },
        {
          label: '服饰',
          active: false
        },
        {
          label: '其他',
          active: false
        },
        {
          label: '其他',
          active: false
        },
        {
          label: '其他',
          active: false
        },
        {
          label: '其他',
          active: false
        },
        {
          label: '其他',
          active: false
        },
        {
          label: '其他',
          active: false
        },
        {
          label: '其他',
          active: false
        },
        {
          label: '其他',
          active: false
        },
      ],
      items: []
    }
  },
  methods: {
    selectList(index) {
      this.tabsLabel.forEach((tab, ind) => {
        if (index == ind) {
          tab.active = true
          this.getItems(index)
        } else {
          tab.active = false
        }
      })
    },
    async getItems(index) {
      this.items = []
      const items = await this.$http.get('/api/classify', {params: {type: index}})
      this.items = items.data
    },
    addToCart(e, label) {
      this.$store.commit('addToCart', label)
      this.ball.show = true
      this.ball.el = e.target
    },
    // 添加动画
    beforeEnter(el) {
      // 将小球移动到点击的位置
      const dom = this.ball.el
      const rect = dom.getBoundingClientRect()
      const x = rect.left - window.innerWidth * 0.7
      const y = rect.top - window.innerHeight
      el.style.display = 'block'
      el.style.transform = `translate3d(0,${y}px, 0)`
      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(${x}px, 0, 0)`
    },
    enter(el, done) {
      // 触发重绘
      document.body.offsetHeight
      // 运动回原点
      el.style.transform=`translate3d(0,0,0)`
      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(0,0,0)`
      // 监听动画完成事件
      el.addEventListener('transitionend', done)
    },
    afterEnter(el) {
      this.ball.show = false
      el.style.display = 'none'
    }
  },
  created() {
    this.getItems(0)
  },
  mounted() {
    // 设置滚动盒子高度
    const leftPanels = document.querySelector('.left-panels')
    const rightPanels = document.querySelector('.right-panels')
    const bodyHeight = document.documentElement.clientHeight
    leftPanels.style.height = bodyHeight - 71 + 'px'
    rightPanels.style.height = bodyHeight - 71 + 'px'
  }
}
</script>

<style lang="stylus" scoped>
  #list
    display flex
    .left-panels
      width 30%
      li
        height 50px
        line-height 50px
        border-bottom 1px solid #ffffff
        color #333
        background #f8f8f8
        font-size 14px
      .active
        background #ffffff
        color #e93b3d
    .right-panels
      width 70%
      ul
        display flex
        flex-wrap wrap
        li
          width 50%
          justify-content center
          align-items center
          font-size 15px
          margin 5px 0
          img 
            width 80px
            height 80px
    .ball-wrap
      .ball
        position fixed
        left 70%
        bottom 10px
        z-index 1003
        color red
        transition all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          transition all 1s linear 
</style>