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
            label: '注册'
          }
        ]
      }
    }
  },
  methods: {
    submitHandler (e) {
      e.preventDefault()
      this.$http.get('/api/register', {params: this.model}).then(res => {
        console.log(res.data.message);
      }).catch(err => {
        console.log(err.data.message);
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>