# vue3.0 demo 
vue element i18n axios

## Project setup
yarn install

### Compiles and hot-reloads for development
yarn run serve

### Compiles and minifies for production
yarn run build

### src目录结构
#src
#    ├─assets
#    │  ├─style            ----全局样式
#    │  └─images
#    ├─components
#    │  ├─bread-crumb      ----面包屑组件
#    │  ├─lang-select      ----切换语言组件
#    │  ├─left-nav         ----左侧导航栏组件
#    │  ├─template-render  ----自定义组件******************************
#    │  │  ├─components    ----自定义小组件
#    │  │  └─pages         ----自定义页面（列表页、详情页）
#    │  └─top-nav          ----头部导航栏组件
#    ├─data                ----select数据
#    ├─mixins              ----全局方法
#    ├─plugins             ----插件
#    │  ├─ajax             ----axios封装
#    │  ├─element-ui       ----element配置
#    │  ├─i18n             ----多语言配置
#    │  │  └─langs         ----翻译内容
#    │  ├─popConfirm       ----确认弹框
#    │  └─regex            ----自定义校验规则
#    ├─views               ----页面
#    │   ├─login           ----登录页面
#    │   ├─main            ----登录页面
#    │   ├─one             
#    │   │  ├─meau1
#    │   │  │  ├─config    ----menu1-1页面参数配置文件 *****************
#    │   │  │  └─pages     ----menu1-1页面(列表、详情) *****************
#    │   │  └─meau2       
#    │   └─two             
#    ├─App         
#    ├─main
#    ├─router
#    └─store
