<template>
<v-app>
<div id="kalkulation1">
  <!-- <div class="row card-panel fixed"> 
    <div class="col l1"></div>
    <div class="col l4" >
      <input type="text" v-model="bezeichnung" class="center" placeholder="Bezeichnung">  
    </div>
    <div class="col l1">
      <input type="text" v-model="zeichenNr" class="center" placeholder="Zeichen Nr.">
    </div>
    <div class="col l1">
      <input type="text" v-model="losgrösse" class="center" placeholder="Losgrösse">
    </div>
    <div class="col l1">
      <input type="text" v-model="date" class="datepicker" placeholder="Datum">
    </div>
    <div class="col l3">  
      <v-select :items="visa" v-model="visum" item-text="name" placeholder="Visum" solo autocomplete flat></v-select>
    </div>
      <div class="col l1"></div>
  </div> -->
  <div class="row card-panel mt-3">
    <div class="center col l1"></div>
      <!-- Kostenstelle -->
      <div class="col l2">
        <p class="center">Kostenstelle</p>
        <v-select
          :items="kostenstellen"
          v-model="kostenstelle"
          item-text="kostenstelle"
          solo
          autocomplete
          flat
        ></v-select>
      </div>
      <!-- Operation -->
      <div class="input-filed col l2">
        <p class="center">Operation</p>
        <input type="text" v-model="operation" class="center">  
      </div>
      <!-- ta tr -->
      <div class="input-filed col l1">
        <p class="center ta" @mouseover="activeTa = true" @mouseleave="activeTa = false" > ta </p>
        <div v-show="activeTa" class="hoverinfo card-panel"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi excepturi adipisci nesciunt molestias debitis sequi quasi possimus. Pariatur, voluptatum. Saepe. </div>
        <input type="text" class="center" v-model="ta" v-on:keyup.enter="storeFertigung()">  
      </div>
      <div class="input-filed col l1">
        <p class="center tr" @mouseover="activeTr = true" @mouseleave="activeTr = false" > tr </p>
        <div v-show="activeTr" class="hoverinfo card-panel"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi excepturi adipisci nesciunt molestias debitis sequi quasi possimus. Pariatur, voluptatum. Saepe. </div>
        <input type="text" class="center" v-model="tr" v-on:keyup.enter="storeFertigung()"> 
      </div>
      <!-- Kostensatz -->
      <div class="col l1">
        <p class="center"> Kostensatz <br>  Fr / Std  </p>
        <!-- <p class="center"> {{ this.kostenstelle.ansatz }} </p> -->
      </div>
      <div class="col l1">
        <p class="center"> Bearbeitungskosten <br> Losgrösse </p>
        <p class="center">  </p>
      </div>
      <div class="col l1">
        <p class="center"> Rüstkosten <br> Losgrösse </p>
        <p class="center">  </p>
      </div>
      <!-- + -->
      <div class="col l1">
        <br>
        <a class="btn-floating btn-medium waves-effect waves-light blue" v-on:click="storeFertigung()" v-on:keyup.enter="storeFertigung()"><i class="material-icons">add</i></a>
      </div>
    </div>

  <div v-for="(fertigung, index) in fertigungen" :key='index' track-by="index">
      <div class="row card-panel">
        <!-- Nr -->
        <div class="col l1">
          <p class="center"> {{ index +1 }} </p>
        </div>
        <!-- Kostenstelle -->
        <div class="col l2">
          <p class="center"> {{ fertigung.kostenstelle }} </p>
        </div>
        <!-- Operation -->
        <div class="col l2">
          <p class="center"> {{ fertigung.operation }} </p>
        </div>
        <!-- ta -->
        <div class="col l1">
          <p class="center" v-if="fertigung.ta !== ''"> {{ fertigung.ta * losgrösse }} Std.</p>
        </div>
        <!-- tr -->
        <div class="col l1">
          <p class="center" v-if="fertigung.tr !== ''"> {{ fertigung.tr }} Std.</p>
        </div>
        <!-- Ansatz -->
        <div class="col l1"> 
          <p class="center"> {{ fertigung.ansatz }} CHF </p>
        </div>
        <!-- Bearbeitunskosten -->
        <div class="col l1">
          <p class="center" v-if="fertigung.bearbeitungskosten !== 0"> {{ fertigung.bearbeitungskosten }} CHF </p>
        </div>
        <!-- Rüstkosten -->
        <div class="col l1">
          <p class="center" v-if="fertigung.rüstkosten !== 0"> {{ fertigung.rüstkosten }} CHF </p>
        </div>
        <!-- remove button -->
        <div class="col l1">
          <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteFertigung(fertigung)" ><i class="material-icons">remove</i></a>
        </div>
      </div>
    </div>
    <!-- Sums -->
    <div class="row mt-3"> 
      <div class="col l7"></div>
      <div class="col l1 card-panel blue white-text" >
        <p class="center mt-3"> Summe </p>
      </div>
      <!-- Summe Bearbeitungskosten -->
      <div class="col l1 card-panel">
        <p class="center mt-3"> {{ sumBKosten }} CHF </p>
      </div>
      <!-- Summe Rüstkosten -->
      <div class="col l1 card-panel">
        <p class="center mt-3"> {{ sumRKosten }} CHF </p>
      </div>
    </div>
    <!-- Total Fertigungslohnkosten / Losgrösse -->
    <div class="row"> 
      <div class="col l4"></div>
      <div class="col l4 card-panel blue white-text" >
        <p class="right mt-3"> Fertigungslohnkosten / Losgrösse (Bearbeitungs- und Rüstkosten) Total	</p>
      </div>
      <!-- Summe Bearbeitungskosten -->
      <div class="col l2 card-panel">
        <p class="center mt-3"> {{ totalLKosten }} CHF </p>
      </div>
    </div>
    <!-- Total Fertigungslohnkosten / Stück -->
    <div class="row"> 
      <div class="col l4"></div>
      <div class="col l4 card-panel blue white-text mb-3" >
        <p class="right mt-3"> Fertigungslohnkosten / Stück Total</p>
      </div>
      <!-- Summe Bearbeitungskosten -->
      <div class="col l2 card-panel">
        <p class="center mt-3"> {{ totalSKosten }} CHF </p>
      </div>
    </div>

    <div class="fixed-action-btn" v-on:click="goTo()">
        <button class="btn right btnnext">Weiter
          <i class="material-icons right">arrow_forward_ios</i>
        </button>
    </div>
