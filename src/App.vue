<template>
  <div id="app">
    <router-view/>
    <Toast position="bottom-right"/>
  </div>
</template>
<script>
import Toast from 'primevue/toast'
export default {
  components: {
    Toast
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
html{
  font-size: 11px;
}
body{
  margin: 0px;
  ::-webkit-scrollbar-track {
      background-color: #F4F4F4;
  }
  ::-webkit-scrollbar {
      width: 6px;
      background: #F4F4F4;
  }
  ::-webkit-scrollbar-thumb {
      background: #dad7d7;
  }
}
#app {
  height: 100vh;
  width: 100vw;
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #2c3e50;
  color: aliceblue;
}
</style>
