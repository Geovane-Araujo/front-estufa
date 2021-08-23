<template>
  <div class="nutrientes">
    <loading v-model="isLoading" loader="spinner" color="#000" :can-cancel="true" :is-full-page="true"/>
    <div style="margin-bottom: 20px">
      <h3>Cadastro de Nutrientes</h3>
    </div>
    <div class="grid">
      <datatabe-estufa :onGetById="onGetById" :columns="fields" ref="datagrid"/>
    </div>
    <div>
      <Dialog :style="{width: '20vw'}" header="Cadastro Nutrientes" :visible.sync="showModal" :modal="true">
        <div class="p-fluid row">
          <div class="p-field col-sm-12">
              <label for="win_planta_nome">Descricao</label>
              <InputText v-model="form.descricao" id="win_planta_nome" type="text" />
          </div>
        </div>
        <template #footer>
          <Button label="Salvar" />
          <Button label="Calcelar" autofocus/>
      </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  data () {
    return {
      isLoading: false,
      showModal: false,
      dynamic: {
        route: 'mnu_nutrientes',
        pagging: 1,
        filters: '',
        orders: ' id desc'
      },
      fields: [
        {
          length: 5,
          field: 'id',
          header: 'ID'
        },
        {
          length: 95,
          field: 'descricao',
          header: 'Descricao'
        }
      ],
      form: {
        add: true,
        edit: false,
        dele: false,
        id: '',
        descricao: ''
      }
    }
  },
  components: {
    Dialog,
    InputText,
    Button,
    loading: VueLoading
  },
  mounted () {
    this.$refs.datagrid.getAll(this.dynamic)
  },
  methods: {
    onGetById (id) {
      this.showModal = true
    },
    onSave () {

    }
  }
}
</script>

<style lang="scss" scoped>
.plantas{
  height: 100%;
}
</style>
