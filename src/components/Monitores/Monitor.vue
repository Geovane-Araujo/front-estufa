<template>
  <div class="knob-monitor">
    <div class="header">
      {{ title }}
    </div>
    <div class="moni">
      <Knob v-model="form[0].valor" :strokeWidth="5" :size="100" valueTemplate="{value}%"/>
      Nível Agua
    </div>
    <div class="moni">
      <Knob v-model="form[1].valor" :strokeWidth="5" :size="100" valueTemplate="{value}°C"/>
      Temperatura Ambiente
    </div>
    <div class="moni">
      <Knob v-model="form[2].valor" :strokeWidth="5" :min="0" :max="4" :size="100"/>
      Condutividade Eletrica
    </div>
    <div class="moni">
      <Knob v-model="form[3].valor" :strokeWidth="5" :min="0" :max="14" :size="100"/>
      PH
    </div>
  </div>
</template>

<script src="./Monitor.js">
</script>

<style lang="scss" scoped>
.knob-monitor{
  height: 100%;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
}
.header{
  height: 3%;
  width: 100%;
  padding: 5px;
}
.moni{
  height: 48%;
  width: 48%;
  margin: 1%;
  text-align: center;
  align-items: center;
}
</style>
