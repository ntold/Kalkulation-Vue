<template>
  <v-app>
    <div id="Werkzeug" class="nav-margin">
      <div class="row card-panel fixed">
        <div class="col l1"></div>
        <!-- Werkzeug Dropdown -->
        <div class="col l5">
          <p class="center">Werkzeuge / Vorrichtungen</p>
          <v-select :items="werkzeuge" v-model="werkzeug" item-text="werkzeug" solo flat autocomplete></v-select>
        </div>
        <!-- Kosten / Gesamt -->
        <div class="col l2">
          <p class="center"> Kosten / Gesamt</p>
          <input type="text" class="center" v-model="kosten_gesamt" v-on:keyup.enter="storeWerkzeug()">
        </div>
        <!-- Kosten Gesammt -->
        <div class="col l2">
          <p class="center">Kosten / Los</p>
          <br />
          <p class="center"> {{ this.kosten_gesamt }} </p>
        </div>
        <!-- + -->
        <div class="col l1">
          <br />
          <br />
          <br />
          <a class="btn-floating btn-medium waves-effect waves-light blueTFB" v-on:click="storeWerkzeug()" v-on:keyup.enter="storeWerkzeug()">
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
          <div class="col l5">
            <p class="center"> {{ werkzeug.werkzeug.werkzeug }} </p>
          </div>
          <!-- Liferant -->
          <div class="col l2">
            <p class="center"> {{ werkzeug.kosten_gesamt }} </p>
          </div>
          <!-- Menge -->
          <div class="col l2">
            <p class="center"> {{ werkzeug.kosten_gesamt }} </p>
          </div>
          <!-- remove button -->
          <div class="col l1">
            <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteWerkzeug(werkzeug)">
              <i class="material-icons">remove</i>
            </a>
          </div>
        </div>
      </div>
      <!-- Gesammt -->
      <div class="row">
        <div class="col l4"></div>
        <div class="col l4 card-panel blueTFB white-text">
          <p class="right mt-3">Sondereinzelgrössen / Losgrösse </p>
        </div>
        <!-- Summe Bearbeitungskosten -->
        <div class="col l2 card-panel">
          <p class="center mt-3">  {{ Sondereinzelgrössen }} CHF </p>
        </div>
      </div>
      <div class="fixed-action-btn" v-on:click="goEinmaligekosten()">
          <button class="btn right btnnext">Weiter
            <i class="material-icons right">arrow_forward_ios</i>
          </button>
      </div>
      <div class="fixed-action-btn goleft" v-on:click="goOberflaeche()">
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
  name: "Werkzeug",
  data() {
    return {
      werkzeuge_full: [],

      werkzeug: "",
      werkzeuge: [],

      kosten_gesamt: null
    };
  },
  methods: {
    storeWerkzeug: function() {
      if (this.werkzeug) {
        this.$parent.WerkzeugRef.push({
          werkzeug: this.werkzeug,
          kosten_gesamt: this.kosten_gesamt
        });
      } else {
        nativeToast({
          message: "Ausfüllen!",
          type: "error"
        });
      }
      (this.werkzeug = ""), (this.kosten_gesamt = null);
    },
    deleteWerkzeug: function(werkzeug) {
      this.$parent.WerkzeugRef.child(werkzeug.id).remove();
    },
    goEinmaligekosten() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Einmaligekosten");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/einmaligekosten` });
    },
    goOberflaeche() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Oberflaeche");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/oberflaeche` });
    }
  },
  computed: {
    Sondereinzelgrössen: function() {
      var total = 0;
      for (var werkzeug of this.werkzeuge_full) {
        total -= werkzeug.kosten_gesamt;
      }
      return total * -1;
    }
  },
  created() {
    this.$parent.WerkzeugRef.on("child_added", snapshot => {
      this.werkzeuge_full.push({
        ...snapshot.val(),
        id: snapshot.key
      });
    });
    this.$parent.WerkzeugRef.on("child_removed", snapshot => {
      const deletedWerkzeug = this.werkzeuge_full.find(
        werkzeug => werkzeug.id === snapshot.key
      );
      const index = this.werkzeuge_full.indexOf(deletedWerkzeug);
      this.werkzeuge_full.splice(index, 1);
      nativeToast({
        message: `Fertigung gelöscht`,
        type: "warning"
      });
    });
  },
  mounted() {
    var query = this.$parent.DatabaseRef;
    query.once("value").then(snapshot => {
      this.einheiten = snapshot.child("einheiten").val();
      this.liferanten = snapshot.child("liferanten").val();
      this.werkzeuge = snapshot.child("werkzeuge").val();
    });
  }
};
</script>

<style>
.goleft {
  margin-right: 87%;
}
</style>
