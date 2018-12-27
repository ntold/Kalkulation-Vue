<template>
    <v-app> 
        <div class="container">
            <div class="Chart__list">
            <div class="Chart">
                <h2>Selbstkosten </h2>
                <line-chart 
                  :slider=slider
                  :fertigungen=fertigungen
                  :materialien=materialien
                  :oberflaechen=oberflaechen
                  :werkzeuge=werkzeuge
                ></line-chart>
            </div>
                <v-slider
                    v-model="slider"
                ></v-slider>
            </div>
        </div>
    </v-app>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  data() {
    return {
      slider: 20,

      fertigungen: {},
      materialien: {},
      werkzeuge: {},
      oberflaechen: {}
    };
  },
  components: {
    LineChart
  },
  methods: {},
  mounted() {
    var query = this.$parent.totalFertigung;
    query.once("value").then(snapshot => {
      this.fertigungen = snapshot.child("fertigung").val();
      this.materialien = snapshot.child("material").val();
      this.werkzeuge = snapshot.child("werkzeug").val();
      this.oberflaechen = snapshot.child("oberflaeche").val();
    });
  }
};
</script>

<style>
.container {
  max-width: 800px;
  margin-top: 200px;
}
.Chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin: 25px 0;
}
.Chart h2 {
  margin-top: 0;
  text-align: center;
  padding: 15px 0;
  color: white;
  border-bottom: 1px solid #323d54;
}
</style>