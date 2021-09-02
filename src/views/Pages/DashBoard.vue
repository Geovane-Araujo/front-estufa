<template>
  <div class="dash">
    <div class="tabletop">
      <Button :label="btn" @click="sendMessage"/>
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
      this.connection.send('Me Retorne')
      this.connection.onmessage = (event) => {
        var arRefs = this.$refs
        var a = event.data.split('?')
        var i = 0
        Object.keys(arRefs).forEach(index => {
          this.$refs[index][0].onResize(a[i])
          i++
        })
      }
    },
    atualiza (message) {
      this.retorno.push(message)
    }
  },
  created () {
    this.connection = new WebSocket('ws://localhost:8083/controladores')

    this.connection.onopen = (event) => {
    }

    this.connection.onmessage = (event) => {
      this.controladores = []
      this.controladores = JSON.parse(event.data)
      this.btn = 'Iniciar Monitor'
    }
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
.tabletop{
  margin-top:10px;
}
.content-card{
  height: 100px;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
}
.dash{
  height: 100%;
  width: 100%;
}
.mno{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.monitores{
  height: 48%;
  width: 48%;
  margin: 1%;
  background-color: #2C3E50;
  -webkit-box-shadow: 8px 9px 10px -2px rgba(0,0,0,0.29);
  box-shadow: 8px 9px 10px -2px rgba(0,0,0,0.29);
  border-radius: 10px;
}
</style>
