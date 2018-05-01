<template>
<v-app>
<div id="kalkulation1">
  <div class="row card-panel fixed"> 
    <div class="col l1"></div>
    <div class="col l4" >
      <input type="text" v-model="bezeichnung" class="center" placeholder="Bezeichnung">  
    </div>
    <div class="col l1">
      <input type="text" v-model="zeicheNr" class="center" placeholder="Zeichen Nr.">
    </div>
    <div class="col l1">
      <input type="text" v-model="losgrösse" class="center" placeholder="Losgrösse">
    </div>
    <div class="col l1">
      <input type="text" v-model="date" class="center" placeholder="Datum">
    </div>
    <div class="col l3">  
      <input type="text" v-model="visum" class="center" placeholder="Visum">
    </div>
      <div class="col l1"></div>
  </div>
  <div class="row card-panel ">
    <div class="center col l1"></div>
      <!-- Kostenstelle -->
      <div class="col l2">
        <p class="center">Kostenstelle</p>
        <v-select
          :items="kostenstellen"
          v-model="kostenstelle"
          item-text="kostenstelle"
          solo
          append-icon
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
        <p class="center"> ta </p> <!-- Hover for more information ONLY NR -->
        <input type="text" class="center" v-model="ta">  
      </div>
      <div class="input-filed col l1">
        <p class="center"> tr </p> <!-- Hover for more information ONLY NR-->
        <input type="text" class="center" v-model="tr"> 
      </div>
      <!-- Kostensatz -->
      <div class="col l1">
        <p class="center"> Kostensatz <br>  Fr / Std  </p>
        <p class="center"> {{ this.kostenstelle.ansatz }} </p>
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
        <a class="btn-floating btn-medium waves-effect waves-light blue" v-on:click="storeMessage()" v-on:keyup.enter="storeMessage()"><i class="material-icons">add</i></a>
      </div>
    </div>

  <div v-for="(fertigung, index) in fertigungen" :key='index'>
      <div class="row card-panel">
        <div class="col l1">
          <p class="center"> {{ fertigung.id }} </p>
        </div>
        <div class="col l2">
          <p class="center"> {{ fertigung.kostenstelle }} </p>
        </div>
        <div class="col l2">
          <p class="center"> {{ fertigung.operation }} </p>
        </div>
        <div class="col l1">
          <p class="center" v-if="fertigung.ta !== ''"> {{ fertigung.ta }} Std.</p>
        </div>
        <div class="col l1">
          <p class="center" v-if="fertigung.tr !== ''"> {{ fertigung.tr }} Std.</p>
        </div>
        <div class="col l1">
          <p class="center"> {{ fertigung.ansatz }} CHF </p>
        </div>
        <div class="col l1">
          <p class="center" v-if="fertigung.bearbeitungskosten !== 0"> {{ fertigung.bearbeitungskosten }} CHF </p>
        </div>
        <div class="col l1">
          <p class="center" v-if="fertigung.rüstkosten !== 0"> {{ fertigung.rüstkosten }} CHF </p>
        </div>
        <div class="col l1">
          <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteFertigung(index)" ><i class="material-icons">remove</i></a>
        </div>
      </div>
    </div>
    <div class="row"> 
      <div class="col l7"></div>
      <div class="col l1 card-panel blue white-text" >
        <p class="center mt-3"> Summe </p>
      </div>
      <div class="col l1 card-panel">
        <p class="center mt-3"> {{ sumBKosten }} CHF </p>
      </div>
      <div class="col l1 card-panel">
        <p class="center mt-3"> {{ sumRKosten }} CHF </p>
      </div>
    </div>
    

</div>
</v-app>
</template>

<script>
/* import Firebase from 'firebase'
  
 const config = {
    apiKey: "AIzaSyBIaj6PnxqwhhOqHP6VF3ql4_CbNF9mOSw",
    authDomain: "kalkulation-vue.firebaseapp.com",
    databaseURL: "https://kalkulation-vue.firebaseio.com",
    projectId: "kalkulation-vue",
    storageBucket: "kalkulation-vue.appspot.com",
    messagingSenderId: "411750576448"
  };
firebase.initializeApp(config); */

// const database = firebase.database()
// const FertigungRef = database.ref('fertigungen')


  export default {
    name: 'kalkulation1',
    data () {
      return { 

        fertigungen: [],
        summe: '',

        kostenstelle: '',
        kostenstellen: [
          {
            id : 1,
            kostenstelle : "Fräsmaschine Haas VCE",
            ansatz : 80
          },
          {
            id : 2,
            kostenstelle : "Drehmaschine SL2",
            ansatz : 80
          },
          {
            id : 3,
            kostenstelle : "Handarbeit - konventionell",
            ansatz : 50
          },
          {
            id: 4,
            kostenstelle: "Schleifen",
            ansatz: 60
          },
          {
            id: 5,
            kostenstelle: "Bohren Fehlmann",
            ansatz: 60
          },
          {
            id: 6,
            kostenstelle: "Montage",
            ansatz: 50
          },
          {
            id: 7,
            kostenstelle: "Kontrolle",
            ansatz: 50
          }
        ],

        operation: '',
        ta: '',
        tr: '',

        kostensatz: '',
        bearbeitungskosten: 0,
        rüstkosten: 0,

        row: 0,

      }
    },
    methods: {
      storeMessage: function () {
        if (this.kostenstelle){
          this.row++
          this.bearbeitungskosten = this.kostenstelle.ansatz * this.ta 
          this.rüstkosten = this.kostenstelle.ansatz * this.tr
          this.fertigungen.push({
            id: this.row, 
            kostenstelle: this.kostenstelle.kostenstelle, 
            operation: this.operation, 
            ta: this.ta, 
            tr: this.tr,
            ansatz: this.kostenstelle.ansatz, 
            bearbeitungskosten: this.bearbeitungskosten,
            rüstkosten: this.rüstkosten
          })

        } else {
          nativeToast({
            message: "Ausfüllen!",
            type: 'error',
          })
        }

        this.kostenstelle = '',
        this.operation = ''
        this.ta = '',
        this.tr = ''
      },

      deleteFertigung: function (id) {
        this.fertigungen.splice(id, 1)
        nativeToast({
          message: "Fertigung gelöscht",
          type: 'warning'
        })
      }, 
    },

    computed: {
      sumBKosten: function () {
        var sum = 0
        for (var fertigung of this.fertigungen) {
          sum += fertigung.bearbeitungskosten
        }
        return sum
      },
      sumRKosten: function () {
        var sum = 0
        for (var fertigung of this.fertigungen) {
          sum += fertigung.rüstkosten
        }
        return sum
      }
    },
  }
 
 
 
 /* FertigungRef.on('child_added', snapshot => {
        this.fertigungen.push({...snapshot.val(), id: snapshot.key})
      })
      FertigungRef.on('child_removed', snapshot => {
        const deletedFertigung = this.fertigungen.find(fertigung => fertigung.id === snapshot.key)
        const index = this.fertigungen.indexOf(deletedFertigung)
        this.fertigungen.splice(index, 1)
          nativeToast({
              message: `Fertigung gelöscht`,
              type: 'warning'
          })
      }) */
</script>

<style>

</style>