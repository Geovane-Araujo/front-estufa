<template>
  <div class="home">
    <sidebar :sidebar="menu"/>
  </div>
</template>

<script>
import Sidebar from '../components/SideBar/Sidebar.vue'
export default {
  name: 'Home',
  data () {
    return {
      menu: {
        items: [
          {
            name: 'Visão Analítica',
            icon: 'dash',
            route: 'DashBoard'
          },
          {
            name: 'Plantas',
            icon: 'estufa-planta',
            route: 'Plantas'
          },
          {
            name: 'Nutrientes',
            icon: 'estufa-fertilizante',
            route: 'Nutrientes'
          },
          {
            name: 'Sensores',
            icon: 'estufa-sensor',
            route: 'Detalhes'
          },
          {
            name: 'Usuarios',
            icon: 'dash',
            route: 'Detalhes'
          }
        ]
      }
    }
  },
  components: {
    Sidebar
  }
}
</script>
