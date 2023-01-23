<template>
  <div id="app" >
    <to-do-app></to-do-app>
  </div>
</template>

<script>
import ToDoApp from './components/ToDoApp.vue'

export default {
  name: 'App',
  components: {
    ToDoApp
  }
}
</script>

<style>
body{
  background-color: rgb(230, 230, 230);
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
