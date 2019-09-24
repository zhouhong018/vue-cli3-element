<style lang="scss" scoped>
.item-container {
  display: inline-block;

  > div {
    width: 100%;
  }

  > .el-date-editor {
    max-width: 100%;
  }
}
/* .table-search {
		>.searchBox:first-child {
			>.item-container {
				width: calc(100% - 80px);
			}
		}
	} */
.el-form-item__content {
  > .item-container {
    width: 100%;
  }
}
.color-2288EE {
  color: #2288ee;
}
.f12 {
  font-size: 12px;
}
.cursor_pointer {
  cursor: pointer;
}
.position_realtive {
  position: relative;
}
.position_text {
  position: absolute;
  top: 2px;
  z-index: 100;
  right: 8px;
  font-size: 12px;
}
.position_icon {
  position: absolute;
  top: 1px;
  z-index: 100;
  right: 4px;
}
</style>

<template>
  <div class="item-container position_realtive">
    <!-- [*************** 根据使用频率进行排序 ***************] -->

    <!-- 文本输入框 -->
    <el-input
      v-if="!item.type || item.type === 'input'"
      v-model.trim="data[item.key]"
      :maxlength="item.maxLength || 120"
      :placeholder="'请输入'"
      :disabled="item.disabled"
    >
      <template v-if="item.endtext" slot="append">{{item.endtext}}</template>
    </el-input>

    <!-- 下拉框 -->
    <el-select
      v-else-if="item.type === 'select'"
      v-model="data[item.key]"
      :disabled="item.disabled"
      :multiple="item.multiple || false"
      :size="item.multiple ? 'medium' : null"
      :filterable="item.filterable || true"
      :clearable="item.clearable === undefined ? true : false"
      :placeholder="'请选择'"
    >
      <!-- 分为 element option 和 原始 option, 为了解决下拉数据太多 卡顿 -->
      <el-option
        v-for="(s, index) in source"
        :key="s.value + '_' + index"
        v-show="!s.disabled"
        :label="s.label"
        :value="s.value"
      ></el-option>
    </el-select>

    <!-- 日期 选择器 -->
    <el-date-picker
      v-else-if="item.type === 'date'"
      v-model="data[item.key]"
      :disabled="item.disabled"
      type="date"
      :format="item.format || 'yyyy/MM/dd'"
      :placeholder="'请选择日期'"
      :picker-options="item.pickerOptions"
    ></el-date-picker>

    <!-- 日期（范围） 选择器 -->
    <el-date-picker
      v-else-if="item.type === 'daterange'"
      v-model="data[item.key]"
      type="daterange"
      format="yyyy/MM/dd"
      :start-placeholder="'请选择开始日期'"
      :end-placeholder="'请选择结束日期'"
    ></el-date-picker>
  </div>
</template>

<script type="text/javascript">
import CONS from "@/data/source";

export default {
  props: {
    item: {
      type: Object
    },
    data: {
      type: Object
    },
    dataLoaded: {
      type: Boolean
    },
    selectType: {
      // 下拉框 中包含 启用和禁用，all: 所有、enable: 表示禁用
      type: String,
      default: "enable"
    },
    globalDisabled: {
      // 布尔值不加default，会变成false, 其他类型不会, 目前只有search用这个参数
      type: Boolean,
      default: undefined
    },
    relateInputEnable: {
      // 带 sourceAttrs 参数的select，改变时是否要更新对应的值
      type: Boolean,
      default: true
    },
    addDiaType: {
      // dialog 弹出框的类型
      type: String
    }
  },
  data() {
    return {
      source: []
    };
  },

  watch: {},
  created() {
    this.getSource();
  },
  methods: {
    getSource() {
      let s = this.item.source;
      this.$nextTick(() => {
        this.source = CONS[s];
      });
    }
  },

  mounted() {},

  components: {}
};
</script>