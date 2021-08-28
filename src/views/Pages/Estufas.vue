<template>
  <div class="estufas">
    <loading v-model="isLoading" loader="spinner" color="#000" :can-cancel="true" :is-full-page="true"/>
    <div style="margin-bottom: 20px">
      <h3>Estufas</h3>
    </div>
    <div class="grid">
      <datatabe-estufa classname="pessoa" :onGetById="onGetById" :columns="fields" ref="datagrid"/>
    </div>
    <div>
      <Dialog :style="{width: '60vw'}" header="Cadastro Estufas" :visible.sync="showModal" :modal="true">
        <div class="p-fluid row">
              <div class="p-field col-sm-12">
                  <label >Nome Estufa</label>
                  <InputText v-model="form.pessoa.nome" type="text" />
              </div>
              <div class="p-field col-sm-6">
                  <label >Proprietário</label>
                  <InputText v-model="form.proprietario" type="text" />
              </div>
              <div class="p-field col-sm-6">
                  <label >Responsável</label>
                  <InputText v-model="form.responsavel" type="text" />
              </div>
              <div class="p-field col-sm-2">
                  <label >Cep</label>
                  <InputMask mask="99999-999" v-model="form.pessoa.pessoaDados.cep" type="text" />
              </div>
              <div class="p-field col-sm-6">
                  <label >Endereco</label>
                  <InputText  v-model="form.pessoa.pessoaDados.endereco" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label >Numero</label>
                  <InputText v-model="form.pessoa.pessoaDados.numero" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label >Bairro</label>
                  <InputText v-model="form.pessoa.pessoaDados.bairro" type="text" />
              </div>
               <div class="p-field col-sm-3">
                  <label >Complemento</label>
                  <InputText  v-model="form.pessoa.pessoaDados.complemento" type="text" />
              </div>
              <div class="p-field col-sm-4">
                <label >Cidade</label>
                  <div class="p-inputgroup">
                    <InputText  v-model="form.pessoa.pessoaDados.cidade" type="text" />
                    <Button @click="onDataSearch" icon="pi pi-search"/>
                </div>
              </div>
              <div class="p-field col-sm-1">
                  <label >UF</label>
                  <InputText  v-model="form.pessoa.pessoaDados.uf" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label >Residencial</label>
                  <InputMask mask="(99)9999-9999"  v-model="form.pessoa.pessoaDados.residencial" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label >Outro</label>
                  <InputMask mask="(99)9999-99999" v-model="form.pessoa.pessoaDados.comercial" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label >Celular</label>
                  <InputMask mask="(99)99999-9999" v-model="form.pessoa.pessoaDados.celular" type="text" />
              </div>
            </div>
        <template #footer>
          <Button label="Salvar" class="p-button-outlined" @click="onValidate"/>
          <Button label="Cancelar" class="p-button-outlined" @click="showModal=false"/>
        </template>
      </Dialog>
    </div>
    <div class="datasearch">
      <datasearch-estufa :columns="ds.columns" :onDestroy="onDestroy" ref="datasearch"/>
    </div>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import http from '../../router/http'
import axios from 'axios'
import VueLoading from 'vue-loading-overlay'
import Button from 'primevue/button'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  data () {
    return {
      isLoading: false,
      showModal: false,
      fasescrecimento: [
        {
          id: 0,
          fase: 'Broderagem'
        }
      ],
      dynamic: {
        route: 'menu_estufas',
        pagging: 1,
        filters: '',
        orders: ' id desc'
      },
      fields: [
        {
          length: 10,
          field: 'id',
          header: 'ID'
        },
        {
          length: 40,
          field: 'nome',
          header: 'nome'
        },
        {
          length: 20,
          field: 'proprietario',
          header: 'Prorpietario'
        },
        {
          length: 20,
          field: 'responsavel',
          header: 'Responsavel'
        }
      ],
      ds: {
        columns: []
      },
      form: {
        add: true,
        edit: false,
        dele: false,
        id: '',
        idpessoa: '',
        proprietario: '',
        responsavel: '',
        pessoa: {
          add: true,
          edit: false,
          dele: false,
          id: '',
          nome: '',
          pessoaDados: {
            add: true,
            edit: false,
            dele: false,
            id: '',
            idpessoa: '',
            cep: '',
            endereco: '',
            bairro: '',
            numero: '',
            complemento: '',
            cidade: '',
            uf: '',
            residencial: '',
            celular: '',
            comercial: '',
            idcidade: 0
          }
        }
      }
    }
  },
  components: {
    Dialog,
    InputText,
    Button,
    InputMask,
    loading: VueLoading
  },
  mounted () {
    this.onGetDynamic()
  },
  methods: {
    onGetById (id) {
      axios.get(http.url + 'pessoaestufa/' + id).then(res => {
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
      axios.post(http.url + 'pessoaestufa', form).then(res => {
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
      if (this.form.nome === '') {
        this.$toast.add({ severity: 'warn', summary: 'Estufa+', detail: 'Descricao não pode ficar em branco', life: 3000 })
      } else {
        this.onSave(this.form)
      }
    },
    onGetDynamic () {
      this.isLoading = true
      this.$refs.datagrid.getAll(this.dynamic)
      // this.isLoading = false
    },
    onDataSearch () {
      var dynamic = {
        route: 'expl_cidades',
        pagging: 1,
        filters: '',
        orders: ' id desc'
      }
      this.ds.columns = ['id', 'nome', 'uf']
      this.$refs.datasearch.getAll(dynamic, 'cidade', 0)
    },
    onDestroy (obj, route) {
      this.form.pessoa.pessoaDados.cidade = obj.nome
      this.form.pessoa.pessoaDados.uf = obj.uf
      this.form.pessoa.pessoaDados.idcidade = obj.id
    }
  }
}
</script>

<style lang="scss" scoped>
.estufas{
  height: 100%;
}
</style>
