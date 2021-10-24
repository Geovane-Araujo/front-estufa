<template>
  <div class="plantas">
    <loading v-model="isLoading" loader="spinner" color="#000" :can-cancel="true" :is-full-page="true"/>
    <div style="margin-bottom: 20px">
      <h3>Plantas</h3>
    </div>
    <div class="grid">
      <datatabe-estufa classname="plantas" :onGetById="onGetById" :columns="fields" ref="datagrid"/>
    </div>
    <div>
      <Dialog :style="{width: '60vw'}" header="Cadastro Plantas" :visible.sync="showModal" :modal="true">
        <TabView>
          <TabPanel header="Principal">
            <div class="p-fluid row">
              <div class="p-field col-sm-6">
                  <label for="win_planta_nome">Nome Cientifico</label>
                  <InputText id="win_planta_nome" v-model="form.nomecientifico" type="text" />
              </div>
              <div class="p-field col-sm-6">
                  <label for="win_planta_nomepopular">Nome Popular</label>
                  <InputText id="win_planta_nomepopular" v-model="form.nome" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label for="win_planta_familia">Família</label>
                  <InputText id="win_planta_familia" v-model="form.familia" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label for="win_planta_luminosidade">Luminosidade</label>
                  <InputText id="win_planta_luminosidade" v-model="form.luminosidade" type="text" />
              </div>
              <div class="p-field col-sm-4">
                  <label for="win_planta_ciclo">Ciclo de Vida</label>
                  <InputText id="win_planta_ciclo" v-model="form.ciclovida" type="text" />
              </div>
              <div class="p-field col-sm-12">
                  <label for="win_planta_categoria">Categoria</label>
                  <Textarea id="win_planta_nome" v-model="form.categoria" type="text" />
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Fases Crecimento">
            <div class="p-field col-sm-12">
              <label >Fases</label>
                <div class="p-inputgroup">
                  <InputText  type="text" />
                  <Button @click="onDataSearch('fase')" icon="pi pi-search"/>
              </div>
            </div>
            <div class="p-field col-sm-12">
                <DataTable :value="form.fases" editMode="cell" class="editable-cells-table">
                    <Column :headerStyle="'width: 20%;'" :bodyStyle="'width: 20%;'" field="descricao" header="Fase"></Column>
                    <Column :headerStyle="'width: 15%;'" :bodyStyle="'width: 15%;'" field="luminosidade" header="Condutividade Eletrica">
                        <template #editor="slotProps">
                          <div class="p-fluid">
                            <div class="p-field col-sm-12">
                              <InputText v-model="slotProps.data[slotProps.column.field]"/>
                            </div>
                          </div>
                        </template>
                    </Column>
                    <Column :headerStyle="'width: 15%;'" :bodyStyle="'width: 15%;'" field="ph" header="Ph">
                        <template #editor="slotProps">
                          <div class="p-fluid">
                            <div class="p-field col-sm-12">
                              <InputText v-model="slotProps.data[slotProps.column.field]" />
                            </div>
                          </div>
                        </template>
                    </Column>
                    <Column :headerStyle="'width: 15%;'" :bodyStyle="'width: 15%;'" field="humidade" header="Nivel Agua">
                        <template #editor="slotProps">
                          <div class="p-fluid">
                            <div class="p-field col-sm-12">
                              <InputText v-model="slotProps.data[slotProps.column.field]" />
                            </div>
                          </div>
                        </template>
                    </Column>
                    <Column :headerStyle="'width: 15%;'" :bodyStyle="'width: 15%;'" field="temperatura" header="Temperatura Ideal">
                        <template #editor="slotProps">
                          <div class="p-fluid">
                            <div class="p-field col-sm-12">
                              <InputText v-model="slotProps.data[slotProps.column.field]" />
                            </div>
                          </div>
                        </template>
                    </Column>
                    <Column :headerStyle="'width: 5%;'" :bodyStyle="'width: 5%;'">
                      <template #body="slotProps">
                          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-tex" @click="onRemoveTable('fase', slotProps.data, slotProps)" />
                      </template>
                  </Column>
                  </DataTable>
              </div>
          </TabPanel>
          <TabPanel header="Nutrientes">
            <div class="p-field col-sm-12">
              <label >Nutrientes</label>
                <div class="p-inputgroup">
                  <InputText  type="text" />
                  <Button @click="onDataSearch('nutri')"  icon="pi pi-search"/>
              </div>
            </div>
            <div class="p-field col-sm-12">
                <DataTable :value="form.plnutrientes" editMode="cell" class="editable-cells-table">
                  <Column :headerStyle="'width: 35vw;'" :bodyStyle="'width: 35vw;'" field="descricao" header="Nutriente"></Column>
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
import Textarea from 'primevue/textarea'
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
var FASES_EXCLUIDAS = []
var NUTRIENTES_EXCLUIDOS = []

