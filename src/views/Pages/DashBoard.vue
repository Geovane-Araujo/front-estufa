<template>
  <div class="dashboard">
    <div class="tabletop">
      <div class="d-flex flex-row-reverse">
        <Button style="margin-right:10px;margin-top:10px; " v-show="monitor" label="Sair" @click="exit"/>
        <Button style="margin-right:13px;margin-top:10px;" class="p-button-danger" label="Parar Monitor" @click="closeSessionConnection"/>
        <Button style="margin-right:10px;margin-top:10px; " label="Iniciar Monitoramento" @click="sendMessage"/>
      </div>
    </div>
    <div class="mno">
      <div v-for="co in controladores.obj" :key="co.fase" class="monitores">
        <monitor-estufa :title="co.fase" :maxph="co.ph" :maxcond="co.condutividade" :ref="co.ref"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import { mapActions, mapState } from 'vuex'
import sock from '../../util/Util'
export default {
  data () {
    return {
      monitor: false,
      connection: null,
      retorno: null,
      btn: 'Conectar',
      form: {
        cnae: '',
        cnpj: '',
        uf: '',
        cidade: '',
        ativa: 0
      },
      controladores: []
    }
  },
  mounted () {
    if (this.$route.name === 'Monitor') {
      this.monitor = true
    }
  },
  components: {
    Button
  },
  methods: {
    ...mapActions('sock', ['ActionRefresh']),
    sendMessage () {
      sock.connection.send('332')
      sock.connection.onmessage = (event) => {
        var arRefs = this.$refs
        var a = event.data.split('?')
        var i = 0
        Object.keys(arRefs).forEach(index => {
          this.$refs[index][0].onResize(a[i])
          i++
        })
      }
    },
    exit () {
      this.$router.push('login')
    },
    closeSessionConnection () {
      sock.connection.close()
    },
    serverConnector () {
      sock.connection = new WebSocket('ws://192.168.2.166:8089/controladores')
      sock.connection.onopen = (event) => {
      }
      sock.connection.onmessage = (event) => {
        this.controladores = []
        console.log(event.data)
        this.controladores = JSON.parse(event.data)
        console.log(this.controladores)
      }
    }
  },
  created () {
    this.serverConnector()
  },
  watch: {
    $route (to, from) {
      console.log('Teste')
    },
    beforeRouteUpdate (to, from, next) {
      console.log('Teste')
    }
  },
  computed: {
    ...mapState('sock', ['statussensor'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
  background-color: #2C3E50;
}
.content-card{
  height: 100px;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
}
.mno{
  overflow: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.monitores{
  height: 48%;
  width: 48%;
  margin: 1%;
  background-color: #32485e;
  -webkit-box-shadow: 8px 9px 10px -2px rgba(0,0,0,0.29);
  box-shadow: 8px 9px 10px -2px rgba(0,0,0,0.29);
  border-radius: 10px;
}
</style>
