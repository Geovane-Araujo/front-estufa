<template>
  <div class="setorestufa">
    <loading v-model="isLoading" loader="spinner" color="#000" :can-cancel="true" :is-full-page="true"/>
    <div style="margin-bottom: 20px">
      <h3>Canteiros / Bancadas</h3>
    </div>
    <div class="grid">
      <datatabe-estufa classname="estufa_setor" :onGetById="onGetById" :columns="fields" ref="datagrid"/>
    </div>
    <div>
      <Dialog :style="{width: '30vw'}" header="Cadastro Setores da Estufa" :visible.sync="showModal" :modal="true">
        <div class="p-fluid row">
          <div class="p-field col-sm-12">
              <label >Descricao</label>
              <InputText v-model="form.descricao" type="text" />
          </div>
          <div class="p-field col-sm-4">
              <label >Quantidade Talhoes</label>
              <InputText v-model="form.talhoes" type="text" />
          </div>
          <div class="p-field col-sm-4">
              <label >Ph</label>
              <InputText v-model="form.ph" type="text" />
          </div>
          <div class="p-field col-sm-4">
              <label >Condutividade</label>
              <InputText v-model="form.condutividade" type="text" />
          </div>
        </div>
        <template #footer>
          <Button label="Salvar" @click="onValidate"/>
          <Button label="Calcelar" @click="showModal=false" autofocus/>
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
import http from '../../router/http'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  data () {
    return {
      isLoading: false,
      showModal: false,
      dynamic: {
        route: 'menu_estufasetor',
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
        ph: 0,
        condutividade: 0,
        descricao: '',
        talhoes: 0,
        un: ''
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
    this.onGetDynamic()
  },
  methods: {
    onGetById (id) {
      axios.get(http.url + 'estufasetor/' + id).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
        } else {
          this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: res.data.motivo, life: 3000 })
        }
        this.showModal = true
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: err, life: 3000 })
      })
    },
    onSave (form) {
      axios.post(http.url + 'estufasetor', form).then(res => {
        if (res.data.ret === 'success') {
          this.$toast.add({ severity: 'success', summary: 'Estufa+', detail: 'Salvo com sucesso!!!', life: 3000 })
        } else {
          this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: res.data.motivo, life: 3000 })
        }
        this.showModal = false
        this.onGetDynamic()
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: err, life: 3000 })
      })
    },
    onValidate () {
      if (this.form.descricao === '') {
        this.$toast.add({ severity: 'warn', summary: 'Estufa+', detail: 'Descricao não pode ficar em branco', life: 3000 })
      } else {
        this.onSave(this.form)
      }
    },
    onGetDynamic () {
      this.isLoading = true
      this.$refs.datagrid.getAll(this.dynamic)
      // this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.setorestufa{
  height: 100%;
}
</style>
