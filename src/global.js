import Vue from 'vue'
import Sidebar from './components/SideBar/Sidebar.vue'
import Card from './components/Card/Card.vue'
import DataTable from './components/datatable/DataTable.vue'
import DataSearch from './components/datatable/DataTableSearch.vue'
import Monitor from './components/Monitores/Monitor.vue'

Vue.component('sidebar', Sidebar)
Vue.component('card', Card)
Vue.component('datatabe-estufa', DataTable)
Vue.component('datasearch-estufa', DataSearch)
Vue.component('monitor-estufa', Monitor)
