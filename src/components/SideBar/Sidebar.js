import SideBarLink from './SidebarLink.vue'
export default {
  data () {
    return {
      iscolapsed: false,
      form: {
        nome: '',
        cargo: ''
      }
    }
  },
  mounted () {
    this.form.nome = sessionStorage.getItem('user')
  },
  props: {
    sidebar: {
      type: Object
    }
  },
  components: {
    SideBarLink
  }
}
