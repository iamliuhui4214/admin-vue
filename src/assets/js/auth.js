
/**
 * 自定义业务函数模块
 * auth.js
 * 封装和用户授权相关函数
 */

const userInfoKey = 'user-info'

// 保存用户信息到本地储存
export function saveUserInfo (userInfo = {}, window) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

// 从本地储存中获取用户信息
export function getUserInfo (window) {
  return window.localStorage.getItem(userInfoKey)
}

// 获取本地储存中用户信息的token令牌
export function getToken () {
  return JSON.parse(getUserInfo(window)).token
}

// 删除本地储存中用户信息
export function removeUserInfo (window) {
  window.localStorage.removeItem(userInfoKey)
}
