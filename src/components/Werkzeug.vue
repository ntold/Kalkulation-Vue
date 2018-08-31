<template>
  <v-app>
    <div id="Werkzeug">
      <div class="row card-panel fixed">
        <div class="col l1"></div>
        <!-- Werkzeug Dropdown -->
        <div class="col l5">
          <p class="center">Werkzeuge / Vorrichtungen</p>
          <br />
          <v-select :items="werkzeuge" v-model="werkzeug" item-text="werkzeug" solo autocomplete flat></v-select>
        </div>
        <!-- Bestellt bei -->
        <!--<div class="col l2">
          <p class="center">Bestellt bei</p>
          <br />
          <v-select :items="liferanten" v-model="liferant" item-text="liferant" solo autocomplete flat></v-select>
        </div>-->
        <!-- Menge -->
        <!--<div class="col l1">
          <p class="center">Menge</p>
          <br />
          <input type="text" class="center" v-model="menge">
        </div>-->
        <!-- Einheit -->
        <!--<div class="col l1">
          <p class="center">Einheit</p>
          <br />
          <v-select :items="einheiten" v-model="einheit" item-text="einheit" solo autocomplete flat></v-select>
        </div>-->
        <!-- Kosten / Gesamt -->
        <div class="col l2">
          <p class="center"> Kosten / Gesamt</p>
          <input type="text" class="center" v-model="kosten_einheit" v-on:keyup.enter="storeWerkzeug()">
        </div>
        <!-- Kosten Gesammt -->
        <div class="col l2">
          <p class="center">Kosten / Los</p>
          <br />
          <p class="center" v-if="(this.menge * this.kosten_einheit) !== 0"> {{this.menge * this.kosten_einheit}} </p>
        </div>
        <!-- Gesammtkosten Tarif -->
        <!--<div class="col l1">
          <p class="center">Gesamtkosten Tarif</p>
          <br />
          <p class="center"> {{ tarifComp }} </p>
        </div>-->
        <!-- + -->
        <div class="col l1">
          <br />
          <br />
          <br />
          <a class="btn-floating btn-medium waves-effect waves-light blue" v-on:click="storeWerkzeug()" v-on:keyup.enter="storeWerkzeug()">
            <i class="material-icons">add</i>
          </a>
        </div>
      </div>
      <!-- For Loop Werkzeug_full -->
      <div v-for="(werkzeug, index) in werkzeuge_full" :key='index' track-by="index">
        <div class="row card-panel">
          <!-- Nr -->
          <div class="col l1">
            <p class="center"> {{ index +1 }} </p>
          </div>
          <!-- Werkzeug -->
          <div class="col l2">
            <p class="center"> {{ werkzeug_full.werkzeug }} </p>
          </div>
          <!-- Liferant -->
          <div class="col l2">
            <p class="center"> {{ werkzeug_full.liferant }} </p>
          </div>
          <!-- Menge -->
          <div class="col l1">
            <p class="center"> {{ werkzeug_full.menge }} </p>
          </div>
          <!-- Einheit -->
          <div class="col l1">
            <p class="center"> {{ werkzeug_full.einheit }} </p>
          </div>
          <!-- Kosten_einheut -->
          <div class="col l1">
            <p class="center"> {{ werkzeug_full.kosten_einheit }} </p>
          </div>
          <!-- Bearbeitunskosten -->
          <div class="col l1">
            <p class="center"> {{ werkzeug_full.gesammt_kosten }} </p>
          </div>
          <!-- Rüstkosten -->
          <div class="col l1">
            <p class="center"> {{ werkzeug_full.tarif }} </p>
          </div>
          <!-- remove button -->
          <div class="col l1">
            <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteWerkzeug(index)">
              <i class="material-icons">remove</i>
            </a>
          </div>
        </div>
      </div>
      <!-- Gesammt -->
      <div class="row">
        <div class="col l4"></div>
        <div class="col l4 card-panel blue white-text">
          <p class="right mt-3">Sondereinzelgrössen / Losgrösse </p>
        </div>
        <!-- Summe Bearbeitungskosten -->
        <div class="col l2 card-panel">
          <p class="center mt-3">  CHF </p>
        </div>
      </div>
      <!-- Total Fertigungslohnkosten / Stück -->
      <div class="row">

      </div>
      <div class="fixed-action-btn">
        <router-link to="/">
          <button class="btn right btnnext">Weiter
            <i class="material-icons right">arrow_forward_ios</i>
          </button>
        </router-link>
      </div>
      <div class="fixed-action-btn goleft">
        <router-link to="/material">
          <button class="btn right btnnext">
            <i class="material-icons left">arrow_back_ios</i>
            Zurück
          </button>
        </router-link>
      </div>
    </div>
  </v-app>
