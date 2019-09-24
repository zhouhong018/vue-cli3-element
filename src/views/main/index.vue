<!--【功能描述】: 页面结构-->
<template>
  <!--最外侧容器-->
  <div class="hc-container">
    <div class="top-nav-container">
      <top-nav></top-nav>
    </div>
    <div class="el-container">
      <left-nav
        class="el-aside"
        style="width:300px;"
        :defaultLeftActive="defaultLeftActive"
        :leftNavData="leftNavData"
      ></left-nav>
      <div class="el-main">
        <div class="board">
          <bread-crumb></bread-crumb>
          <div class="white-board">
            <router-view v-if="isAlive"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import topNav from "@/components/top-nav";
import breadCrumb from "@/components/bread-crumb";
import leftNav from "@/components/left-nav";

export default {
  name: "layout",
  components: {
    topNav,
    leftNav,
    breadCrumb
  },
  provide() {
    return {
      mainReload: this.mainReload
    };
  },
  data() {
    return {
      defaultLeftActive: this.$route.path,
      leftNavData: [],
      isAlive: true
    };
  },
  computed: {},
  created() {
    // this.defaultLeftActive = this.getDefaultActive();
    this.resquest();
  },
  watch: {
    $route(to, from) {
      this.resquest();
    }
  },
  beforeCreate() {
    // this.$store.registerModule('main', store);
  },
  methods: {
    mainReload() {
      this.isAlive = false;
      this.$nextTick(() => {
        this.isAlive = true;
      });
    },
    getDefaultActive() {
      const routeInfo = this.$route;

      const breadInfo = routeInfo.meta && (routeInfo.meta.breadcrumb || []);

      let activePath = "";

      if (breadInfo.length < 1) {
        activePath = routeInfo.path;
      } else {
        activePath = breadInfo[0].path;
      }
      return activePath;
    },
    resquest() {
      this.defaultLeftActive = this.getDefaultActive();
      let fnModule = this.$route.meta.navActiveIndex;
      let de = {
        menu1: [
          {
            index: "1",
            title: this.$t("route.menu1"),
            index1: "/main/one/oneinfo",
            title1: this.$t("route.menu1-1"),
            index2: "/main/one/onedetail",
            title2: this.$t("route.menu1-2")
          }
        ],
        menu2: [
          {
            index: "2",
            title: this.$t("route.menu2"),
            index1: "/main/two/twoinfo",
            title1: this.$t("route.menu2-1"),
            index2: "/main/two/twodetail",
            title2: this.$t("route.menu2-2")
          }
        ]
      };
      this.leftNavData = de[fnModule];
    }
  }
};
</script>

<style lang="scss" scoped>
.hc-container {
  width: 100%;
  // height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    padding: 0;
  }
  .el-aside {
    width: auto !important;
  }
}
.main {
  height: 100%;
  .top-nav-container {
  }
  .body-container {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    flex-direction: row;
    .left-nav-container {
      height: 100%;
    }
  }
}
</style>
<style lang="scss">
@import "../../assets/style/variables.scss";
.main {
  .el-menu-vertical-demo-custom {
    height: 100%;
  }
}

.el-aside {
  background: #fff;
}
.el-main {
  height: calc(-60px + 100vh);
  background: whitesmoke;
  padding-top: 11px;
  padding-bottom: 24px;
  /*.el-table thead th.is-leaf{*/
  /*border-top: none;*/
  /*border-bottom-width: 1px;*/
  /*}*/
}
.board {
  height: 100%;
}
.white-board {
  min-height: calc(100% - 47px);
  background: white;
  padding: 16px 24px 0 24px;
  border: 1px solid #ccc;
  margin-bottom: 24px;
}
</style>