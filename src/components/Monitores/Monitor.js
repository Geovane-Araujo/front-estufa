import Knob from 'primevue/knob'
export default {
  name: 'monitor-estufa',
  props: {
    title: {
      type: String
    },
    maxph: {
      type: Number
    },
    maxcond: {
      type: Number
    }
  },
  data () {
    return {
      form: [
        {
          maxtemperatura: 0,
          valor: 0
        },
        {
          maxhumidade: 0,
          valor: 0
        },
        {
          maxph: 0,
          valor: 0
        },
        {
          maxluminosidade: 0,
          valor: 0
        }
      ]
    }
  },
  methods: {
    onResize (obj) {
      obj = obj.split('|')
      this.form[0].valor = parseInt(obj[1])
      this.form[1].valor = parseInt(obj[2])
      this.form[2].valor = parseInt(obj[4])
      this.form[3].valor = parseInt(obj[3])

      this.form[2].maxph = parseInt(this.maxcond)
      this.form[3].maxluminosidade = parseInt(this.maxph)
    }
  },
  components: {
    Knob
  }
}
