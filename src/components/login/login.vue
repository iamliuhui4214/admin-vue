<template>
<div>
  <p>登录组件</p>
  <form @submit.prevent="login">
    <div>
      <label for="username">用户名</label>
      <input
       type="text"
       id="username"
       v-model="userForm.username">
    </div>
    <div>
      <label for="password">密码</label>
      <input
      type="password"
      id="password"
      v-model="userForm.password">
    </div>
    <div>
      <button>登录</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // 1. 采集表单数据
      // 2. 表单验证
      // 3. 发请求执行登陆操作
      // 4. 根据响应做交互
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      const data = res.data
      if (data.meta.status === 200) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style>

</style>
