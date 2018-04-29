<template>
<v-app>
<div id="kalkulation1" class="container">
   <div class="row card-panel">
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
        <input type="text" v-model="operation">  
      </div>
      <!-- ta tr -->
      <div class="input-filed col l1">
        <p class="center">Std // ta</p> <!-- Hover for more information ONLY NR -->
        <input type="text" class="center" v-model="ta">  
      </div>
      <div class="input-filed col l1">
        <p class="center">Std // tr</p> <!-- Hover for more information ONLY NR-->
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
      <br>
      <a class="btn-floating btn-medium waves-effect waves-light blue" v-on:click="storeMessage()"><i class="material-icons">add</i></a>
    </div>

  <div v-for="fertigung in fertigung" v-bind:key="fertigung.id">
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
          <p class="center"> {{ fertigung.ta }} </p>
        </div>
        <div class="col l1">
          <p class="center"> {{ fertigung.tr }} </p>
        </div>
        <div class="col l1">
          <p class="center"> {{ fertigung.ansatz }} </p>
        </div>
        <div class="col l1">
          <p class="center" v-if="fertigung.bearbeitungskosten !== 0"> {{ fertigung.bearbeitungskosten }} </p>
        </div>
        <div class="col l1">
          <p class="center" v-if="fertigung.rüstkosten !== 0"> {{ fertigung.rüstkosten }} </p>
        </div>
        <div class="col l1">
          <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteFertigung(fertigung)" ><i class="material-icons">remove</i></a>
        </div>
      </div>
    </div>
    

</div>
</v-app>
</template>

<script>
import Firebase from 'firebase'
  
const config = {
    apiKey: "AIzaSyBIaj6PnxqwhhOqHP6VF3ql4_CbNF9mOSw",
    authDomain: "kalkulation-vue.firebaseapp.com",
    databaseURL: "https://kalkulation-vue.firebaseio.com",
    projectId: "kalkulation-vue",
    storageBucket: "kalkulation-vue.appspot.com",
    messagingSenderId: "411750576448"
  };
firebase.initializeApp(config);

const database = firebase.database()
const FertigungRef = database.ref('fertigungen')


  export default {
    name: 'kalkulation1',
    data () {
      return {
        fertigungen: [],

        fertigung: [],

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
        bearbeitungskosten: '',
        rüstkosten: '',

        row: 0,

      }
    },
    methods: {
      storeMessage () {
        if (this.kostenstelle){
          this.row = this.row + 1
          this.bearbeitungskosten = this.kostenstelle.ansatz * this.ta 
          this.rüstkosten = this.kostenstelle.ansatz * this.tr
          this.fertigung.push({
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
            message: `Ausfüllen G'!`,
            type: 'error',
          })
        }


        this.kostenstelle = '',
        this.operation = ''
        this.ta = '',
        this.tr = '',
        this.bearbeitungskosten = '',
        this.rüstkosten = ''

      },
      deleteFertigung (fertigung) {
       this.fertigung.splice(this.fertigung, 1)
        nativeToast({
          message: `Fertigung gelöscht`,
          type: 'warning'
          })
      },
      
    },

    created () {

    }


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
// Autocomplete
//  :error-messages="['Please select an option']"
</script>

<style>

</style>