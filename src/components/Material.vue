<template>
  <v-app>
    <div id="Material" class="nav-margin">
      <div class="row card-panel fixed">
        <div class="col l1"></div>
        <!-- Material Dropdown -->
        <div class="col l2">
          <p class="center">Material</p>
          <br />
          <v-select :items="materialien" v-model="material" item-text="material" solo autocomplete flat></v-select>
        </div>
        <!-- Bestellt bei -->
        <div class="col l2">
          <p class="center">Bestellt bei</p>
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
          <br />
          <input type="text" class="center" v-model="kosten_einheit" v-on:keyup.enter="storeMaterial()">
        </div>
        <!-- Kosten Gesammt -->
        <div class="col l1">
          <p class="center">Kosten Gesamt</p>
          <br />
          <p class="center" v-if="(this.menge * this.kosten_einheit) !== 0"> {{this.menge * this.kosten_einheit}} </p>
        </div>
        <!-- Gesammtkosten Tarif -->
        <div class="col l1">
          <p class="center">Gesamtkosten Tarif</p>
          <br />
          <p class="center"> {{ tarifComp }} </p>
        </div>
        <!-- + -->
        <div class="col l1">
          <br />
          <br />
          <br />
          <a class="btn-floating btn-medium waves-effect waves-light blueTFB" v-on:click="storeMaterial()" v-on:keyup.enter="storeMaterial()">
            <i class="material-icons">add</i>
          </a>
        </div>
      </div>
      <!-- For Loop Material_full -->
      <div v-for="(material_full, index) in materialien_full" :key='index' track-by="index">
        <div class="row card-panel">
          <!-- Nr -->
          <div class="col l1">
            <p class="center"> {{ index +1 }} </p>
          </div>
          <!-- Material -->
          <div class="col l2">
            <p class="center"> {{ material_full.material }} </p>
          </div>
          <!-- Liferant -->
          <div class="col l2">
            <p class="center"> {{ material_full.liferant }} </p>
          </div>
          <!-- Menge -->
          <div class="col l1">
            <p class="center"> {{ material_full.menge }} </p>
          </div>
          <!-- Einheit -->
          <div class="col l1">
            <p class="center"> {{ material_full.einheit }} </p>
          </div>
          <!-- Kosten_einheut -->
          <div class="col l1">
            <p class="center"> {{ material_full.kosten_einheit }} </p>
          </div>
          <!-- Bearbeitunskosten -->
          <div class="col l1">
            <p class="center"> {{ material_full.gesammt_kosten }} </p>
          </div>
          <!-- Rüstkosten -->
          <div class="col l1">
            <p class="center"> {{ material_full.tarif }} </p>
          </div>
          <!-- remove button -->
          <div class="col l1">
            <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteMaterial(material_full)">
              <i class="material-icons">remove</i>
            </a>
          </div>
        </div>
      </div>
      <!-- Gesammt -->
      <div class="row">
        <div class="col l4"></div>
        <div class="col l4 card-panel blueTFB white-text">
          <p class="right mt-3">Materialeinzelkosten / Losgrösse </p>
        </div>
        <!-- Summe Bearbeitungskosten -->
        <div class="col l2 card-panel">
          <p class="center mt-3">  {{ materialEinzel }} CHF </p>
        </div>
      </div>
      <!-- Total Fertigungslohnkosten / Stück -->
      <div class="row">
        <div class="col l4"></div>
        <div class="col l4 card-panel blueTFB white-text mb-3">
          <p class="right mt-3">Materialgemeinkosten / Losgrösse</p> 
        </div>
        <!-- Summe Bearbeitungskosten -->
        <div class="col l2 card-panel">
          <p class="center mt-3">  {{ materialGesamt }} CHF </p>
        </div>
      </div>
    <div class="fixed-action-btn" v-on:click="goOberflaeche()">
        <button class="btn right btnnext">Weiter
          <i class="material-icons right">arrow_forward_ios</i>
        </button>
    </div>
      <div class="fixed-action-btn goleft" v-on:click="goFertigung()">
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
  name: "Material",
  data() {
    return {
      materialien_full: [],

      material: "",
      materialien: [],

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
    storeMaterial: function() {
      if (this.material.material) {
        this.getTarif();
        this.gesammt_kosten = this.menge * this.kosten_einheit;
        this.$parent.MaterialRef.push({
          material: this.material.material,
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
        (this.material = ""),
        (this.liferant = ""),
        (this.menge = null),
        (this.kosten_einheit = null),
        (this.einheit = "");
      this.tarif = null;
    },
    deleteMaterial(material) {
      this.$parent.MaterialRef.child(material.id).remove();
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
    },
    goOberflaeche() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Oberflaeche");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/oberflaeche` });
    },
    goFertigung() {
      const key = `${this.$route.params.id}`;
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      var clicked = document.getElementById("Fertigung");
      clicked.className += " active";
      this.$router.push({ path: `/edit/${key}/fertigung` });
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
    },
    materialEinzel: function() {
      var total = 0;
      for (var material of this.materialien_full) {
        total += material.gesammt_kosten;
      }
      return total;
    },
    materialGesamt: function() {
      var total = 0;
      for (var material of this.materialien_full) {
        total += material.tarif;
      }
      return total;
    }
  },
  created() {
    this.$parent.MaterialRef.on("child_added", snapshot => {
      this.materialien_full.push({
        ...snapshot.val(),
        id: snapshot.key
      });
    });
    this.$parent.MaterialRef.on("child_removed", snapshot => {
      const deletedMaterial = this.materialien_full.find(
        material => material.id === snapshot.key
      );
      const index = this.materialien_full.indexOf(deletedMaterial);
      this.materialien_full.splice(index, 1);
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
      this.materialien = snapshot.child("materialien").val();
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
