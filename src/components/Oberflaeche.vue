<template>
  <v-app>
    <div id="Oberflaeche">
      <div class="row card-panel fixed">
        <div class="col l1"></div>
        <!-- Oberflaeche Dropdown -->
        <div class="col l2">
          <p class="center">Oberfläche / Art</p>
          <br />
          <v-select :items="oberflaechen" v-model="oberflaeche" item-text="oberflaeche" solo autocomplete flat></v-select>
        </div>
        <!-- Liferanten -->
        <div class="col l2">
          <p class="center">Lieferant</p>
          <br />
          <v-select :items="liferanten" v-model="liferant" item-text="liferant" solo autocomplete flat></v-select>
        </div>
        <!-- Menge -->
        <div class="col l1">
          <p class="center">Menge</p>
          <br />
          <input type="text" class="center" v-model="menge">
        </div>
        <!-- Einheit -->
        <div class="col l1">
          <p class="center">Einheit</p>
          <br />
          <v-select :items="einheiten" v-model="einheit" item-text="einheit" solo autocomplete flat></v-select>
        </div>
        <!-- Kosten / Einheit -->
        <div class="col l1">
          <p class="center"> Kosten / Einheit</p>
          <input type="text" class="center" v-model="kosten_einheit" v-on:keyup.enter="storeOberflaeche()">
        </div>
        <!-- Kosten Gesammt -->
        <div class="col l2">
          <p class="center">Kosten Gesamt</p>
          <br />
          <p class="center" v-if="(this.menge * this.kosten_einheit) !== 0"> {{this.menge * this.kosten_einheit}} </p>
        </div>
        <!-- + -->
        <div class="col l1">
          <br />
          <br />
          <br />
          <a class="btn-floating btn-medium waves-effect waves-light blue" v-on:click="storeOberflaeche()" v-on:keyup.enter="storeOberflaeche()">
            <i class="material-icons">add</i>
          </a>
        </div>
      </div>
      <!-- For Loop Material_full -->
      <div v-for="(oberflaechen_full, index) in oberflaechen_full" :key='index' track-by="index">
        <div class="row card-panel">
          <!-- Nr -->
          <div class="col l1">
            <p class="center"> {{ index +1 }} </p>
          </div>
          <!-- Material -->
          <div class="col l2">
            <p class="center"> {{ oberflaechen_full.oberflaeche }} </p>
          </div>
          <!-- Liferant -->
          <div class="col l2">
            <p class="center"> {{ oberflaechen_full.liferant }} </p>
          </div>
          <!-- Menge -->
          <div class="col l1">
            <p class="center"> {{ oberflaechen_full.menge }} </p>
          </div>
          <!-- Einheit -->
          <div class="col l1">
            <p class="center"> {{ oberflaechen_full.einheit }} </p>
          </div>
          <!-- Kosten_einheut -->
          <div class="col l1">
            <p class="center"> {{ oberflaechen_full.kosten_einheit }} </p>
          </div>
          <!-- Bearbeitunskosten -->
          <div class="col l2">
            <p class="center"> {{ oberflaechen_full.gesammt_kosten }} </p>
          </div>
          <!-- remove button -->
          <div class="col l1">
            <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteOberflaeche(index)">
              <i class="material-icons">remove</i>
            </a>
          </div>
        </div>
      </div>
      <!-- Gesammt -->
      <div class="row">
        <div class="col l4"></div>
        <div class="col l4 card-panel blue white-text">
          <p class="right mt-3">Oberflächeneinzelkosten / Losgrösse </p>
        </div>
        <!-- Summe Bearbeitungskosten -->
        <div class="col l2 card-panel">
          <p class="center mt-3">  {{ totalOberflaeche }} CHF </p>
        </div>
      </div>
      <div class="fixed-action-btn" v-on:click="goTo()">
          <button class="btn right btnnext">Weiter
            <i class="material-icons right">arrow_forward_ios</i>
          </button>
      </div>
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
//TODO: FIREBASE IMPORT

export default {
  name: "Material",
  data() {
    return {
      oberflaechen_full: [],

      oberflaeche: "",
      oberflaechen: [],

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
    storeOberflaeche: function() {
      if (this.oberflaeche.oberflaeche) {
        this.gesammt_kosten = this.menge * this.kosten_einheit;
        this.oberflaechen_full.push({
          oberflaeche: this.oberflaeche.oberflaeche,
          liferant: this.liferant.liferant,
          menge: this.menge,
          einheit: this.einheit.einheit,
          kosten_einheit: this.kosten_einheit,
          gesammt_kosten: this.gesammt_kosten
        });
      } else {
        nativeToast({
          message: "Ausfüllen!",
          type: "error"
        });
      }
      (this.gesammt_kosten = null),
        (this.oberflaeche = ""),
        (this.liferant = ""),
        (this.menge = null),
        (this.kosten_einheit = null),
        (this.einheit = "");
    },
    deleteOberflaeche: function(id) {
      this.oberflaechen_full.splice(id, 1);
      nativeToast({
        message: "Fertigung gelöscht",
        type: "warning"
      });
    },
    goTo() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/werkzeug` });
    },
    goBack() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/material` });
    }
  },
  computed: {
    totalOberflaeche: function() {
      var total = 0;
      for (var oberflaeche of this.oberflaechen_full) {
        total += oberflaeche.gesammt_kosten;
      }
      return total;
    }
  },
  mounted() {
    var query = FertigungRef;
    query.once("value").then(snapshot => {
      this.einheiten = snapshot.child("einheiten").val();
    });
    query.once("value").then(snapshot => {
      this.oberflaechen = snapshot.child("oberflaechen").val();
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