</div>
</v-app>
</template>

<script>
import database from "./db";

// DatabaseRef.on("value", gotData, errData);

// function gotData(data) {
//   console.log("Data is arrived!");
// }

// function errData(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// }

export default {
  name: "kalkulation1",
  data() {
    return {
      activeTa: false,
      activeTr: false,

      fertigungen: [],
      summe: "",

      kostenstelle: "",
      kostenstellen: [],

      visum: "",
      visa: [],

      bezeichnung: "",
      losgrösse: 1, // TODO: If Losgrösse = '' set to 1
      zeichenNr: "",
      date: "",
      visum: "",

      operation: "",
      ta: "",
      tr: "",

      kostensatz: "",
      bearbeitungskosten: 0,
      rüstkosten: 0
    };
  },
  methods: {
    storeFertigung: function() {
      if (this.kostenstelle && this.losgrösse) {
        this.bearbeitungskosten = this.kostenstelle.ansatz * this.ta;
        this.rüstkosten = this.kostenstelle.ansatz * this.tr;
        this.$parent.KalkulationRef.push({
          kostenstelle: this.kostenstelle.kostenstelle,
          operation: this.operation,
          ta: this.ta,
          tr: this.tr,
          ansatz: this.kostenstelle.ansatz,
          bearbeitungskosten: this.bearbeitungskosten,
          rüstkosten: this.rüstkosten
        });
        (this.kostenstelle = ""), (this.operation = "");
        (this.ta = ""), (this.tr = "");
      } else {
        nativeToast({
          message: "Ausfüllen!",
          type: "error"
        });
      }
    },
    deleteFertigung(fertigung) {
      this.$parent.KalkulationRef.child(fertigung.id).remove();
    },
    goTo() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/material` });
    }
  },
  computed: {
    sumBKosten: function() {
      var sum = 0;
      for (var fertigung of this.fertigungen) {
        sum += fertigung.bearbeitungskosten * this.losgrösse;
      }
      return sum;
    },
    sumRKosten: function() {
      var sum = 0;
      for (var fertigung of this.fertigungen) {
        sum += fertigung.rüstkosten;
      }
      return sum;
    },
    totalLKosten: function() {
      var total = 0;
      for (var fertigung of this.fertigungen) {
        total += fertigung.rüstkosten;
        total += fertigung.bearbeitungskosten * this.losgrösse;
      }
      return total;
    },
    totalSKosten: function() {
      var total = 0;
      var rb = 0;
      for (var fertigung of this.fertigungen) {
        rb += fertigung.rüstkosten;
        rb += fertigung.bearbeitungskosten * this.losgrösse;
        total = rb / this.losgrösse;
      }
      return total;
    }
  },
  mounted() {
    this.$parent.KalkulationRef.on("child_added", snapshot => {
      this.fertigungen.push({ ...snapshot.val(), id: snapshot.key });
    });
    this.$parent.KalkulationRef.on("child_removed", snapshot => {
      const deletedFertigung = this.fertigungen.find(
        fertigung => fertigung.id === snapshot.key
      );
      const index = this.fertigungen.indexOf(deletedFertigung);
      this.fertigungen.splice(index, 1);
      nativeToast({
        message: `Fertigung gelöscht`,
        type: "warning"
      });
    });
    var query = this.$parent.DatabaseRef;
    query.once("value").then(snapshot => {
      this.kostenstellen = snapshot.child("kostenstellen").val();
    });
    query.once("value").then(snapshot => {
      this.visa = snapshot.child("visum").val();
    });
  }
};
</script>

<style>
.row {
  margin-bottom: 0px;
}

.hoverinfo {
  z-index: 2;
  position: absolute;
  width: 200px;
}

.btnnext {
  margin-right: 4.3%;
}
</style>