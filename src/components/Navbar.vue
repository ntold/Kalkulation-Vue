<template>
  <nav>
      <div class="nav-wrapper #424242 color">
          <div class="row">
            <div class="col s1 m1 l1"></div>
            <router-link to="/" class="brand-logo left"  style="text-decoration:none;"> TFBern </router-link>
            <router-link to="/" class="brand-logo center"  style="text-decoration:none;"> Kalkulation </router-link>

          </div>
      </div>
  </nav>
</template>

<script>

    export default {
        name: 'navbar',
        data() {
            return{
                
            };
        }

    };

</script>

<style scoped>

.color{
    background-color: #0082B4;
}

</style>
