<template>
  <v-app>
    <div>
      <div class="row card-panel mt-3">
        <!-- Spacer l1 -->
        <div class="center col l1"></div>
        <!-- Art -->
        <div class="col l5">
          <p class="center">Art</p>
          <v-select
            :items="art"
            v-model="art"
            item-text="art"
            solo
            autocomplete
            flat
          ></v-select>
        </div>
        <!-- Spacer l1 -->
        <div class="center col l1"></div>
        <!-- Kosten -->
        <div class="col l3">
          <p class="center"> Kosten</p>
          <input type="text" class="center" v-model="kosten" v-on:keyup.enter="storeArt()">
        </div>
        <!-- + -->
        <div class="col l1">
          <br />
          <br />
          <br />
          <a class="btn-floating btn-medium waves-effect waves-light blue" v-on:click="storeArt()" v-on:keyup.enter="storeArt()">
            <i class="material-icons">add</i>
          </a>
        </div>
      </div>
      <!-- For Loop Einmaligekosten -->
      <div v-for="(art, index) in art_full" :key='index' track-by="index">
        <div class="row card-panel">
          <!-- Nr -->
          <div class="col l1">
            <p class="center"> {{ index +1 }} </p>
          </div>
          <!-- Art -->
          <div class="col l5">
            <p class="center"> {{ art.art.art }} </p>
          </div>
          <!-- Kosten -->
          <div class="col l4">
            <p class="center"> {{ art.kosten_gesamt }} </p>
          </div>
          <!-- remove button -->
          <div class="col l1">
            <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteArt(index)">
              <i class="material-icons">remove</i>
            </a>
          </div>
        </div>
      </div>
      <!-- Gesammt -->
      <div class="row">
        <div class="col l6"></div>
        <div class="col l2 card-panel blue white-text">
          <p class="right mt-3">Gesamtkosten </p>
        </div>
        <!-- Summe Bearbeitungskosten -->
        <div class="col l2 card-panel">
          <p class="center mt-3">  {{ Gesamtkosten }} CHF </p>
        </div>
      </div>
      <!-- Go a site back -->
      <div class="fixed-action-btn" v-on:click="goTo()">
          <button class="btn right btnnext">
            Weiter
            <i class="material-icons right">arrow_forward_ios</i>
          </button>
      </div>
      <!-- Go a site forward -->
      <div class="fixed-action-btn goleft" v-on:click="goBack()">
          <button class="btn right btnnext">
            <i class="material-icons left">arrow_back_ios</i>
            Zurück
          </button>
      </div>
    </div>
  </v-app>
</template>

<script>
import database from "./db";

export default {
  name: "Einmaligekosten",
  data() {
    return {

    };
},
  methods: {
    goTo() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/` });
    },
    goBack() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/oberflaeche` });
    }
  }
}
</script>

<style>
.goleft {
  margin-right: 87%;
}
</style>
