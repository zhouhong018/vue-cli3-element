<style lang='scss'>
.form-box {
  font-size: 0;
  .el-form-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    float: left;
    width: calc(33.3% + 8px);
    padding-left: 24px;
    vertical-align: top;
    min-height: 31px;
    &:nth-child(3n + 1) {
      padding-left: 0;
      width: calc(33.3% - 16px);
    }
    &[span="2"] {
      width: calc(66.6% + 16px);
    }
    &[span="3"] {
      width: 99.9%;
    }

    > .el-form-item__label {
      font-size: 12px;
      line-height: 14px;
    }

    > .el-form-item__content {
      margin-left: 0 !important;
      width: calc(100% - 112px);
    }
  }
  /* el-select 会 watch disabled, 然后 resetInputHeight */
  .item-container {
    .el-select .el-input .el-input__inner {
      height: 30px !important;
    }
  }
  &:after {
    content: "";
    clear: both;
    display: block;
  }
}
.en .form-box {
  .el-form-item {
    > .el-form-item__label {
      width: 120px !important;
      word-break: keep-all;
    }

    > .el-form-item__content {
      width: calc(100% - 120px);
    }
  }
}
.table-container{ 
  margin-top: 16px !important;
}
.form-btns {
  margin-bottom: 16px;
  text-align: right;
  font-size: 0; /* 为了去掉 btn 之间的空隙 */
  height: 30px; /* 一般来说都有按钮 如果没有按钮 就会出问题 */

  > button {
    margin-left: 8px;
  }
}
.el-tab-pane {
  > button {
    position: relative;
    float: right;
    margin-left: 8px;
    margin-bottom: 8px;
  }
}
.stupid_search + .small-btns {
  /* 这是有用的 用于tabs中的搜索 */
  margin-top: -24px;
  float: right; // 样式遮盖处理
}
.sub-form {
  > .sub-form-title {
    height: 45px;
    padding-top: 15px;
    box-sizing: border-box;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    line-height: 18px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;

    > i {
      font-size: 12px;
    }
  }

  > .sub-form-content {
    overflow: hidden;
    position: relative;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: height 0.6s;
  }
}
.seperator {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}
.l14 {
  > label {
    line-height: 14px;
  }
}
</style>
	<!-- 此页面可用于新增、编辑、详情展示 -->
	<!-- 	页面结构 	-->
	<!-- 		1、操作按钮 -->
	<!--		2、表单区 -->
	<!--		3、tab pane 列表区 -->
<template>
  <div>
    <!-- 操作按钮 -->
    <div class="form-btns clearfix" v-if="hasBtn">
      <buttons :btns="btnMeta" @click="fnInvoker"></buttons>
    </div>

    <!-- 表单区 -->
    <template>
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="112px"
        class="form-box"
      >
        <template v-for="item in listMeta">
          <el-form-item
            :key="item.key"
            :label="item.label"
            :prop="item.key"
            :span="item.span || 1"
            :class="labelClass(item)"
          >
            <item-render :item="item" :data="formData" :ref="'_item_' + item.key"></item-render>
          </el-form-item>
        </template>
      </el-form>
    </template>

    <!-- tab pane 列表区 -->
    <el-tabs v-if="tabShow" type="card" ref="tab" v-model="tabValue">
      <el-tab-pane v-for="(item, index) in tabsMeta" v-if="tabVisible(item, index)" :key="item.key" :label="item.label">
        <template>
          <list-render
            :ref="'_tab_' + item.key"
            :config="item"
            :opeWidth="item.opeWidth"
            :hasSearch="false"
            :navId="item.navId"
          ></list-render>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import ItemRender from "../components/itemRender.vue";
import Buttons from "../components/buttons.vue";
import ConfigParser from "../configParser";
import mixin from "../mixin";

export default {
  name: "template-detail",

  props: {
    config: {
      type: Object // 生成内容的配置信息
    }
  },

  data() {
    return {
      type: "", // type 类型有: detail/edit/add, 值取自路由, 所有请遵守路由命名规则
      btnMeta: {}, // 按钮数据
      formData: {}, // 表单数据
      subData: {}, // 子表单数据
      listData: {}, // 列表数据
      tabsMeta: [],
      hasBtn: true,
      rules: {},
      listMeta: [],
      dataLoaded: false,
      tabShow: true, // 为了路由改变 tabs 不请求接口
      tabValue: null, // tab 标签页的值, 默认第一个可见
      nextPrev: null
    };
  },

  computed: {},

  mixins: [mixin],

  methods: {
    getRules() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      return this.type !== "detail" ? this.config._rules : {};
    },
    /**
     * 获取列表详情
     * @return {[type]} [description]
     */
    getDetail() {
      if (this.type !== "add") {
        this.HCXHR.get(`${this.config.api.$detail}?id=${this.$route.params.id}`).then((res) => {
          if (res.code === 'success') {
            this.formData = res.data;
            this.$parent.formData = this.formData;
          }
        });
      }
    },
    save() {
      this.HCXHR.put(`${this.config.api.$save}/${this.formData._id}`, this.formData).then(res => {
        if (res.code === 'success') {
          this.$message.success('保存成功');
          this.$router.back();
        }
      });
    },
    back() {
      this.$router.back();
    },
    /**
     * 跳转编辑页面
     * @return {[type]} [description]
     */
    toEdit() {
      if (this.type === "detail") {
        this.$router.push(this.$route.path.replace(/\/detail\//, "/edit/"));
      } else {
        this.$message("不能跳转到编辑页面");
      }
    },

    /**
     * 给 form_item class 加上标识
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    labelClass(item) {
      let clazz = "form_item_" + item.key;

      return clazz;
    },
    init() {
      let cols = this.config.cols;
      let btns = this.config.btns;
      let tabs = this.config.tabs;
      this.btnMeta = this.btnsMeta(Object.assign({}, btns));
      cols.forEach(i => {
        this.listMeta.push(i);
      });
      this.tabsMeta = tabs;
    },
    getType() {
      let type = this.$route.path.match(/detail|edit|add/);
      this.type = type[0];
    },
    checkDisabled() {
      this.getType();
      this.type === "detail" &&
        this.listMeta.forEach(i => {
          this.$set(i, "disabled", true);
        });
      this.type !== "detail" &&
        this.listMeta.forEach(i => {
          i.editDisabled
            ? this.$set(i, "disabled", true)
            : this.$set(i, "disabled", false);
        });
      this.config.edit && this.config.edit.form && this.config.edit.form.disabled.forEach((i) => {
        this.$set(this.listMeta[i], "disabled", true);
      }); 
    },
    tabVisible(item, index) {
      let flag = true;

      if (item.detailShow && item.detailShow.indexOf(this.type) === -1) {
        flag = false; 
      }
      return flag;
    },
    reloadTabs() {
      this.tabsMeta.forEach((item) => {
        let list = this.$refs['_tab_' + item.key];
        list && list[0] && list[0]['getList']();
      });
    }
  },

  inject: ["mainReload"],

  watch: {
    '$route'() {
      this.hasBtn = false;
      this.$nextTick(() => {
        this.hasBtn = true;
      }); 
      this.checkDisabled();
      this.rules = this.getRules();
      this.getDetail();
      this.reloadTabs();
    }
  },

  created() {
    this.getType();
    new ConfigParser(this);
    this.init();
    this.getDetail();
  },

  mounted() {
    this.checkDisabled();
    this.rules = this.getRules();
  },

  components: {
    ItemRender,
    Buttons
  }
};
</script>