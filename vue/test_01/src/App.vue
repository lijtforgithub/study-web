<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <SlotDemo>父级插槽内容 <strong>{{ scope }}</strong></SlotDemo>
    
    <SlotDemo><template v-slot:header><h4>具名插槽原有写法</h4></template></SlotDemo>
    <SlotDemo><header>具命插槽的新的写法</header></SlotDemo>

    <SlotDemo>
      <template scope="son">{{son.msg}}</template>
    </SlotDemo> -->

    <DirectiveDemo></DirectiveDemo>
    <FilterDemo></FilterDemo>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import SlotDemo from './components/SlotDemo'
import DirectiveDemo from './components/DirectiveDemo'
import FilterDemo from './components/FilterDemo'

export default {
  name: 'App',
  components: {
    HelloWorld,
    SlotDemo,
    DirectiveDemo,
    FilterDemo
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

