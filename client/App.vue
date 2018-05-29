<template>
  <div id="app">
    <!-- hello world
     <input type="text" v-model="msg"> -->
     <search></search>
  </div>
</template>

<script>
import Search from './src/component/Search.vue'
console.log(Search)
export default {
  name: 'App',
  components:[Search]
}
</script>

<style>
</style>
