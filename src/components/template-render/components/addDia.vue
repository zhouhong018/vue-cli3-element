<template>
  <div class="list-add-dia">
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      :title="title[type] || noTitle[type]"
      :width="dialogWidth"
      :before-close="handleClose"
      class="modal-dialog-form temp-dia"
    >
      <el-form :model="data" ref="form" :rules="rules" :class="formClazz" class="clearfix" style="overflow: hidden">
        <el-form-item
          v-for="i in items"
          v-if="!i.addHide"
          :key="i.key"
          :label="i.label"
          :prop="i.key"
          :class="itemClazz(i)"
          :label-width="diaLabelWidth"
        >
          <item-render
            :item="i"
            :data="data"
            :selectType="'enable'"
            :ref="'_item_' + i.key"
            :addDiaType="type"
            @eventHandle="eventHandle"
            @selectRelated="setRelateSelect"
          ></item-render>
        </el-form-item>
      </el-form>
      <slot name="dialog-middle"></slot>
      <div slot="footer" class="f0" v-show="btnShow">
        <el-button
          type="primary"
          @click="submit"
          size="large"
          v-html="'确定'"
          :disabled="saveDisabled"
        ></el-button>
        <el-button type="default" @click="cancel" size="large" v-html="'取消'"></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<!--
	!!!!!! ************* 【注意】 ************ !!!!!!
	addDia 不适合 单独使用, 只能依附于 list-render 
-->

<script type="text/javascript">
import ItemRender from "./itemRender.vue";
import { setTimeout } from "timers";

export default {
  props: {
    cols: {
      type: Array
    },
    rules: {
      type: Object,
      default: ""
    },
    title: {
      type: Object
    },
    api: {
      type: Object,
      default: ""
    },
    navId: {
      type: String
    },
    symbol: {
      // 用于区分 详情页中 当前是哪个list
      type: String
    }
  },

  data() {
    return {
      data: {},
      noTitle: {
        add: '新增',
        edit: '编辑'
      },
      visible: !1,
      items: this.cols,
      type: "add",
      orignalData: null,
      dataIntercept: null, // 拦截数据提交
      additionalData: null, // 需要添加到调用接口中的额外数据
      saveDisabled: false,
      btnShow: true,
      multipleSeperator: "," // 新增多列的默认, 传到后端的 默认分隔符
    };
  },
  computed: {
    levels() {
      let step = 7;
      let len = 0;

      this.items.forEach(i => {
        !i._roleHide && len++;
      });

      let level = parseInt(len / step);
      return level > 2 ? 2 : level;
    },

    formClazz() {
      return "level" + this.levels;
    },

    dialogWidth() {
      let min = 500;
      return this.levels * 300 + min + "px";
    }
  },
  methods: {
    submit() {
      let data = this.addChange(this.cols, this.data);
      this.$refs.form.validate(valid => {
        if (valid) {
          let type = this.type === "edit" ? "$merge" : "$add";

          let fn = this.$root.temporaryMount["convertAddData"];
          fn &&
            typeof fn === "function" &&
            (data = fn(data, this.symbol, this.type));

          let api = this.api[type];
          this.$route.params.id && (data.id = this.$route.params.id);
          if (api) {
            this.saveDisabled = true;
            type === '$add' && this.HCXHR.post(api, data).then(res => {
            	this.saveDisabled = false;
            	if (res.code === 'success') {
            		this.$message.success('新增成功');
            		this.cancel();
            		this.$emit('success', res, this.symbol, this.type);
            	} else {
            		this.$emit('error', res);
            	}
            });
            type === '$merge' && this.HCXHR.put(`${api}/${data._id}`, data).then(res => {
            	this.saveDisabled = false;
            	if (res.code === 'success') {
            		this.$message.success('修改成功');
            		this.cancel();
            		this.$emit('success', res, this.symbol, this.type);
            	} else {
            		this.$emit('error', res);
            	}
            });
          } else {
            this.$message(`请配置 ${type} api`);
          }
        }
      });
    },

    resetData() {
      let form = this.$refs.form;
      this.$nextTick(() => {
        Object.assign(this.data, this.orignalData);
      });
    },

    /**
     * 点击取消
     * @return {[type]} [description]
     */
    cancel() {
      this.visible = false;
      this.resetData();
    },

    /**
     * 点击关闭按钮
     * @param  {Function} done [description]
     * @return {[type]}        [description]
     */
    handleClose(done) {
      done();
      this.resetData();
    },

    /**
     * 显示 dialog, 有 'edit' 'add' 两种模式
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    show(data) {
      this.visible = true;
      this.type = "edit";

      if (!data) {
        this.type = "add";
        data = {};
        // 设置默认值
        this.items.forEach(i => {
          i.value !== undefined && (data[i.key] = i.value);
        });
      }

      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });

      this.data = data;
      this.orignalData = Object.assign({}, data);
    },

    /**
     * 关联 下拉框, 数据返回后，设置的数据
     * @param {[type]} arr [description]
     * @param {[type]} ref [description]
     */
    setRelateSelect(arr, ref, init) {
      let dom = this.$refs["_item_" + ref][0];
      if (!init) {
        this.$set(this.data, ref, null);
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
      dom.source = arr;
    },

    /**
     * item事件接受
     * @return {[type]} [description]
     */
    eventHandle() {
      let fn = this.$root.temporaryMount["addDiaEventHandle"];
      fn && typeof fn === "function" && fn(...arguments, this.symbol);
      this.$emit("addDiaEventHandle", ...arguments);
    },

    /**
     * 样式
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    itemClazz(item) {
      let clazz = "add_item_" + item.key;
      item.max && (clazz += " " + item.max);

      return clazz;
    },

    addChange(cols, data) {
      cols.forEach(item => {
        item.type === "date" &&
          (data[item.key] = new Date(data[item.key]).getTime());
      });
      return data;
    }
  },

  components: {
    ItemRender
  }
};
</script>
<style lang="scss">
.level0 {
  > .el-form-item {
    width: 100%;
    padding-left: 0;
  }
}
.level1 {
  > .el-form-item:nth-child(even) {
    width: calc(50% + 12px);
    padding-left: 24px;
  }
  > .el-form-item:nth-child(odd) {
    width: calc(50% - 12px);
  }
  > .max {
    width: 100%;
  }
}
.level2 {
  > .el-form-item {
    width: calc(33.3% + 8px);
    padding-left: 24px;
    &:nth-child(3n + 1) {
      width: calc(33.3% - 16px);
      padding-left: 0;
    }
  }
}

.list-add-dia {
  .el-upload-list {
    display: inline-block;
    vertical-align: bottom;
    max-width: 250px;

    > .el-upload-list__item:first-child {
      margin-top: 0;
    }
  }

  .item-container {
    .el-select .el-input .el-input__inner {
      height: 30px !important;
    }
  }
}

.en {
  .list-add-dia {
    .el-upload-list {
      max-width: 220px;
    }
  }
}

.temp-dia {
  .el-form-item {
    float: left;
  }
}
</style>