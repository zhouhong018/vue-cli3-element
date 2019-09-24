<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div style="cursor: pointer;font-size: 20px;">
      <i class="el-icon-refresh icon-font"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='cn'" command="cn">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  inject: ["reload"],
  computed: {
    language() {
      return this.$store.state.language;
    }
  },
  mounted() {
    this.$i18n.locale = this.language;
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
      this.$message({
        message: this.$t('login.Language'),
        type: "success"
      });
      this.reload();
    }
  }
};
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>