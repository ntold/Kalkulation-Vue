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
                    
                    <div class="title-item">JS_INPUT</div>
                    <div class="title-item">JS_INPUT</div>
                    <div class="title-item">JS_INPUT</div>
                    <div class="title-item">JS_INPUT</div>
                    <div class="title-item">JS_INPUT</div>

                </div>
                <div class="content-page">
                    <div>
                        <!-- Title -->
                        <div>Fertigungslohnkosten</div>
                        <div>Fertigungsgemeinkosten ( 10% )</div>
                        <div ><b>Fertigungskosten</b></div>
                    </div>
                    <div>
                        <!-- Values -->
                        <div class="content-page-value">{{totalLKosten}}</div>
                        <div class="content-page-value">JS_INPUT</div>
                        <div class="content-page-value">&ensp;</div>
                    </div>

                    <!-- Values -->
                    <div>
                        <div class="content-page-value">&ensp;</div>
                        <div class="content-page-value">&ensp;</div>
                        <div class="content-page-value">JS_INPUT</div>
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
                        <div class="content-page-value">JS_INPUT</div>
                        <div class="content-page-value">JS_INPUT</div>
                        <div class="content-page-value ">&ensp;</div>
                    </div>

                    <div>
                        <div class="content-page-value">&ensp;</div>
                        <div class="content-page-value">&ensp;</div>
                        <div class="content-page-value ">JS_INPUT</div>
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
                    <div class="content-page-value ">JS_INPUT</div>
                    <div class="content-page-value ">&ensp;</div>

                    <!-- Title -->
                    <div class=""><b>Herstellungskosten</b></div>
                    <!-- Values -->
                    <div class="content-page-value ">&ensp;</div>
                    <div class="content-page-value ">JS_INPUT</div>
                    <div class="content-page-value ">JS_INPUT</div>

                    <!-- Title -->
                    <div class=""><b>VVGK ( 5% v. HK )</b></div>
                    <!-- Values -->
                    <div class="content-page-value ">&ensp;</div>
                    <div class="content-page-value ">&ensp;</div>
                    <div class="content-page-value ">JS_INPUT</div>

                    <!-- Title -->
                    <div><b>Selbstkosten</b></div>
                    <!-- Values -->
                    <div class="content-page-value">&ensp;</div>
                    <div class="content-page-value">&ensp;</div>
                    <div class="content-page-value">JS_INPUT</div>
                </div>
            </div>
            <div class="fixed-action-btn" v-on:click="goTo()">
            <button class="btn right btnnext">Weiter
                <i class="material-icons right">arrow_forward_ios</i>
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
      kostenstellen: [],
      fertigungen: {}
    };
  },
  methods: {
    goTo() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/total` });
    },
    goBack() {
      const key = `${this.$route.params.id}`;
      this.$router.push({ path: `/edit/${key}/einmaligekosten` });
    }
  },
  mounted() {
    var query = this.$parent.totalFertigung;
    query.once("value").then(snapshot => {
      this.fertigungen = snapshot.child("fertigung").val();
    });
  }
  //   computed: {
  //     totalLKosten: function() {
  //       var total = 0;
  //       var kp = Object.values(this.fertigungen)[0];
  //       kp.ansatz = kp.ansatz.toString();
  //       console.log(kp.ansatz);

  //       for (var fertigung in this.fertigungen) {
  //         // console.log(fertigung);
  //       }
  //       return total;
  //     }
  //   }
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
