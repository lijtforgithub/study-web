<template>
  <div id="app">
    <img src="./assets/logo.png">
    <SlotDemo>父级插槽内容 <strong>{{ scope }}</strong></SlotDemo>
    <SlotDemo><template v-slot:header><h4>具名插槽原有写法</h4></template></SlotDemo>
    <SlotDemo><header>具命插槽的新的写法</header></SlotDemo>
    <SlotDemo><footer scope="sunObj"><h3 style="color:red;"> {{sunObj.msg}} </h3></footer></SlotDemo>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import SlotDemo from './components/SlotDemo'

export default {
  name: 'App',
  components: {
    HelloWorld,
    SlotDemo
  },
  data() {
    return {
      scope: '编译作用域'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

