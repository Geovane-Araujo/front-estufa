<template>
  <div>
    <div class="content-card">
      <card v-show="false" styless="colorcard" :total="totalgeral" description="Total Empresas"/>
      <card v-show="false" styless="colorcard2" :total="totalativas" description="Total Empresas Ativas"/>
      <card v-show="false" styless="colorcard3" :total="totalinativas" description="Total Empresas Inativas"/>
    </div>
    <div class="tabletop">
      ssdd
    </div>
  </div>
</template>

<script>
/* import axios from 'axios'
import http from '../../router/http' */
export default {
  data () {
    return {
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
    this.getCards()
  },
  methods: {
    getCards () {
      /* axios.post(http.url + 'empresas', this.form).then(res => {
        if (res.data.ret === 'success') {
          this.totalgeral = res.data.obj.totalempresas.toLocaleString('pt-BR')
          this.totalativas = res.data.obj.totalativas.toLocaleString('pt-BR')
          this.totalinativas = res.data.obj.totalinativas.toLocaleString('pt-BR')
        }
      }).catch(err => {
        console.log(err)
      }) */
    }
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
