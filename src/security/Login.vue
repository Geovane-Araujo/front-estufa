<template>
  <div class="content">
    <loading class="loading" :active="showLoading" :height="45" :width="128" background-color="#c9cdf0" color="#232b70" loader="spinner" :is-full-page="true"/>
    <div class="login">
      <div class="formulario">
        <div class="logo">
          <img src="../assets/icons/Logo.png" alt="">
        </div>
        <md-field>
          <label>Usuário</label>
          <md-input class="dd" v-model="form.nome"></md-input>
        </md-field>
        <md-field>
          <label>Senha</label>
          <md-input v-model="form.senha" type="password"></md-input>
        </md-field>
        <div class="p-fluid">
          <div class="p-field">
            <Button @click="login(1)" label="Acessar Administrativo"/>
          </div>
        </div>
        <div style="margin-top: 10px" class="p-fluid">
          <div class="p-field">
            <Button @click="login(2)" label="Acessar Monitoramento"/>
          </div>
        </div>
      </div>
    </div>
      <vue-particles :particlesNumber="150" class="particles" color="#dedede"></vue-particles>
  </div>
</template>

<script src="./login.js">
</script>

<style lang="scss" scoped>
.logo{
  width: 100%;
  height: 200px;
  margin-bottom: 50px;
}
.particles{
  height: 100%;
  width: 100%;
}
.content{
  height: 100vh;
  width: 100vw;
  display: flex;
}
.login{
  border-radius: 13px;
  box-shadow: 1px 1px 1px rgb(51, 51, 51);
  height: 100%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #184e68 0%,#57ca85 100%);
}
.formulario{
  width: 85%;
  color: aliceblue;
}
.dd{
  color: aliceblue;
}

@media screen and (max-width: 600px) {
  .login{
    width: 70%;
  }
}
</style>
