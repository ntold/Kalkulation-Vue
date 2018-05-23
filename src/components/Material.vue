<template>
  <v-app>
    <div id="Material">
      <div class="row card-panel fixed">
        <div class="col l1"></div>
        <!-- Material Dropdown -->
        <div class="col l2">
          <p class="center">Material</p> <br />
          <v-select
            :items="materialien"
            v-model="material"
            item-text="material"
            solo
            autocomplete
            flat
          ></v-select>
        </div>
        <!-- Bestellt bei -->
        <div class="col l2">
          <p class="center">Bestellt bei</p> <br />
          <v-select
            :items="liferanten"
            v-model="liferant"
            item-text="liferant"
            solo
            autocomplete
            flat
          ></v-select>
        </div>
        <!-- Menge -->
        <div class="col l1">
          <p class="center">Menge</p> <br />
          <input type="text" class="center" v-model="menge"> 
        </div>
        <!-- Einheit -->
        <div class="col l1">
          <p class="center">Einheit</p> <br />
            <v-select
            :items="einheiten"
            v-model="einheit"
            item-text="einheit"
            solo
            autocomplete
            flat
          ></v-select>
        </div>
        <!-- Kosten / Einheit -->
        <div class="col l1">
          <p class="center"> Kosten / Einheit</p>
          <input type="text" class="center" v-model="kosten_einheit"> 
        </div>
        <!-- Kosten Gesammt -->
        <div class="col l1">
          <p class="center">Kosten Gesammt</p> <br />
          <p class="center"> 12 </p>
        </div>
        <!-- Gesammtkosten Tarif -->
        <div class="col l1">
          <p class="center">Gesammtkosten Tarif</p> <br />
          <p class="center"> 12 </p>
        </div>
        <!-- + -->
        <div class="col l1">
          <br /> <br /> <br />
          <a class="btn-floating btn-medium waves-effect waves-light blue" v-on:click="storeMessage()" v-on:keyup.enter="storeMessage()"><i class="material-icons">add</i></a>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import Firebase from "firebase";

const database = firebase.database();
const FertigungRef = database.ref("fertigungen");

FertigungRef.on("value", gotData, errData);

function gotData(data) {
  console.log("Data is angekommen!");
}

function errData(errorObject) {
  console.log("The read failed: " + errorObject.code);
}

export default {
  name: "Material",
  data() {
    return {
      material: "",
      materialien: [],

      einheit: "",
      einheiten: [],

      liferant: "",
      liferanten: [],

      menge: "",

      kosten_einheit: ""
    };
  },
  mounted() {
    var query = FertigungRef;
    query.once("value").then(snapshot => {
      this.einheiten = snapshot.child("einheiten").val();
    });
  }
};
</script>

<style>
</style>
