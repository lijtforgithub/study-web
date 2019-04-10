<template>
  <div>
    <h2 v-once>{{ title }}</h2>
    <slot :msg="message">插槽默认内容</slot>
    <slot name="header"></slot>
  </div>
</template>

<script>
export default {
  name: 'SlotDemo',
  data () {
    return {
      title: '插槽',
      message: '子组件向父组件传递内容'
    }
  }
}
</script>

<style scoped>
</style>