</template>

<script>
import Firebase from "firebase";

const database = firebase.database();
const FertigungRef = database.ref("fertigungen");

export default {
  name: "Werkzeug",
  data() {
    return {
      werkzeuge_full: [],

      werkzeug: "",
      werkzeuge: [],

      einheit: "",
      einheiten: [],

      liferant: "",
      liferanten: [],

      menge: null,

      kosten_einheit: null,

      gesammt_kosten: null
    };
  },
  methods: {
    storeWerkzeug: function() {
      if (this.werkzeug.werkzeug) {
        this.getTarif();
        this.gesammt_kosten = this.menge * this.kosten_einheit;
        this.werkzeuge_full.push({
          werkzeug: this.werkzeug.werkzeug,
          liferant: this.liferant.liferant,
          menge: this.menge,
          einheit: this.einheit.einheit,
          kosten_einheit: this.kosten_einheit,
          gesammt_kosten: this.gesammt_kosten,
          tarif: this.tarif
        });
      } else {
        nativeToast({
          message: "Ausfüllen!",
          type: "error"
        });
      }
      (this.gesammt_kosten = null),
        (this.werkzeug = ""),
        (this.liferant = ""),
        (this.menge = null),
        (this.kosten_einheit = null),
        (this.einheit = "");
      this.tarif = null;
    },
    deleteWerkzeug: function(id) {
      this.werkzeuge_full.splice(id, 1);
      nativeToast({
        message: "Fertigung gelöscht",
        type: "warning"
      });
    },
    getTarif: function() {
      if (this.menge <= 99 && this.menge != null) {
        this.tarif = 15;
        return this.tarif;
      } else if (this.menge >= 100 && this.menge <= 199) {
        this.tarif = 25;
        return this.tarif;
      } else if (this.menge >= 200 && this.menge <= 499) {
        this.tarif = 50;
        return this.tarif;
      } else if (this.menge >= 500 && this.menge <= 999) {
        this.tarif = 75;
        return this.tarif;
      } else if (this.menge >= 1000 && this.menge <= 1999) {
        this.tarif = 100;
        return this.tarif;
      } else if (this.menge >= 2000 && this.menge <= 4999) {
        this.tarif = 200;
        return this.tarif;
      } else if (this.menge >= 5000 && this.menge <= 1000000) {
        this.tarif = 400;
        return this.tarif;
      }
    }
  },
  computed: {
    tarifComp: function() {
      if (this.menge <= 99 && this.menge != null) {
        this.tarif = 15;
        return this.tarif;
      } else if (this.menge >= 100 && this.menge <= 199) {
        this.tarif = 25;
        return this.tarif;
      } else if (this.menge >= 200 && this.menge <= 499) {
        this.tarif = 50;
        return this.tarif;
      } else if (this.menge >= 500 && this.menge <= 999) {
        this.tarif = 75;
        return this.tarif;
      } else if (this.menge >= 1000 && this.menge <= 1999) {
        this.tarif = 100;
        return this.tarif;
      } else if (this.menge >= 2000 && this.menge <= 4999) {
        this.tarif = 200;
        return this.tarif;
      } else if (this.menge >= 5000 && this.menge <= 1000000) {
        this.tarif = 400;
        return this.tarif;
      }
    }
  },
  mounted() {
    var query = FertigungRef;
    query.once("value").then(snapshot => {
      this.einheiten = snapshot.child("einheiten").val();
    });
    query.once("value").then(snapshot => {
      this.werkzeuge = snapshot.child("werkzeuge").val();
    });
    query.once("value").then(snapshot => {
      this.liferanten = snapshot.child("liferanten").val();
    });
  }
};
</script>

<style>
.goleft {
  margin-right: 87%;
}
</style>
