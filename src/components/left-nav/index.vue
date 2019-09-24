<template>
  <div class="left-nav-container">
    <el-menu
      style="border:0;"
      class="custom-el-menu-vertical dark-theme"
      :default-active="defaultLeftActive"
      :router="true"
      :unique-opened="true"
      :collapse="!defaultCollapse"
      :show-timeout="10000"
    >
      <!-- <li class="nav-block">&nbsp;</li> -->
      <div class="switch-left-nav-icon" @click="switchLeftNav">
        <i
          :class="{'el-icon-s-fold': !defaultCollapse,
                'el-icon-s-unfold': defaultCollapse }"
        ></i>
      </div>

      <template v-for="item in leftNavData" v-if="visble">
        <!--普通导航-->
        <el-submenu :index="item.index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="item.index1" @click="clickHandle()">{{item.title1}}</el-menu-item>
          <el-menu-item :index="item.index2">{{item.title2}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultCollapse: true, // 默认展开
      fromPath: "",
      toPath: "",
      visble: true,
      prePath: "" // 上一次点击的 路径
    };
  },
  components: {},
  props: {
    leftNavData: {
      type: [Object, Array],
      default: () => {}
    },
    defaultLeftActive: {
      type: String,
      default: () => ""
    }
  },
  methods: {
    // 左侧导航卡关
    switchLeftNav() {
      this.defaultCollapse = !this.defaultCollapse;
    },
    clickHandle() {

    }
  },
  watch: {
    $route(to, from) {
      this.visble = false;
      this.$nextTick(() => {
        this.visble = true;
      });
      this.$store.state.templateRender && this.$store.commit('resetParam');
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss">
@import "../../assets/style/variables.scss";
.el-aside {
  box-shadow: inset -1px 0 0 0 $hc-black-80 !important;
}
.el-menu-icon {
  font-size: 16px;
  width: 100%;
  margin-right: 0;
}
.switch-left-nav-icon {
  height: 40px;
  line-height: 40px;
  padding-right: 8px;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  white-space: nowrap;
  box-shadow: inset 0 -1px 0 0 $hc-black-80;
  text-align: right;
  .icon {
    font-size: 16px;
  }
}
.left-nav-container {
  .el-menu {
    &.dark-theme {
      .el-menu-item {
        min-width: 200px;
        color: rgba(0, 0, 0, 0.75);
        i {
          &.el-menu-icon {
            color: #515152;
          }
        }
        &.el-menu-custom-level-2 {
          &.el-menu-item {
            padding-left: 56px !important;
          }
          &.el-submenu > .el-submenu__title {
            padding-left: 56px !important;
          }
        }
        &.el-menu-custom-level-3 {
          padding-left: 72px !important;
        }
        /*&.el-menu-custom-level-3 {*/
        /*padding-left: 58px !important;*/
        /*}*/
        &.is-active {
          background-color: $hc-active-color !important;
          i {
            &.el-menu-icon {
              color: #fff !important;
            }
          }
          &:hover {
            background-color: $hc-active-color !important;
            color: #fff !important;
            i {
              color: #fff !important;
            }
          }
        }
        &:hover {
          color: $hc-active-color !important;
          i {
            color: $hc-active-color !important;
          }
        }
      }
      .el-submenu {
        .el-submenu__title {
          background-color: #fff !important;
          color: $hc-black-75;
          &.is-active,
          &:hover {
            background: #fff !important;
            color: $hc-black-75 !important;
            i {
              color: $hc-black-75 !important;
            }
          }
        }
        &.el-menu-custom-level-2 {
          .el-submenu__title {
            padding-left: 56px !important;
          }
        }
        &.is-opened {
          .el-submenu__title {
            background-color: #fff !important;
            color: $hc-black-75;
            &.is-active,
            &:hover {
              background: #fff !important;
              color: $hc-black-75 !important;
            }
          }
          .el-menu {
            &.el-menu--inline {
              .el-menu-item {
                background-color: #fff !important;
                &.is-active {
                  background-color: $hc-active-color !important;
                  color: #fff !important;
                  &:hover {
                    background-color: $hc-active-color !important;
                    color: #fff !important;
                  }
                }
                &:hover {
                  color: $hc-active-color !important;
                }
              }
            }
          }
        }
      }
      /**折叠*/
      &.el-menu--collapse {
        width: 40px;
        .switch-left-nav-icon {
          text-align: center;
          padding: 0;
        }
        .el-tooltip {
          padding: 0 !important;
        }
        .el-submenu {
          & > .el-submenu__title {
            padding-left: 12px !important;
          }
          &.is-active,
          &:hover {
            & > .el-submenu__title {
              background-color: $hc-active-color !important;
              i {
                color: #fff !important;
              }
            }
          }
        }
        .el-menu-item {
          &.is-active,
          &:hover {
            background-color: $hc-active-color !important;
            i {
              color: #fff !important;
            }
            .el-tooltip {
              background-color: $hc-active-color !important;
            }
          }
        }
      }
    }
  }
}
</style>