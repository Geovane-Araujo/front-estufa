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
            name: 'Canteiros / Bancadas',
            icon: 'estufa-setor',
            route: 'Setores'
          },
          {
            name: 'Nutrientes',
            icon: 'estufa-fertilizante',
            route: 'Nutrientes'
          },
          {
            name: 'Estagios',
            icon: 'estufa-fases',
            route: 'FasesCrecimento'
          },
          {
            name: 'Controladores',
            icon: 'estufa-sensor',
            route: 'Controladores'
          },
          {
            name: 'Estufas',
            icon: 'estufa-estufa',
            route: 'Estufas'
          },
          {
            name: 'Usuarios',
            icon: 'estufa-user',
            route: 'Usuarios'
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
