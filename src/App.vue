<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
.input-group--text-field input {
  flex: none !important;
}

.nav-margin{
  margin-top: 100px;
}

</style>
