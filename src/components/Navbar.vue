<template>
  <nav class="nav-extended color">
      <div class="nav-wrapper colored">
          <div class="row">
            <div class="col m1 l1"></div>
            <router-link to="/" class="brand-logo left"  style="text-decoration:none;"> TFBern </router-link>
            <router-link to="/" class="brand-logo center"  style="text-decoration:none;"> Kalkulation </router-link>
          </div>
      </div>
      <div class="nav-content color">
        <div class="row center">
          <div class="center">
            <div class="col m1"></div>
              <div class="col m10">
                <ul class="tabs tabs-transparent">
                  <li class="tab"><router-link to="/" tag="a">Home</router-link></li>
                  <li class="tab"><router-link to="/fertigung" tag="a">Fertigung</router-link></li>
                  <li class="tab"><router-link to="/material" tag="a">Material</router-link></li>
                  <li class="tab"><router-link to="/oberflaeche" tag="a">Oberfläche</router-link></li>
                  <li class="tab"><router-link to="/werkzeug" tag="a">Werkzeug</router-link></li>
                </ul>
              </div>
            <div class="col m1"></div>
          </div>
        </div>
      </div>
  </nav>

</template>

<script>
export default {
  data() {
    return { }
  }
};
</script>

<style scoped>
.color {
  background-color: #0082b4;
}
</style>
