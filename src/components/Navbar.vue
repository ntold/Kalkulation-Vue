<template>
<div class="nav">
  <div class="nav-logo"><img src="../assets/favicon.png" alt=""></div>
  <div class="nav-title handleScroll"><p>Kalkulationsblatt</p></div>
  <div class="filler"></div>

  <div class="navigation-wrapper" v-if="home()">
    <div id="nav" class="navigation">
      <span></span>
      <div id="" class="nav-item active" v-on:click="goHome()">Home</div>
      <span></span>
      <div id="fertigung" class="nav-item" v-on:click="goFertigung()">Fertigung</div>
      <div class="nav-item" v-on:click="goMaterial()">Material</div>
      <div class="nav-item" v-on:click="goOberflaeche()">Oberfläche</div>
      <div class="nav-item" v-on:click="goWerkzeug()">Werkzeug</div>
      <div class="nav-item" v-on:click="goEinmaligekosten()">Einmaligekosten</div>
      <span></span>
      <div class="nav-item" v-on:click="goTotal()">Total</div>
      <span></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({ path: `/` });
    },
    goFertigung() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/fertigung` });
    },
    goMaterial() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/material` });
    },
    goOberflaeche() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/oberflaeche` });
    },
    goWerkzeug() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/werkzeug` });
    },
    goEinmaligekosten() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/einmaligekosten` });
    },
    goTotal() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/total` });
    },
    home(){
      if (this.$route.path == "/"){
        return false;
      }else{
        return true;
      }
    }
  },
  created() {
    var header = document.getElementById("nav");
    var btns = header.getElementsByClassName("nav-item");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }
};
</script>

<style>


.active{
  background-color: #40a1c7 !important;
}

.nav{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  
  background-color: #0082b4;
  
  position: fixed;
  top: 0;
  height: 100px;
  width: 100%; 
  z-index: 9999;
}


.nav-logo img{
  width: 100px;
  margin-left: 100px;
}

.nav-title{
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  color: white;
  font-size: 2.5em;
}

.navigation-wrapper{
  position: absolute;
  width: 100%;
  top: 100px;
  border-top: solid 1px white;
}

.navigation{
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 0.3fr repeat(5, 0.4fr) 0.3fr 0.5fr 0.3fr;
  background: #0082b4;
  height: 45px;
}

.nav-item{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  color: whitesmoke;
  font-weight: 600;
  text-transform: uppercase; 

  
  transition: all .1s ease-out;
  -webkit-transition: all .1s ease-out;
  -moz-transition: all .1s ease-out;
}

.nav-item:hover{
  transition: all .1s ease-in;
  -webkit-transition: all .1s ease-in;
  -moz-transition: all .1s ease-in;

  background-color: #40a1c7;

  cursor: pointer;
}


</style>
