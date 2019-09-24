/**
* 面包屑组件
*/
<template>
  <el-breadcrumb class="bread-crumb">
    <template v-for="(item, index) in items">
      <el-breadcrumb-item
        v-if="index === itemsCount"
      >{{language === 'cn' ? item.title : item.enTitle}}</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-else
      >{{language === 'cn' ? item.title : item.enTitle}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style lang="scss">
.bread-crumb {
  padding-bottom: 11px;
  .el-breadcrumb__inner {
    padding: 0 4px;
  }
  > .el-breadcrumb__item:first-child {
    > .el-breadcrumb__inner {
      padding-left: 0;
    }
  }
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: rgba(0, 0, 0, 0.75);
      &.is-link {
        color: rgba(0, 0, 0, 0.45);
        &:hover {
          color: #2288ee;
        }
      }
    }
  }
  .el-breadcrumb__separator {
    margin: 0 3px 0 0;
  }
}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "breadcrumb",
  data() {
    return {
      /**
       * @member {Array} items item 集合
       */
      items: [],
      /**
       * @member {number} itemsCount item 集合的长度
       */
      itemsCount: 0,
      /**
       * @member {boolean} isAutomatic 是否为自动模式
       */
      isAutomatic: true
      // constants
    };
  },
  mounted() {
    this.$nextTick(() => this.generateItems());
  },
  watch: {
    /**
     * 监听 $route 属性
     * @method $route
     */
    $route() {
      this.generateItems();
    }
  },
  computed: {
    ...mapState({
      language: state => state.language
    })
  },
  methods: {
    /**
     * 生成面包屑 item 集合
     * @method generateItems
     */
    generateItems() {
      if (this.isAutomatic) {
        const { matched } = this.$route;
        if (matched.length > 0) {
          const {
            path,
            meta: { title, enTitle, breadcrumb = [] }
          } = matched[matched.length - 1];

          const parsedBreadcrumb =
            typeof breadcrumb === "function"
              ? breadcrumb.call(this)
              : breadcrumb;
          const tempList = [].concat(parsedBreadcrumb);
          tempList.push({ title, enTitle, path });
          this.items = tempList;
          this.itemsCount = this.items.length - 1;
        }
      }
    }
  }
};
</script>