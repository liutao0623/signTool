<template>
  <div id="app">
      <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  name: 'App',
  components:{
    Header:Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
