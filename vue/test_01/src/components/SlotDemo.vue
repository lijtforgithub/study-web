<template>
  <div>
    <h1 v-once>{{ title }}</h1>
    <slot>插槽默认内容</slot>
    <slot name="header"></slot>
    <slot name="footer" :msg="message"></slot>
  </div>
</template>

<script>
export default {
  name: 'SlotDemo',
  data () {
    return {
      title: '插槽',
      message: '子组件的内容'
    }
  }
}
</script>

<style scoped>
</style>