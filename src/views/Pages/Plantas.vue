<template>
  <div class="plantas">
    <loading v-model="isLoading" loader="spinner" color="#000" :can-cancel="true" :is-full-page="true"/>
    <div style="margin-bottom: 20px">
      <h3>Cadastro de Plantas</h3>
    </div>
    <div class="grid">
      <datatabe-estufa :onGetById="onGetById" :columns="fields" ref="datagrid"/>
    </div>
    <div>
      <Dialog :style="{width: '60vw'}" header="Cadastro Plantas" :visible.sync="showModal" :modal="true">
        <div class="p-fluid row">
          <div class="p-field col-sm-6">
              <label for="win_planta_nome">Nome Cientifico</label>
              <InputText id="win_planta_nome" type="text" />
          </div>
          <div class="p-field col-sm-6">
              <label for="win_planta_nomepopular">Nome Popular</label>
              <InputText id="win_planta_nomepopular" type="text" />
          </div>
          <div class="p-field col-sm-4">
              <label for="win_planta_familia">Família</label>
              <InputText id="win_planta_familia" type="text" />
          </div>
          <div class="p-field col-sm-4">
              <label for="win_planta_luminosidade">Luminosidade</label>
              <InputText id="win_planta_luminosidade" type="text" />
          </div>
          <div class="p-field col-sm-4">
              <label for="win_planta_ciclo">Ciclo de Vida</label>
              <InputText id="win_planta_ciclo" type="text" />
          </div>
          <div class="p-field col-sm-12">
              <label for="win_planta_categoria">Categoria</label>
              <Textarea id="win_planta_nome" type="text" />
          </div>
          <div class="p-field col-sm-12">
            <DataTable :value="fasescrecimento" editMode="cell" class="editable-cells-table">
              <Column field="Fase" header="Fase"></Column>
              <Column field="Luminosidade" header="Luminosidade">
                  <template #editor="slotProps">
                      <InputText v-model="slotProps.data[slotProps.column.field]" />
                  </template>
              </Column>
              <Column field="ph" header="Ph">
                  <template #editor="slotProps">
                      <InputText v-model="slotProps.data[slotProps.column.field]" />
                  </template>
              </Column>
              <Column field="Humidade" header="Humidade">
                  <template #editor="slotProps">
                      <InputText v-model="slotProps.data[slotProps.column.field]" />
                  </template>
              </Column>
              <Column field="Temperatura" header="Temperatura">
                  <template #editor="slotProps">
                      <InputText v-model="slotProps.data[slotProps.column.field]" />
                  </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import VueLoading from 'vue-loading-overlay'
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
        route: 'mnu_cidade',
        pagging: 1,
        filters: '',
        orders: ' cidade.id desc'
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
          field: 'uf',
          header: 'UF'
        },
        {
          length: 20,
          field: 'ibge',
          header: 'IBGE'
        }
      ]
    }
  },
  components: {
    Dialog,
    Textarea,
    InputText,
    Column,
    DataTable,
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
