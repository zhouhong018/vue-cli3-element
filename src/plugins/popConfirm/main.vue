<style lang="scss" scoped>
.table-action-popover {
  .btns {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
  }
  .cont {
    .icon {
      float: left;
      margin-right: 8px;
      position: relative;
      top: 1px;
      line-height: normal;
    }
    .span {
      display: inline-block;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.75);
      line-height: 18px;
    }
  }
}
</style>

<template>
  <el-popover
    ref="popo"
    :placement="placement"
    :reference="ref"
    v-model="visible"
    popper-class="table-action-popover"
    @hide="handlerPopHide"
  >
    <div>
      <div class="cont clearfix">
        <i class="iconfont icon-tishi-s font-c-warning icon"></i>
        <span class="span f_left" v-html="message"></span>
      </div>
      <div class="btns">
        <el-button
          type="primary"
          size="small"
          @click="handlerConfirm"
          v-html="getLocale('Confirm')"
        ></el-button>
        <el-button size="small" @click="handlerReject" v-html="getLocale('Cancel')"></el-button>
      </div>
    </div>
  </el-popover>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      ref: null,
      visible: false,
      message: "",
      placement: "bottom",
      callback: null,
      langConf: {
        Confirm: "确定",
        Cancel: "取消"
      }
    };
  },

  methods: {
    getLocale(text) {
      if (localStorage.getItem("language") === "cn") {
        text = this.langConf[text];
      }
      // wordSpace
      return text;
    },

    setRef(ref) {
      this.ref = ref;
    },

    handlerConfirm() {
      this.visible = false;
      if (this.confirmed) {
        this.confirmed();
      }
    },

    handlerReject() {
      this.visible = false;
      if (this.reject) {
        this.reject();
      }
    },

    handlerPopHide() {
      if (this.canceled) {
        this.canceled();
      }
    }
  }
};
</script>