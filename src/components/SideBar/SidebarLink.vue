<template>
  <div class="content">
    <div class="header" @click="onSelectRoute(route,true)">
      <i :class="icon"><div class="faa"></div></i>
      <h3>{{ name }}</h3>
    </div>
    <transition name="fade"><SideBarLinkItem class="iten-side" :sub="sub" v-show="isColapesd"/></transition>
  </div>
</template>

<script>
import SideBarLinkItem from './SidebarLinkItem.vue'
export default {
  name: 'SideBarLink',
  data () {
    return {
      isColapesd: this.colapsed
    }
  },
  props: {
    colapsed: {
      type: Boolean
    },
    route: {
      type: String
    },
    name: {
      type: String
    },
    icon: {
      type: String
    },
    sub: {
      type: Array
    }
  },
  mounted () {
    this.isColapesd = false
  },
  methods: {
    onSelectRoute (route, colapsed) {
      if (this.route !== '') {
        this.$router.push({ name: route })
      } else {
        if (this.isColapesd) {
          this.isColapesd = false
        } else {
          this.isColapesd = true
        }
      }
    }
  },
  components: {
    SideBarLinkItem
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  // transition: height .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
i{
  color: #000000;
}
.header{
  height: 40px;
  background-color: rgba($color: #000000, $alpha: 0.0);
  display: flex;
  align-items: center;
  width: 100%;
  color: white;
  padding: 10px;
  cursor: pointer;
  h3{
    margin-left: 10px;
    margin-top: 7px;
    font-size: 1.2rem;
  }
}
.header:hover{
  background:linear-gradient(135deg, #184e68 0%,#57ca85 100%);
}
@media screen and (max-width: 600px) {
  .header{
    h3{
      visibility: hidden;
    }
    width: 14vw;
    .faa{
      visibility: visible;
      width: 25px;
      height: 40px;
    }
  }
}
</style>
