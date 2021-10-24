import Button from 'primevue/button'
import axios from 'axios'
import http from '../router/http'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      showLoading: false,
      form: {
        nome: 'adm@estufaplus.com',
        senha: '2626',
        token: ''
      }
    }
  },
  components: {
    Button,
    Loading
  },
  methods: {
    async login (route) {
      this.showLoading = true
      await axios.post(http.url + 'login', this.form).then(res => {
        if (res.data.ret === 'success') {
          sessionStorage.setItem('token', res.data.obj.token)
          sessionStorage.setItem('user', res.data.obj.nome)
          if (route === 1) {
            this.$router.push('dashboard')
          } else {
            this.$router.push('monitor')
          }
        } else {
          this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: res.data.motivo, life: 3000 })
        }
        this.showLoading = false
      }).catch(err => {
        this.showLoading = false
        this.$toast.add({ severity: 'error', summary: 'Estufa+', detail: err, life: 3000 })
      })
    }
  }
}
