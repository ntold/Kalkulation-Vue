<template>
  <div id="app">
    <Navbar />
    <div class="push"></div>
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

.push{
  height: 100px;
}
</style>
