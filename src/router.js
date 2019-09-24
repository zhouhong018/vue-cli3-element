import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [{
      path: '/',
      redirect: {
        path: '/login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/main',
      name: 'main',
      meta: {
        title: '主页'
      },
      component: () => import('./views/main'),
      children: [{
          path: 'one',
          name: 'one',
          meta: {
            title: 'one'
          },
          component: () => import('@/views/empty.vue'),
          children: [{
              path: 'oneinfo',
              name: 'oneinfo',
              meta: {
                title: '菜单1-1',
                enTitle: 'menu1-1',
                navActiveIndex: 'menu1'
              },
              component: () => import('@/views/one/meau1/pages/list.vue')
            },
            {
              path: 'oneinfo/detail/:id',
              name: 'oneinfo_detail',
              meta: {
                title: '菜单1-1详情',
                enTitle: 'menu1-1—detail',
                breadcrumb: [{
                  title: '菜单1-1',
                  enTitle: 'menu1-1',
                  path: '/main/one/oneinfo'
                }],
                navActiveIndex: 'menu1'
              },
              component: () => import('@/views/one/meau1/pages/detail.vue')
            },
            {
              path: 'oneinfo/edit/:id',
              name: 'oneinfo_edit',
              meta: {
                title: '菜单1-1编辑',
                enTitle: 'menu1-1—edit',
                breadcrumb: [{
                  title: '菜单1-1',
                  enTitle: 'menu1-1',
                  path: '/main/one/oneinfo'
                }],
                navActiveIndex: 'menu1'
              },
              component: () => import('@/views/one/meau1/pages/detail.vue')
            },
            {
              path: 'onedetail',
              name: 'onedetail',
              meta: {
                title: '菜单1-2',
                enTitle: 'menu1-2',
                navActiveIndex: 'menu1'
              },
              component: () => import('@/views/one/meau2/index.vue')
            }
          ]
        },
        {
          path: 'two',
          component: () => import('@/views/empty.vue'),
          children: [{
              path: 'twoinfo',
              name: 'twoinfo',
              meta: {
                title: '菜单2-1',
                enTitle: 'menu2-1',
                navActiveIndex: 'menu2'
              },
              component: () => import('@/views/two/twoinfo.vue')
            },
            {
              path: 'twodetail',
              name: 'twodetail',
              meta: {
                title: '菜单2-2',
                enTitle: 'menu2-2',
                navActiveIndex: 'menu2'
              },
              component: () => import('@/views/two/twodetail.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue'),
      meta: {
        title: '页面不存在',
        enTitle: 'Page does not exist'
      }
    },
    {
        path: '*',
        redirect: '/404'
    }
  ]
})