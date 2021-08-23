<template>
  <div>
    <loading v-model="isLoading" loader="spinner" color="#000" :can-cancel="true" :is-full-page="true"/>
    <Button label="Teste" @click="kk"/>
  </div>
</template>

<script>
import Button from 'primevue/button'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Button,
    loading: VueLoading
  },
  methods: {
    kk () {
      alert('hsddjhsjdh')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
