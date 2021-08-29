<template>
  <div>
    <div class="content-card">
      <card v-show="false" styless="colorcard" :total="totalgeral" description="Total Empresas"/>
      <card v-show="false" styless="colorcard2" :total="totalativas" description="Total Empresas Ativas"/>
      <card v-show="false" styless="colorcard3" :total="totalinativas" description="Total Empresas Inativas"/>
    </div>
    <div class="tabletop">
      <Button label="Teste" @click="sendMessage"/>
      <div v-for="ret in statussensor.medidas" :key="ret">{{ ret }}</div>
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
      form: {
        cnae: '',
        cnpj: '',
        uf: '',
        cidade: '',
        ativa: 0
      },
      totalgeral: 0,
      totalativas: 0,
      totalinativas: 0
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
      this.connection.send('Teste')
      this.connection.onmessage = (event) => {
        this.ActionRefresh(event.data)
      }
    },
    atualiza (message) {
      this.retorno.push(message)
    }
  },
  created () {
    this.connection = new WebSocket('ws://localhost:8083/controladores')

    this.connection.onopen = function (event) {
      console.log(event.data)
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
</style>
