<template>
  <div v-bind:class="'card-totals ' + styless">
    <div class="card-number">
      <h4>
        {{ total }}
      </h4>
    </div>
    <div class="card-content">
      <h5>{{ description }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styless: {
      type: String
    },
    total: {
      type: Number
    },
    description: {
      type: String
    },
    width: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.card-totals{
  margin-left: 10px;
  margin-bottom: 10px;
  height: 100%;
  border-radius: 13px;
  padding: 10px;
  display: flex;
  box-shadow: 1px 1px 1px rgb(51, 51, 51);
}
.card-number{
  height: 100%;
  width: 40%;
  display: flex;
  align-items: center;
  text-align: center;
  h4{
    font-size: 3em;
  }
}
.card-content{
  h4{
    font-size: 3em;
  }
}
@media screen and (max-width: 600px) {
  .card-totals{
    width: 100%;
    height: 100%;
  }
}
</style>
