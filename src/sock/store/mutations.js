import * as types from './mutations-types'

export default {
  [types.SET_CONTROLERS] (state, payload) {
    var a = payload.split('|')
    state.statussensor.sensor = a[0]
    state.statussensor.medidas.push(a[1])
  }
}
