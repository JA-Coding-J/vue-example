<template>
  <div id="home">
    <cube-slide ref="slide" :data="items" @change="changePage">
      <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
        <a :href="item.url">
          <img :src="item.image" class="banner">
        </a>
      </cube-slide-item>
    </cube-slide>
    <cube-slide ref="slidelist" :data="lists" :auto-play="false">
      <cube-slide-item v-for="(list, index) in lists" :key="index" @click.native="clickHandler(item, index)">
        <ul class="slidelist-ul">
          <li v-for="(item, index) in list" :key="index" class="slidelist-li">
            <a :href="item.url">
              <img :src="item.image">
              <p>{{ item.label }}</p>
            </a>
          </li>
        </ul>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data() {
    return {
      items: [],
      lists: []
    }
  },
  methods: {
    changePage(current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler(e, item, index) {
      e.preventDefault()
      console.log(item, index)
    }
  },
  async created() {
    try {
      const items = await this.$http.get('/api/banner')
      this.items = items.data
      const lists = await this.$http.get('/api/rollinglist')
      this.lists = lists.data
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="stylus" scoped>
  #home
    a
      img.banner
        display block
        width 100%
        height 150
    .slidelist-ul
      display flex
      flex-wrap wrap
      .slidelist-li
        width 20%
        justify-content flex-start
        img 
          width 35px
          height 35px
          border-radius 50%
          padding 5px
        p
          font-size 14px
          padding-bottom 10px
</style>
