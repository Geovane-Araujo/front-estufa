<template>
  <div class="contennt">
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="usr">
          <b-avatar src="https://placekitten.com/300/300" size="5rem"></b-avatar>
          <div class="user-data">
            <h5>{{form.nome}}</h5>
            <h6></h6>
          </div>
        </div>
      </div>
      <div class="sidebar-content">
        <div v-for="item in sidebar.items" :key="item.name">
          <SideBarLink :colapesd="false" :sub="item.sub" :name="item.name" :route="item.route" :icon="item.icon"/>
        </div>
      </div>
      <div class="sidebar-footer">
      </div>
    </div>
    <div>
        <div class="router">
        <!-- <transition name="animati"> -->
          <router-view/>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script src="./Sidebar.js">
</script>
<style lang="scss" scoped>
$isDesktop: 15vw;
$isMobile: 50px;

.cnae{
  width: 300px;
}
.nav{
  flex-direction: row-reverse;
  padding: 0px;
  height: 60px;
  width: 99%;
  margin-left: 10px;
  border-radius: 0px 0px 0px 10px;
  background-color: rgba($color: #000000, $alpha: 0.0);
  box-shadow: 10px;
}
.animati-enter-active, .animati-leave-active {
  transition: opacity .5s;
  // transition: height .1s;
}
.animati-enter, .animati-leave-to {
  opacity: 0;
}
.particles{
  position: relative;
  z-index: 0;
}
.router{
  padding: 7px;
  margin-top: 20px;
  margin-left: 0px;
  width: calc(100vw - 15vw);
  height: 96%;
  border-radius: 5px;
  overflow: auto;
  max-width: 100vw;
  max-height: 98vh;
  background-color: #184e68;
}
.contennt{
  display: flex;
}
.sidebar{
  border-radius: 0px 20px 20px 0px;
  position: relative;
  height: 100vh;
  max-height: 100%;
  overflow: hidden;
  max-width: 100%;
  width: $isDesktop;
  box-shadow: 10px;
  background:linear-gradient(135deg, #184e68 0%,#57ca85 100%);
}
.sidebar-header{
  height: 20vh;
  display: flex;
  .usr{
    width: 100%;
    display: flex;
    align-items: center;
    .user-data{
      margin-left: 10px;
      h6{
        font-size: 11px;
      }
    }
  }
}
.sidebar-footer{
  height: 7vh;
  width: $isDesktop;
  bottom: 0;
  position: absolute;
}
.sidebar-content{
  height: 73vh;
  width: $isDesktop;
}
@media screen and (max-width: 600px) {
  .sidebar{
    width: $isMobile;
    overflow: visible;
  }
  .sidebar-header{
    height: 0px;
    visibility: hidden;
  }
  .sidebar-footer{
    width: $isMobile;
    visibility: hidden;
  }
  .sidebar-content{
    height: 100vh;
  }
}
</style>
