<template>
  <div class="controladores">
    <loading v-model="isLoading" loader="spinner" color="#000" :can-cancel="true" :is-full-page="true"/>
    <div style="margin-bottom: 20px">
      <h3>Controladores</h3>
    </div>
    <div class="grid">
      <datatabe-estufa classname="controladores" :onGetById="onGetById" :columns="fields" ref="datagrid"/>
    </div>
    <div>
      <Dialog :style="{width: '60vw'}" header="Cadastro de Controladores" :visible.sync="showModal" :modal="true">
        <TabView>
          <TabPanel header="Principal">
            <div class="p-fluid row">
              <div class="p-field col-sm-6">
                  <label >Nome</label>
                  <InputText v-model="form.nome" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label>Host(IP ou Nome)</label>
                  <InputText  v-model="form.host" type="text" />
              </div>
              <div class="p-field col-sm-2">
                  <label>Ativo</label>
                  <Dropdown v-model="selecionado" :options="status" optionLabel="name" />
              </div>
              <div class="p-field col-sm-4">
                  <label>Estufa</label>
                  <div class="p-inputgroup">
                    <InputText v-model="form.estufa" type="text"/>
                    <Button @click="onDataSearch('estufa')"  icon="pi pi-search"/>
                </div>
              </div>
              <div class="p-field col-sm-4">
                <label>Fases Crecimento</label>
                  <div class="p-inputgroup">
                    <InputText v-model="form.descricao" type="text"/>
                    <Button @click="onDataSearch('fases')"  icon="pi pi-search"/>
                </div>
              </div>
              <div class="p-field col-sm-4">
                <label>Setor Dentro da Estufa</label>
                  <div class="p-inputgroup">
                    <InputText v-model="form.setor" type="text"/>
                    <Button @click="onDataSearch('setor')"  icon="pi pi-search"/>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Plantas">
            <div class="p-field col-sm-12">
              <label >Plantas</label>
                <div class="p-inputgroup">
                  <InputText  type="text" />
                  <Button @click="onDataSearch('plantas')"  icon="pi pi-search"/>
              </div>
            </div>
            <div class="p-field col-sm-12">
                <DataTable :value="form.plantas" editMode="cell" class="editable-cells-table">
                  <Column :headerStyle="'width: 35vw;'" :bodyStyle="'width: 35vw;'" field="nome" header="Nome"></Column>
                  <Column :headerStyle="'width: 13vw;'" :bodyStyle="'width: 13vw;'" field="quantidade" header="Quantidade">
                      <template #editor="slotProps">
                          <InputText v-model="slotProps.data[slotProps.column.field]" />
                      </template>
                  </Column>
                  <Column header="X" :headerStyle="'width: 5vw;'" :bodyStyle="'width: 5vw;'" >
                    <template #body="slotProps">
                      <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-tex" @click="onRemoveTable('nutri', slotProps.data, slotProps)" />
                    </template>
                  </Column>
                </DataTable>
              </div>
          </TabPanel>
        </TabView>
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
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import http from '../../router/http'
import axios from 'axios'
import VueLoading from 'vue-loading-overlay'
import Button from 'primevue/button'
import 'vue-loading-overlay/dist/vue-loading.css'
import Dropdown from 'primevue/dropdown'
var PLANTAS_EXCLUIDAS = []

export default {
  data () {
    return {
      isLoading: false,
      showModal: false,
      selecionado: {
        code: 1,
        name: 'Sim'
      },
      status: [
        { name: 'Sim', code: 1 },
        { name: 'Não', code: 0 }
      ],
      dynamic: {
        route: 'menu_controladores',
        pagging: 1,
        filters: '',
        orders: ' id desc'
      },
      ds: {
        columns: []
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
          field: 'host',
          header: 'Host'
        },
        {
          length: 20,
          field: 'estufa',
          header: 'Estufa'
        },
        {
          length: 20,
          field: 'status',
          header: 'Status'
        }
      ],
      form: {
        add: true,
        edit: false,
        del: false,
        id: '',
        idestufa: '',
        estufa: '',
        idfase: '',
        descricao: '',
        nome: '',
        host: '',
        ativo: '',
        idsetor: 0,
        setor: '',
        plantas: []
      }
    }
  },
  components: {
    Dialog,
    InputText,
    Column,
    DataTable,
    TabView,
    TabPanel,
    Button,
    Dropdown,
    loading: VueLoading
  },
  mounted () {
    this.onGetDynamic()
  },
  methods: {
    onGetById (id) {
      axios.get(http.url + 'controladores/' + id).then(res => {
        if (res.data.ret === 'success') {
          this.form = res.data.obj
          this.selecionado.code = this.form.ativo
        } else {
          this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: res.data.motivo, life: 3000 })
        }
        this.showModal = true
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: err, life: 3000 })
      })
    },
    onSave (form) {
      axios.post(http.url + 'controladores', form).then(res => {
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
        if (PLANTAS_EXCLUIDAS.length > 0) {
          this.onValidateArrays(PLANTAS_EXCLUIDAS, 0)
        }
        this.form.ativo = this.selecionado.code
        this.onSave(this.form)
      }
    },
    onGetDynamic () {
      this.isLoading = true
      this.$refs.datagrid.getAll(this.dynamic)
    },
    onDataSearch (route) {
      if (route === 'plantas') {
        var dynamic = {
          route: 'expl_plantas',
          pagging: 1,
          filters: '',
          orders: ' id desc'
        }
        this.ds.columns = ['id', 'nome']
        this.$refs.datasearch.getAll(dynamic, 'plantas', 0)
      } else if (route === 'fases') {
        dynamic = {
          route: 'expl_fases',
          pagging: 1,
          filters: '',
          orders: ' id desc'
        }
        this.ds.columns = ['id', 'descricao']
        this.$refs.datasearch.getAll(dynamic, 'fases', 0)
      } else if (route === 'estufa') {
        dynamic = {
          route: 'expl_estufas',
          pagging: 1,
          filters: '',
          orders: ' id desc'
        }
        this.ds.columns = ['id', 'nome']
        this.$refs.datasearch.getAll(dynamic, 'estufa', 0)
      } else if (route === 'setor') {
        dynamic = {
          route: 'expl_estufasetor',
          pagging: 1,
          filters: '',
          orders: ' id desc'
        }
        this.ds.columns = ['id', 'descricao']
        this.$refs.datasearch.getAll(dynamic, 'setor', 0)
      }
    },
    onDestroy (obj, route) {
      if (route === 'plantas') {
        var plantas = {
          add: true,
          edit: false,
          del: false,
          id: '',
          idcontrolador: '',
          quantidade: '',
          idplanta: '',
          nome: ''
        }
        console.log(obj)
        plantas.nome = obj.nome
        plantas.idplanta = obj.id
        this.form.plantas.push(plantas)
      } else if (route === 'fases') {
        this.form.idfase = obj.id
        this.form.descricao = obj.descricao
      } else if (route === 'estufa') {
        console.log(obj)
        this.form.idestufa = obj.id
        this.form.estufa = obj.nome
      } else if (route === 'setor') {
        console.log(obj)
        this.form.idsetor = obj.id
        this.form.setor = obj.descricao
      }
    },
    onRemoveTable (table, obj, e) {
      PLANTAS_EXCLUIDAS.push(obj)
      this.form.plantas.splice(e.index)
    },
    onValidateArrays (obj, e) {
      obj.forEach(item => {
        if (item.id !== 0) {
          item.add = false
          item.del = true
          this.form.plantas.push(item)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.controladores{
  height: 100%;
}
</style>
