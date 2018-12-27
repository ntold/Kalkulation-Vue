import {
  Line
} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    slider: Number,
    fertigungen: Object,
    materialien: Object,
    oberflaechen: Object,
    werkzeuge: Object
  },
  data() {
    return {
      gradient: null,
      losgrösse: 10,
    }
  },
  methods: {
    renderMyChart: function () {
      this.renderChart({
        labels: this.sliderFunction,
        datasets: [{
          label: 'Selbstkosten pro Losgrösse',
          backgroundColor: this.gradient,
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderColor: '#40a1c7',
          borderWidth: 1,
          data: [this.totalLKosten, this.materialEinzel]
        }, ]
      }, {
        responsive: true,
        maintainAspectRatio: false
      })
    },
  },
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 460)

    this.gradient.addColorStop(0, 'rgba(0, 80, 130, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(0, 80, 130, 0.35)');
    this.gradient.addColorStop(1, 'rgba(0, 80, 130, 0)')

    this.renderMyChart();

  },
  computed: {
    sliderFunction: function () {
      var arr = [];
      for (var i = 0; i < this.slider + 1; i++) {
        arr.push(i);
      }
      return arr;
    },
    totalLKosten: function () {
      var total = 0;
      for (var fertigung of Object.values(this.fertigungen)) {
        total += fertigung.rüstkosten;
        total += fertigung.bearbeitungskosten;
      }
      return total + this.totalOberflaeche;
    },
    materialEinzel: function () {
      var total = 0;

      for (var material of Object.values(this.materialien)) {
        total += material.gesammt_kosten;
      }
      return total;
    },
    materialGesamt: function () {
      var total = 0;
      for (var material of Object.values(this.materialien)) {
        total += material.tarif;
      }
      return total;
    },
    sonderEinzelKosten: function () {
      var total = 0;
      for (var werkzeug of Object.values(this.werkzeuge)) {
        total -= werkzeug.kosten_gesamt;
      }
      return total * -1;
    },
    totalOberflaeche: function () {
      var total = 0;
      for (var oberflaeche of Object.values(this.oberflaechen)) {
        total += oberflaeche.kosten_gesamt;
      }
      return total;
    }
  },
  watch: {
    slider() {
      this.renderMyChart();
    }
  }
}
