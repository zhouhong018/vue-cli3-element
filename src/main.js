import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HCXHR from './plugins/ajax/ajax'
import i18n from './plugins/i18n/i18n'
import NProgress from 'nprogress'
import popconfirm from '@/plugins/popConfirm'
import regex from '@/plugins/regex'
// 全局mixins
import globalMixins from '@/mixins'
import 'nprogress/nprogress.css'
import './plugins/element-ui/element.js'
import './assets/style/index.scss'

Vue.use(regex)
Vue.mixin(globalMixins)

Vue.prototype.$popconfirm = popconfirm
// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({
  ease: 'ease',
  speed: 500
})

// 全局路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
  // if (to.path === `${base}login`) {
  // return next()
  // }

  // token验证，如果存储在sessionStorage里的auth的值丢失，就回到登陆页面，(开发时可以注释掉)
  // if (!sessionStorage.getItem('auth')) {
  //   return next(`${base}login`)
  // }

  // 如果页面在 /  默认页面，跳转到登陆页面(和vue路由重定向功能类似)
  // if (to.path === `${base}`) {
  //   return next(`${base}login`)
  // }
  // NProgress开始进度条
  NProgress.start()
  next()
})

// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
  // NProgress结束进度条
  NProgress.done()
})

Vue.prototype.HCXHR = HCXHR

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')