export default {
  data () {
    return {
      isLoading: false,
      showModal: false,
      dynamic: {
        route: 'menu_plantas',
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
          field: 'nomecientifico',
          header: 'Nome Cientifico'
        },
        {
          length: 20,
          field: 'familia',
          header: 'Familia'
        }
      ],
      form: {
        add: true,
        edit: false,
        dele: false,
        id: '',
        nome: '',
        caracteristica: '',
        nomecientifico: '',
        familia: '',
        luminosidade: '',
        ciclovida: '',
        categoria: '',
        plnutrientes: [],
        fases: []
      }
    }
  },
  components: {
    Dialog,
    Textarea,
    InputText,
    Column,
    DataTable,
    TabView,
    TabPanel,
    Button,
    loading: VueLoading
  },
  mounted () {
    this.onGetDynamic()
  },
  methods: {
    onGetById (id) {
      axios.get(http.url + 'plantas/' + id).then(res => {
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
      axios.post(http.url + 'plantas', form).then(res => {
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
        if (FASES_EXCLUIDAS.length > 0) {
          this.onValidateArrays(FASES_EXCLUIDAS, 0)
        }
        if (NUTRIENTES_EXCLUIDOS.length > 0) {
          this.onValidateArrays(NUTRIENTES_EXCLUIDOS, 1)
        }
        this.onSave(this.form)
      }
    },
    onGetDynamic () {
      this.isLoading = true
      this.$refs.datagrid.getAll(this.dynamic)
    },
    onDataSearch (route) {
      if (route === 'nutri') {
        var dynamic = {
          route: 'expl_nutrientes',
          pagging: 1,
          filters: '',
          orders: ' id desc'
        }
        this.ds.columns = ['id', 'descricao']
        this.$refs.datasearch.getAll(dynamic, 'nutri', 0)
      } else {
        dynamic = {
          route: 'expl_fases',
          pagging: 1,
          filters: '',
          orders: ' id desc'
        }
        this.ds.columns = ['id', 'descricao']
        this.$refs.datasearch.getAll(dynamic, 'fase', 0)
      }
    },
    onDestroy (obj, route) {
      if (route === 'nutri') {
        var plnutri = {
          add: true,
          edit: false,
          del: false,
          id: 0,
          idnutriente: '',
          descricao: '',
          idplanta: '',
          quantidade: ''
        }
        plnutri.descricao = obj.descricao
        console.log(obj.id)
        plnutri.idnutriente = obj.id
        this.form.plnutrientes.push(plnutri)
      } else {
        var fspl = {
          add: true,
          edit: false,
          del: false,
          id: 0,
          idplanta: '',
          descricao: '',
          idfase: '',
          temperatura: '',
          humidade: '',
          nivelagua: '',
          ph: '',
          luminosidade: ''
        }
        fspl.descricao = obj.descricao
        fspl.idfase = obj.id
        this.form.fases.push(fspl)
      }
    },
    onRemoveTable (table, obj, e) {
      console.log(e)
      if (table === 'fase') {
        FASES_EXCLUIDAS.push(obj)
        this.form.fases.splice(e.index)
      } else {
        NUTRIENTES_EXCLUIDOS.push(obj)
        this.form.plnutrientes.splice(e.index)
      }
    },
    onValidateArrays (obj, e) {
      obj.forEach(item => {
        if (item.id !== 0) {
          item.add = false
          item.del = true
          if (e === 1) {
            this.form.fases.push(item)
          } else {
            this.form.plnutrientes.push(item)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.plantas{
  height: 100%;
}
</style>
