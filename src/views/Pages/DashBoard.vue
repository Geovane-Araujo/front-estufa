<template>
  <div class="dashboard">
    <div class="tabletop">
      <Button style="margin-left:13px;margin-top:10px; " label="Iniciar Monitoramento" @click="sendMessage"/>
      <Button style="margin-left:10px" label="Parar Monito" @click="closeSessionConnection"/>
    </div>
    <div class="mno">
      <div v-for="co in controladores.obj" :key="co.fase" class="monitores">
        <monitor-estufa :title="co.fase" :ref="co.ref"/>
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
  },
  components: {
    Button
  },
  methods: {
    ...mapActions('sock', ['ActionRefresh']),
    sendMessage () {
      sock.connection.send('Me Retorne')
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
    closeSessionConnection () {
      sock.connection.close()
      sock.connection = null
    },
    serverConnector () {
      if (sock.connection === null) {
        sock.connection = new WebSocket('ws://localhost:8083/controladores')

        sock.connection.onopen = (event) => {
        }
        this.btn = 'Iniciar Monitor'
        sock.connection.onmessage = (event) => {
          this.controladores = []
          this.controladores = JSON.parse(event.data)
          this.btn = 'Iniciar Monitor'
        }
      } else {
        this.closeSessionConnection()
        this.serverConnector()
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
