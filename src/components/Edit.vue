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
    const key = this.$route.params.id;

    this.DatabaseRef = database.ref("Database");

    this.KalkulationRef = database.ref(`Kalkulationen/${key}/fertigung`);
    this.MaterialRef = database.ref(`Kalkulationen/${key}/material`);
    this.OberflaecheRef = database.ref(`Kalkulationen/${key}/oberflaeche`);
    this.WerkzeugRef = database.ref(`Kalkulationen/${key}/werkzeug`);
    this.EinmaligeKostenRef = database.ref(`Kalkulationen/${key}/einMKosten`);

    return {};
  }
};
</script>

<style>
</style>
