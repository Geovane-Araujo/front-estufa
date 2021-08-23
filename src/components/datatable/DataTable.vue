<template>
  <div>
    <div class="btns" style="margin-bottom: 10px;">
      <Button class="p-button-outlined p-button-info" style="margin-right: 5px;" label="Adicionar" @click="onGetById(-100)"/>
      <Button class="p-button-outlined p-button-warning" style="margin-right: 5px;" label="Editar" />
      <Button class="p-button-outlined p-button-danger" style="margin-right: 5px;" label="Excluir" @click="onGetById(1)"/>
    </div>
    <DataTable :loading="loading" :selection.sync="selecionado" selectionMode="multiple" scrollHeight="68vh" :scrollable="true" class="p-datatable-sm" :value="obj">
      <Column :headerStyle="'width:'+col.length+'px'" headerClass="altura" :bodyStyle="'width:'+col.length+'px'" v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    </DataTable>
    <div class="pagginator">
      <Paginator :rows="20" @page="onPage($event)" :totalRecords="total">
        <template #right="slotProps">
          Pagina: {{slotProps.state.page + 1}}
          Registros: {{slotProps.state.first}}
          Registros por Pagina: {{slotProps.state.rows}}
        </template>
        <template #left>
          <Button @click="onRefresh" type="button" icon="pi pi-refresh" style="margin-right: 10px"/>
          <InputText @keyup.stop="onSearch(search)" type="text" v-model="search" style="width: 220px"/>
        </template>
      </Paginator>
    </div>
  </div>
</template>

<script>
import http from '../../router/http'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import InputText from 'primevue/inputtext'

export default {
  name: 'datatabe-estufa',
  data () {
    return {
      loading: false,
      obj: [],
      itens: [],
      selecionado: [],
      total: 0,
      search: '',
      selectedFilter: '',
      combobox: [
        {
          name: '',
          code: ''
        }
      ]
    }
  },
  props: {
    title: {
      type: String
    },
    objectRoute: {
      type: Object
    },
    columns: {
      type: Array
    },
    onGetById: Function
  },
  components: {
    DataTable,
    Paginator,
    Column,
    Button,
    InputText
  },
  methods: {
    onSelect (items) {
      this.itens = items
    },
    async getAll (objectRoute) {
      if (objectRoute === '') {
        objectRoute = this.objectRoute
      } else {
        this.objectRoute = objectRoute
      }
      this.loading = true
      await axios.post(http.url + 'dynamic', objectRoute, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') } }).then(res => {
        if (res.data.ret === 'success') {
          this.obj = res.data.obj.obj
          this.total = res.data.obj.rows
        } else {
          this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: res.data.motivo, life: 3000 })
        }
        this.loading = false
      }).catch(err => {
        this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: err, life: 3000 })
      })
    },
    onPage (event) {
      this.objectRoute.pagging = event.page + 1
      this.getAll(this.objectRoute)
    },
    onSearch (key) {
      var filter = key.split(':')
      var fi = ''
      if (filter.length > 1) {
        fi = ' and CAST(' + filter[0] + ' as varchar) like \'%' + filter[1] + '%\''
        this.objectRoute.filters = fi
        this.getAll(this.objectRoute)
      } else {
        this.objectRoute.filters = ''
        this.getAll(this.objectRoute)
      }
    },
    onDeleteItens () {
      alert('chegou')
    },
    onRefresh () {
      this.objectRoute.filters = ''
      this.getAll(this.objectRoute)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagginator{
  height: 35px;
}
</style>
