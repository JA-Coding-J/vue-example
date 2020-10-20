import axios from 'axios'
import store from './store'
import router from './router'

/**
 * axios 封装
 * http 请求拦截，相对拦截，错误统一处理
 * 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
 */

export default function setAxios() {
  // 请求拦截
  axios.interceptors.request.use(
    config => {
      if (store.state.token) {
        config.headers.token = store.state.token
      }
      return config
    }
  )

  // 响应拦截器
  axios.interceptors.response.use(
    response => {
      if (response.status == 200) {
        const data = response.data
        console.log(data.code);
        if (data.code == -1) {
          // 登陆过期，需要重新登录，清空 vuex 和 localStorage 的 token
          store.commit('setToken', '')
          localStorage.removeItem('token')
          // 跳转到 login 页面
          router.replace({path: '/login'})
        }
        return response.data
      }
    }
  )
}
