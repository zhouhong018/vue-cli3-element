<template>
  <div id="app">
    <router-view v-if="isAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isAlive: true
    };
  },
  methods: {
    reload() {
      this.isAlive = false;
      this.$nextTick(() => {
        this.isAlive = true;
      });
    }
  },
  mounted() {

  },
  watch: {
    $route: function(to) {
      document.title = "vue3.0 - " + to.meta.title;
    }
  }
};
</script>
<style lang="scss">
#nprogress .bar {
  background: red !important; //自定义颜色
}
</style>