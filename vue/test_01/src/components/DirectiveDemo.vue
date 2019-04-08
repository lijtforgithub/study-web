<template>
  <div>
    <h2 v-once>{{ title }}</h2>
    <input v-model="directive" v-focus />
  </div>
</template>

<script>
export default {
  name: "DirectiveDemo",
  data () {
    return {
      title: '自定义指令',
      directive: '进入页面获得焦点'
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus();
      }
    }
  }
};
</script>

<style scoped>
</style>