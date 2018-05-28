import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
})

// 1添加路由拦截器（导航钩子，路由守卫）
// 所有视图导航都必须经过这道关卡
// 一旦进入这道关卡，你得告诉路由守卫
// to  我要去哪里
// from  我从哪里来
// next  用于放行
router.beforeEach((to, from, next) => {
  // 2拿到当前请求路由路径标识
  // 2.1是登录组件就放行
  // 2.2如果是非登录组件则检测token令牌
  //  有令牌就过去，无令牌就让其登录
  if (to.name === 'login') {
    next()
  } else {
    // 检查登录状态令牌
    const token = window.localStorage.getItem('admin-token')
    if (!token) {
      // 无令牌这让其登录
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})

export default router
