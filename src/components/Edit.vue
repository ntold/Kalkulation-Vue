<template>
<div id="edit">
    <router-view></router-view>
</div>
</template>

<script>
import database from "./db";

export default {
  name: "edit",
  data() {
    this.DatabaseRef = database.ref("Database");
    this.KalkulationRef = database.ref(
      "Kalkulationen/" + `${this.$route.params.id}` + "/fertigung"
    );
    return {};
  }
};
</script>

<style>
</style>
