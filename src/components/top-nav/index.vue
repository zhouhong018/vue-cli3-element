<template>
  <div class="top-nav">
    <div class="logo" style="background: slategrey;font-size: 60px;">
      <i>logo</i>
    </div>
    <div class="nav">
      <el-menu class="el-menu-demo" mode="horizontal" @select="changeTopNav">
        <el-menu-item
          index="/main/one/oneinfo"
          :class="{'is-active': this.$route.path.indexOf('one') > 1}"
        >{{ $t('route.menu1') }}</el-menu-item>
        <el-menu-item
          index="/main/two/twoinfo"
          :class="{'is-active': this.$route.path.indexOf('two') > 1}"
        >{{ $t('route.menu2') }}</el-menu-item>
      </el-menu>
    </div>
    <div class="right-nav">
      <div data-v-c1773b54 class="avatar" style="display: flex;">
        <div @click="loginOut" style="margin-right: 15px;">{{$t('navbar.logOut')}}</div>
        <lang-select style="font-size: 20px;color: red;" class="set-language"/>
      </div>
    </div>
  </div>
</template>

<script>
import LangSelect from "@/components/lang-select";
export default {
  components: { LangSelect },
  name: "topNav",
  props: {
    // navActive: 'one'
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    changeTopNav(index) {
      this.$router.push({ path: index });
    },
    loginOut() {
      this.$popconfirm(event.target, this.$t("navbar.logOut") + "?")
        .then(() => {
          this.$router.push("/");
          this.$message({
            message: '退出登录成功',
            type: "success"
          });
        })
        .catch(() => {
          // console.log('cancle')
        });
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
@import "../../assets/style/variables.scss";
.top-nav {
  display: flex;
  width: 100%;
  height: 60px;
  color: #fff;
  font-size: 14px;
  // background-color: $hc-primary-color;
  .logo {
    height: 60px;
    /*font-size: 16px;*/
    line-height: 26px;
    text-align: center;
    .icon {
      font-size: 60px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (max-width: 1440px) {
    .logo {
      width: 220px;
    }
  }

  // 当显示器宽度大于1440时，纵向导航栏宽度为240px
  @media screen and (min-width: 1440px) {
    .logo {
      width: 240px;
      img {
        width: 190px;
      }
    }
  }

  .icon {
    color: $hc-white-85 !important;
    flex-direction: row;
    flex-shrink: 0;
    width: 48px;
    background: $hc-primary-color;
    text-align: center;
    line-height: 60px;
    font-size: 24px;
    cursor: pointer;
    transition: ease 0.3s;
    &:hover {
      // background: $--color-primary-light-4;
    }
    i {
      font-size: 24px;
    }
  }

  .nav {
    flex: 1;
  }
  .right-nav {
    color: $hc-white-85 !important;
    display: flex;
    padding-right: 17px;
    .avatar,
    .switch-lang {
      text-align: center;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 12px;
      position: relative;
      img {
        width: 36px;
        height: 36px;
        margin-top: 12px;
        vertical-align: top;
        display: inline-block;
        border-radius: 1000px;
        overflow: hidden;
      }
      .name {
        margin-left: 8px;
        font-size: 14px;
        color: $hc-white-85 !important;
      }
      &:hover .details {
        display: block;
        &.none {
          display: block;
        }
      }
      .details {
        display: none;
        min-width: 180px;
        margin: 0;
        padding: 11px 0;
        position: absolute;
        right: 0;
        top: 61px;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
        list-style: none;
        z-index: 99999;
        li {
          line-height: 42px;
          height: 42px;
          list-style: none;
          font-size: 14px;
          padding-left: 20px;
          padding-right: 20px;
          text-align: left;
          color: #000;
          &:last-child {
            margin-bottom: 0;
          }
          &:hover {
            /*background: #E9F0F7;*/
            color: #296ab4;
            /*font-weight: bold;*/
          }
        }
        &.none {
          display: none;
        }
      }
    }
    .switch-lang {
      padding-right: 8px;
    }
  }
}
</style>

<style lang="scss">
@import "../../assets/style/variables.scss";

.top-nav {
  box-sizing: border-box;
  background: $hc-primary-color;
  .nav {
    .el-menu.el-menu-demo.el-menu--horizontal {
      background: $hc-primary-color;
      border: 0;
      .el-menu-item {
        background: none;
        color: rgba(255, 255, 255, 0.85);
        border-bottom: solid 4px transparent;
      }
      .el-menu-item.is-active {
        font-weight: 700;
        color: #fff;
        letter-spacing: 0;
        border-bottom-color: #fff !important;
      }
      .el-menu-item:hover {
        color: #fff;
        letter-spacing: 0;
        border-bottom-color: #fff !important;
      }
    }
  }
}
</style>