<template>
  <div class="btns">
    <el-button
      v-for="btn in btns"
      v-if="btn._visible"
      v-show="!btn.dynamicHide"
      :ref="btn.click"
      :type="btnDefault || btn.default ? 'default' : 'primary'"
      :key="btn.click"
      :disabled="btn.dynamicDisabled"
      :class="btn.class"
      @click="$emit('click', btn.click, $event)"
      v-html="btn.label"
    ></el-button>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    btns: {
      type: Object
    },
    detailType: {
      type: String
    },
    btnDefault: {
      // 所有按钮都是 default 白色
      type: Boolean,
      default: false
    }
  },

  data() {
    return {};
  },

  watch: {
    '$route'() {

    }
  },

  methods: {
    setBtnVisible() {
				for (let i in this.btns) {
					let btn = this.btns[i];
					let flag = true;
          let type = this.$route.path.match(/detail|edit|add/);
          if (btn.detailShow) {
            flag = btn.detailShow.indexOf(type[0]) === -1 ? !1 : !0;
          }

					btn._visible = flag;
				}
			},
  },

  created() {
    this.setBtnVisible();
  }
};
</script>
<style lang="scss" scoped>
.btns {
  /* 不能用 inline-block 不然没有 按钮时，会有一条空白 */
  /* 必须使用 inline 不然 按钮会不在一起 */
  display: inline;
  > button:first-child {
    margin-left: 8px;
  }
}
</style>