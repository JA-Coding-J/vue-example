<template>
  <div>
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler"></cube-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {
        username: '',
        password: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              placeholder: 'please input your username'
            },
            rules: {
              required: true,
              min: 3,
              max: 15
            },
            messages: {
              required: 'username can not being empty!',
              min: 'username\'s length can not less than 3 word',
              max: 'username\'s length can not more than 15 word'
            },
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              type: 'password',
              placeholder: 'please input your password',
              eye: {
                open: false
              }
            },
            rules: {
              required: true,
              min: 3,
              max: 15
            },
            messages: {
              required: 'password can not being empty!',
              min: 'password\'s length can not less than 3 word',
              max: 'password\'s length can not more than 15 word'
            },
            trigger: 'blur'
          },
          {
            type: 'submit',
            label: '登录'
          }
        ]
      }
    }
  },
  methods: {
    async submitHandler (e) {
      e.preventDefault()
      try {
        const result = await this.$http.get('/api/login', {params: this.model})
        if (result.code == 0) {
          this.$store.commit('setToken', result.token)
          window.localStorage.setItem('token', result.token)

          // 路由是否包含网址参数，若有登陆后直接跳转到该地址
          if(this.$route.query.redirect) {
            this.$router.replace({path: this.$route.query.redirect})
          } else {
            this.$router.replace({path: '/bar/index'})
          }
        } else {
          alert(`${result.message}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>