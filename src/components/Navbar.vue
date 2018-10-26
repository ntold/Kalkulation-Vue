<template>
<div class="nav">
  <div class="nav-logo"><img src="../assets/favicon2.jpg" alt=""></div>
  <div class="nav-title handleScroll"><p>Kalkulationsblatt</p></div>
  <div class="filler">
    <ul class="right">
        <!-- <li v-if="isLoggedIn" class="nickname"> {{ currentUser }} </li> -->
      <li v-if="isLoggedIn"><button v-on:click="logout" class="btn">Logout</button></li>
    </ul>
  </div>

  <div class="navigation-wrapper">
    <div id="nav" class="navigation" >
      <span></span>
      <div v-if="home() && isLoggedIn" id="Home" class="nav-item" v-on:click="goHome()">Home</div>
      <span></span>
      <div v-if="home() && isLoggedIn" id="Fertigung" class="nav-item active" v-on:click="goFertigung()">Fertigung</div>
      <div v-if="home() && isLoggedIn" id="Material" class="nav-item" v-on:click="goMaterial()">Material</div>
      <div v-if="home() && isLoggedIn" id="Oberflaeche" class="nav-item" v-on:click="goOberflaeche()">Oberfläche</div>
      <div v-if="home() && isLoggedIn" id="Werkzeug" class="nav-item" v-on:click="goWerkzeug()">Werkzeug</div>
      <div v-if="home() && isLoggedIn" id="Einmaligekosten" class="nav-item" v-on:click="goEinmaligekosten()">Einmaligekosten</div>
      <span></span>
      <div v-if="home() && isLoggedIn" id="Total" class="nav-item" v-on:click="goTotal()">Total</div>
      <span></span>
    </div>
  </div>
</div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    },
    goHome() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Home");
      clicked.className += " active";
      this.$router.push({ path: `/` });
    },
    goFertigung() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Fertigung");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/fertigung` });
    },
    goMaterial() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Material");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/material` });
    },
    goOberflaeche() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Oberflaeche");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/oberflaeche` });
    },
    goWerkzeug() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Werkzeug");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/werkzeug` });
    },
    goEinmaligekosten() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Einmaligekosten");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/einmaligekosten` });
    },
    goTotal() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Total");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/total` });
    },
    home() {
      if (this.$route.path == "/") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style>
.active {
  background-color: #40a1c7 !important;
}

.nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  background-color: white;

  position: fixed;
  top: 0;
  height: 100px;
  width: 100%;
  z-index: 9999;
}

.nav-logo img {
  width: 200px;
  margin-left: 100px;
  margin-top: 10px;
}

.nav-title {
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  color: black;

  font-size: 2.5em;
}

.navigation-wrapper {
  position: absolute;
  width: 100%;
  top: 100px;
  border-top: solid 1px white;
}

.navigation {
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 0.3fr repeat(5, 0.5fr) 0.3fr 0.5fr 0.3fr;
  background: #0082b4;
  height: 45px;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  color: whitesmoke;
  font-weight: 600;
  text-transform: uppercase;

  transition: all 0.1s ease-out;
  -webkit-transition: all 0.1s ease-out;
  -moz-transition: all 0.1s ease-out;
}

.nav-item:hover {
  transition: all 0.1s ease-in;
  -webkit-transition: all 0.1s ease-in;
  -moz-transition: all 0.1s ease-in;

  background-color: #40a1c7;

  cursor: pointer;
}

.btn {
  background-color: #0082b4;
  color: white;
  margin-right: 100px;
  margin-top: 30px;
}

.btn:hover {
  background-color: firebrick;
  color: white;
}
</style>
