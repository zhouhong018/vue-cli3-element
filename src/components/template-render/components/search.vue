<template>
  <div :class="'normal_search'">
    <div class="search table-search">
      <div v-for="i in searchMeta" class="searchBox" :key="i.key" v-if="i.search">
        <label v-text="i.label"></label>
        <item-render
          :ref="'_item_' + i.key"
          :class="'_item_' + i.key"
          :item="i"
          :data="searchModel"
          :selectType="'all'"
          :globalDisabled="false"
          :relateInputEnable="false"
        ></item-render>
      </div>
      <div class="searchBtns" :class="searchBtnsClass()">
        <el-button type="primary" @click="doSearch" v-html="'搜索'"></el-button>
        <el-button type="default" @click="resetSearch" v-html="'重置'"></el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import ItemRender from "../components/itemRender.vue";

export default {
  props: {
    searchMeta: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      searchModel: {} // 搜索数据
    };
  },

  computed: {},

  methods: {
    // 搜索按钮位置 class
    searchBtnsClass() {
      let clazz = "";
      let len = this.searchMeta.length;

      if (len > 2) {
        if (len % 3 === 0) {
          clazz += "searchBtns1";
        } else {
          clazz += "searchBtns2";
        }
      }
      return clazz;
    },

    // 重置
    resetSearch() {
      let emptyObj = {};

      // 下拉多选 需要设置为空数组, 不然会报错
      this.searchMeta.forEach(i => {
        if (i.type === "select" && i.multiple) {
          emptyObj[i.key] = [];
        }
      });

      this.searchModel = emptyObj;
      this.$emit("resetSearch", this.searchModel);
    },

    // 搜索
    doSearch() {
      this.$store.commit('setParam', {page: 1});
      // 需要将 pagination param.page 设置为 1
      this.$emit('resetPage');

      // 清掉空的 search
      for (let i in this.searchModel) {
        if (this.searchModel[i] === "") {
          delete this.searchModel[i];
        }
      }

      this.$emit("doSearch", this.searchModel);
    }
  },

  created() {},

  mounted() {},

  components: {
    ItemRender
  }
};
</script>
<style lang="scss" scoped>
.searchBox {
  display: inline-block;
  width: calc(33.3% + 8px);
  margin-bottom: 16px;
  > label:first-child {
    display: inline-block;
    padding-right: 12px;
    padding-left: 24px;
    /* line-height: 40px; */
    width: 96px;
    text-align: right;
    vertical-align: middle;
    font-size: 12px;
  }

  input {
    font-size: 12px;
  }
}
.searchBtns {
  display: inline-block;
  padding-left: 24px;
  font-size: 14px;
  box-sizing: border-box;
  vertical-align: middle;
  > button:first-child {
    margin-right: -4px;
  }
}
.searchBtns1 {
  width: 100%;
  margin-bottom: 16px;
  text-align: right;
}
.searchBtns2 {
  float: right;
}
.table-search {
  padding: 0;
}

.table-search {
  .item-container {
    vertical-align: middle;
    width: calc(100% - 132px);
  }

  > .searchBox:nth-child(3n + 1) {
    width: calc(33.3% - 16px);
    > label:first-child {
      padding-left: 0;
    }
    > .item-container {
      width: calc(100% - 108px);
    }
  }
}

.en .table-search {
  > .searchBox {
    > label {
      width: 108px !important;
      word-break: keep-all;
    }
    > .item-container {
      width: calc(100% - 144px);
    }
  }

  > .searchBox:nth-child(3n + 1) {
    > .item-container {
      width: calc(100% - 120px);
    }
  }
}
</style>

<style lang="scss">
.stupid-search {
  position: relative;
  width: 220px;
  > .el-input {
    width: 100%;
    > input {
      height: 24px;
      line-height: 24px;
      padding-right: 40px;
    }
  }
  > .stupid-search-icon {
    position: absolute;
    right: 1px;
    top: 1px;
    padding: 2px 7px;
    cursor: pointer;
    background-color: whitesmoke;
    color: #ccc;
  }
}
</style>