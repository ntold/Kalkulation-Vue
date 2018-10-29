<template>
  <div>
    <div class="container">
    <div class="row">
      <div class="col s0 m2 l3"></div>
      <div class="col s12 m8 l6">
        <div class="login card-panel white black-text center top">
          <h3>Anmelden</h3>
          <form action="index.html">
            <div class="input-field row">
              <i class="material-icons login-field col s2 m2 l2">mail_outline</i>
              <input  class="validate col s10 m10 l10" type="email" id="email" v-model="email" placeholder="Email Address">
            </div>
            <div class="input-field row">
              <i class="material-icons login-field col s2 m2 l2">lock_outline</i>
              <input class="col s10 m10 l10" type="password" id="password" v-model="password" placeholder="Password">
            </div>
            <button v-on:click="login" class="waves-effect waves-light btn-large login-btn">Login</button>
          </form>
        </div>
      </div>      
      <div class="col s0 m2 l3"></div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            nativeToast({
              message: `You are logged in as ${user.email}`,
              type: "success",
              position: "top"
            });
            this.$router.go({ path: this.$router.path });
          },
          err => {
            nativeToast({
              message: err.message,
              type: "error"
            });
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.top {
  margin-top: 150px;
}
.login-btn {
  background-color: #0082b4;
}
.input-field .login-field {
  position: relative;
  width: 3rem;
  font-size: 2rem;
  -webkit-transition: color 0.2s;
  transition: color 0.2s;
  top: 0.5rem;
}
</style>