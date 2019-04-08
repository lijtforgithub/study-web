<template>
  <div>
    <h2 v-once>{{ title }}</h2>
    {{message | capitalize}}
    <input :id="id | capitalize" v-model="val" />
  </div>
</template>

<script>
  export default {
    name: "FilterDemo",
    data () {
      return {
        title: '过滤器',
        message: "john",
        id: 'hello',
        val: 'world'
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  }
</script>

<style scoped>

</style>