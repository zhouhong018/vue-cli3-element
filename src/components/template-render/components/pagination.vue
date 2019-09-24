<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="param.page"
      :page-sizes="pageSizes"
      :page-size="param.size"
      background
      layout="total, sizes, prev, pager, next"
      :total="info.total"
    ></el-pagination>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    info: {
      type: Object
    },

    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 50, 100];
      }
    },

    store: {
      // 用于区分当前只是纯列表 还是 详情中的列表
      type: Object
    }
  },

  data() {
    return {
      // 列表分页信息从 store 中拿, 详情中列表不是
      param: this.store ? Object.assign({}, this.store) : { page: 1, size: 5 }
    };
  },

  methods: {
    handleSizeChange(val) {
      this.param.size = val;
      this.param.page = 1;
      this.$emit("sizeChange", { size: val, page: 1 });
    },

    handleCurrentChange(val) {
      this.param.page = val;
      this.$emit("pageChange", { size: this.param.size, page: val });
    }
  }
};
</script>