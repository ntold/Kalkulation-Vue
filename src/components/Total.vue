<template>
  <v-app>
    <div class="content">
      <div class="content-wrap">
        <div class="total-title">
          <!-- Title -->
          <div class="title-head">Bezeichnung</div>
          <div class="title-head">Zeichen Nr.</div>
          <div class="title-head">Losgrösse</div>
          <div class="title-head">Datum</div>
          <div class="title-head">Visum</div>
          <!-- Values -->

          <div class="title-item">{{bezeichnung}}</div>
          <div class="title-item">{{zeichenNr}}</div>
          <div class="title-item">{{losgroesse}}</div>
          <div class="title-item">{{datum}}</div>
          <div class="title-item">{{visum}}</div>

        </div>
        <div class="content-page">
          <div>
            <!-- Title -->
            <div>Fertigungslohnkosten</div>
            <div>Fertigungsgemeinkosten ( 10% )</div>
            <div><b>Fertigungskosten</b></div>
          </div>
          <div>
            <!-- Values -->
            <div class="content-page-value">{{ totalLKosten }} SFr. </div>
            <div class="content-page-value">{{ totalLKosten * 0.1 }} SFr. </div>
            <div class="content-page-value">&ensp;</div>
          </div>

          <!-- Values -->
          <div>
            <div class="content-page-value">&ensp;</div>
            <div class="content-page-value">&ensp;</div>
            <div class="content-page-value"><b>{{totalLKosten + totalLKosten * 0.1}} SFr. </b></div>
          </div>

          <div>
            <div class="content-page-value">&ensp;</div>
            <div class="content-page-value">&ensp;</div>
            <div class="content-page-value">&ensp;</div>
          </div>


          <div>
            <!-- Title -->
            <div>Materialeinzelkosten</div>
            <div>Materialgemeinkosten</div>
            <div class=""><b>Materialkosten</b></div>
          </div>

          <div>
            <!-- Values -->
            <div class="content-page-value"> {{materialEinzel}} SFr. </div>
            <div class="content-page-value"> {{materialGesamt}} SFr. </div>
            <div class="content-page-value ">&ensp;</div>
          </div>

          <div>
            <div class="content-page-value">&ensp;</div>
            <div class="content-page-value">&ensp;</div>
            <div class="content-page-value "> <b>{{materialEinzel + materialGesamt}} SFr. </b></div>
          </div>

          <div>
            <div class="content-page-value">&ensp;</div>
            <div class="content-page-value">&ensp;</div>
            <div class="content-page-value ">&ensp;</div>
          </div>

          <!-- Title -->
          <div class=""><b>Sondereinzelkosten</b></div>
          <!-- Values -->
          <div class="content-page-value ">&ensp;</div>
          <div class="content-page-value "><b>{{sonderEinzelKosten}} SFr. </b></div>
          <div class="content-page-value ">&ensp;</div>

          <!-- Title -->
          <div class=""><b>Herstellungskosten</b></div>
          <!-- Values -->
          <div class="content-page-value ">&ensp;</div>
          <div class="content-page-value "><b>{{ (totalLKosten + totalLKosten * 0.1) + (materialEinzel +
              materialGesamt) +sonderEinzelKosten }} SFr. </b></div>
          <div class="content-page-value "><b>{{ (totalLKosten + totalLKosten * 0.1) + (materialEinzel +
              materialGesamt) +sonderEinzelKosten }} SFr. </b></div>

          <!-- Title -->
          <div class=""><b>VVGK ( 5% v. HK )</b></div>
          <!-- Values -->
          <div class="content-page-value ">&ensp;</div>
          <div class="content-page-value ">&ensp;</div>
          <div class="content-page-value "><b>{{ ((totalLKosten + totalLKosten * 0.1) + (materialEinzel +
              materialGesamt) +sonderEinzelKosten) * 0.05 }} SFr. </b></div>

          <!-- Title -->
          <div><b>Selbstkosten</b></div>
          <!-- Values -->
          <div class="content-page-value">&ensp;</div>
          <div class="content-page-value">&ensp;</div>
          <div class="content-page-value"><b>{{ ((totalLKosten + totalLKosten * 0.1) + (materialEinzel +
              materialGesamt) +sonderEinzelKosten) + (((totalLKosten + totalLKosten * 0.1) + (materialEinzel +
              materialGesamt) +sonderEinzelKosten) * 0.05)}} SFr. </b></div>
        </div>
      </div>
      <div class="fixed-action-btn" v-on:click="print()">
        <button class="btn right btnnext">Drucken
          <i class="material-icons right">print</i>
        </button>
      </div>
      <div class="fixed-action-btn goleft" v-on:click="goBack()">
        <button class="btn left btnnext">
          <i class="material-icons left">arrow_back_ios</i>
          Zurück
        </button>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fertigungen: {},
      materialien: {},
      werkzeuge: {},
      oberflaechen: {},

      bezeichnung: "",
      zeichenNr: "",
      losgroesse: "1",
      datum: "",
      visum: ""
    };
  },
  methods: {
    print() {
      window.print();
    },
    goBack() {
      const key = `${this.$route.params.id}`;
      this.$router.push({
        path: `/edit/${key}/einmaligekosten`
      });
    }
  },
  mounted() {
    var query = this.$parent.totalFertigung;
    query.once("value").then(snapshot => {
      this.fertigungen = snapshot.child("fertigung").val();
      this.materialien = snapshot.child("material").val();
      this.werkzeuge = snapshot.child("werkzeug").val();
      this.oberflaechen = snapshot.child("oberflaeche").val();
      this.bezeichnung = snapshot.child("beschreibung").val();
      this.zeichenNr = snapshot.child("zeichenNr").val();
      this.datum = snapshot.child("datum").val();
      this.visum = snapshot.child("visum").val();
    });
  },
  computed: {
    totalLKosten: function() {
      var total = 0;
      for (var fertigung of Object.values(this.fertigungen)) {
        total += fertigung.rüstkosten;
        total += fertigung.bearbeitungskosten;
      }
      return total + this.totalOberflaeche;
    },
    materialEinzel: function() {
      var total = 0;

      for (var material of Object.values(this.materialien)) {
        total += material.gesammt_kosten;
      }
      return total;
    },
    materialGesamt: function() {
      var total = 0;
      for (var material of Object.values(this.materialien)) {
        total += material.tarif;
      }
      return total;
    },
    sonderEinzelKosten: function() {
      var total = 0;
      for (var werkzeug of Object.values(this.werkzeuge)) {
        total -= werkzeug.kosten_gesamt;
      }
      return total * -1;
    },
    totalOberflaeche: function() {
      var total = 0;
      for (var oberflaeche of Object.values(this.oberflaechen)) {
        total += oberflaeche.kosten_gesamt;
      }
      return total;
    }
  }
};
</script>

<style>
@media screen {
  .content {
    margin-top: 100px;
  }

  .content-wrap {
    height: 100%;
    width: 60%;
    margin: auto;
  }

  .total-title {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .title-head {
    font-weight: bold;
  }

  .content-page {
    width: 80%;
    margin: auto;
    margin-top: 50px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 30px;
  }

  .content-page-value {
    text-align: right;
  }

  .goleft {
    margin-right: 87%;
  }
}

@media print {
  .content {
    overflow: auto;
    margin-top: 20px;
  }

  .content-wrap {
    height: 100%;
    width: 75%;
    margin: auto;
  }

  .total-title {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .title-head {
    font-weight: bold;
  }

  .content-page {
    width: 100%;
    margin: auto;
    margin-top: 50px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 30px;
    grid-column-gap: 30px;
  }

  .fixed-action-btn {
    visibility: hidden;
  }

  .navigation-wrapper {
    visibility: hidden;
  }
}
</style>
