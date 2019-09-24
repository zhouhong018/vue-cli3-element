import Vue from 'vue'
import i18n from '../i18n/i18n'
import './element-variables.scss'

// 按需引入

// import { Button } from 'element-ui'
// Vue.use(Button)

// 全局引入

import ElementUI from 'element-ui'
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value) // 重点！！在注册Element时设置i18n的处理方法（这里有个小坑）
})