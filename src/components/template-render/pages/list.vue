<template>
  <div class="template-list">
    <!-- 搜索区域 -->
    <search
      v-if="hasSearch"
      ref="search"
      :searchMeta="searchMeta"
      @resetPage="$refs.pagination.param.page = 1"
      @doSearch="handleSearch"
      @resetSearch="resetSearch"
    ></search>

    <!-- 按钮区域 -->
    <div class="ml8_ small-btns" v-if="btnMeta && Object.keys(btnMeta).length && hasBtn">
      <!-- TODO 添加按钮 下载按钮 上传按钮 同步按钮 -->
      <buttons ref="btns" :btns="btnMeta" @click="fnInvoker"></buttons>
    </div>

    <!-- 列表区域 -->
    <el-table
      :data="listModel"
      class="table-container"
      border
      ref="table"
      :stripe="true"
      highlight-current-row
      v-loading="loading"
    >
      <el-table-column
        v-for="i in listMeta"
        v-if="!i.dynamicHide"
        :key="i.key"
        :prop="i.key"
        :label="i.label"
        :width="i.width"
        :min-width="i.minWidth || '80'"
        :show-overflow-tooltip="true"
        :fixed="i.fixed"
      >
        <template slot-scope="scope">
          <span>{{getRealVal(scope.row[i.key], i, scope.$index, scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="opeW" v-if="showOpe()">
        <template slot-scope="scope">
          <el-button
            v-for="item in operatesMeta"
            v-show="btnVisable(item)"
            :key="item.label"
            v-text="item.label"
            type="text"
            class="table-action-btn"
            :title="item.hoverTitle || ''"
            :disabled="item.dynamicDisabled && scope.row.__dynamicDisabled"
            @click="fnInvoker(item.click, scope.row, $event, scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页区域 -->
    <pagination
      v-show="showPagination"
      ref="pagination"
      :info="pageInfo"
      :store="isList ? $store.state.templateRender.param : null"
      @sizeChange="handlePageChanged"
      @pageChange="handlePageChanged"
    ></pagination>

    <!-- 添加dialog -->
    <add-dia
      :cols="addDiaMeta"
      :rules="config._rules"
      :title="diaTitle"
      ref="addDialog"
      :api="api"
      :navId="navId"
      :symbol="config.key"
      @success="addSuccess"
    ></add-dia>
  </div>
</template>
<script>
import qs from 'querystring';
import search from "../components/search";
import buttons from "../components/buttons";
import pagination from "../components/pagination";
import addDia from "../components/addDia.vue";
import ConfigParser from "../configParser";
import store from "../store";
import mixin from "../mixin";
export default {
  components: {
    search,
    buttons,
    pagination,
    addDia
  },
  mixins: [mixin],
  data() {
    return {
      hasBtn: true,
      showPagination: true,
      pageInfo: { total: null },
      loading: false,
      searchMeta: [],
      addDiaMeta: [],
      diaTitle: {},
      api: {},
      isList: !this.$route.path.match(/\/add|edit|detail/),
      listModel: [],
      listMeta: [],
      operatesMeta: {},
      btnMeta: {},
      store: this.$store.state.templateRender
    };
  },
  props: {
    config: {
      type: Object
    },
    opeWidth: {
      type: String,
      default: "120"
    },
    navId: {
      type: String,
      default: "id"
    },
    hasSearch: {
      type: Boolean,
      default: !0
    }
  },
  computed: {
    opeW() {
      return this.opeWidth ? this.opeWidth : '120';
    }
  },
  beforeCreate() {
    this.$store.registerModule('templateRender', store)
  },
  created() {
    this.init();
    new ConfigParser(this);
    setTimeout(() => {
      this.handleSearch();
    }, 50);
  },
  methods: {
    add() {
      this.$refs.addDialog.show();
    },
    edit(row) {
      this.$refs.addDialog.show(row);
    },
    handlePageChanged(param) {
      this.isList && this.$store.commit('setParam', param);
      this.getList();
    },
    handleSearch(v, i, c) {
      this.getList();
    },
    resetSearch() {
      this.getList();
    },
    getList() {
      let param = this.isList ? this.store.param : this.$refs.pagination ? this.$refs.pagination.param : {};
      if (this.isList) {
        let query = this.convertSearch(
          this.$refs.search.searchModel,
          this.searchMeta
        );
        this.config.api.$list && this.HCXHR.post(this.config.api.$list, Object.assign(query, param)).then((res) => {
          if (res.code === 'success') {
            this.listModel = res.data.docs;
            this.pageInfo.total = res.data.total;
            !res.data.total ? (this.showPagination = false) : (this.showPagination = true);
          }
        });
      } else {
        let id = this.$route.params.id;
        this.config.api.$list && this.HCXHR.post(`${this.config.api.$list}/${id}`, Object.assign({id: id}, param)).then((res) => {
          if (res.code === 'success') {
            this.listModel = res.data.docs;
            this.pageInfo.total = res.data.total;
            this.pageInfo.total = res.data.total;
            !res.data.total ? (this.showPagination = false) : (this.showPagination = true);
          }
        });
      }
      
    },
    init() {
      let cols = this.config.cols;
      let btns = this.config.btns;
      let opes = this.config.opes;
      cols.forEach(i => {
        this.searchMeta.push(i);
        let typeKey = Object.assign({}, i);
        i.type && i.type === "daterange" && (typeKey.type = "date");
        this.addDiaMeta.push(typeKey);
      });
      this.diaTitle = this.config.diaTitle || {};
      this.api = this.config.api;
      this.listMeta = this.listmeta(cols);
      this.btnMeta = this.btnsMeta(Object.assign({}, btns));
      this.operatesMeta = this.btnsMeta(Object.assign({}, opes));
    },
    showOpe() {
      let flag = false;
      let opes = this.config.opes || {};

      if (Object.keys(opes).length) {
        let type = this.$route.path.match(/detail|edit|add/);
        if (type) {
          for (let i in opes) {
            let cc = opes[i];
            if (!cc.detailShow || cc.detailShow.indexOf(type) > -1) {
              flag = true;
              break
            }  
          }
        } else {
          flag = true;
        }
      }

      return flag;
    },
    btnVisable(item) {
      let flag = true;
      let type = this.$route.path.match(/detail|edit|add/);
      type && item.detailShow !== undefined && (item.detailShow === type[0] ? flag = true : flag = false);
      return flag;
    },
    listmeta(cols) {
      return cols.filter(i => {
        return !i.listHide;
      });
    },
    remove(row) {
      this.HCXHR.delete(`${this.config.api.$delete}/${row._id}`, row).then((res) => {
        if (res.code === 'success') {
          if (this.isList) {
            let p = this.$store.state.templateRender.param;
            if (this.listModel.length === 1 && p.page > 1) {
              p.page--;
              this.$store.commit('resetParam', p);
            }
          } else {
            let p = this.$refs.pagination.param;
            if (this.listModel.length === 1 && p.page > 1) {
              p.page--;
            }
          }
          this.$message.success('删除成功')
          this.getList();
        }
      });
    },
    addSuccess() {
      this.getList();
    }
  },
  watch: {
    '$route'() {
      this.hasBtn = false;
      this.$nextTick(() => {
        this.hasBtn = true;
      }); 
    }
  },
};
</script>

<style lang="scss" scoped>
.right {
  text-align: right;
}
.col_click {
  cursor: pointer;
  color: #2288ee;
}
.ml8_ {
  margin-left: -8px;
}
</style>

<style lang="scss">
.el-table__row__hide {
  display: none;
}
</style>