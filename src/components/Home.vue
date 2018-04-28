<template>
<v-app>
<div id="kalkulation1" class="container">
   <div class="row card-panel">
      <div class="center col l1"></div>
      <!-- Kostenstelle -->
      <div class="col l2">
        <v-select
          :items="kostenstellen"
          v-model="a1"
          label="Select"
          autocomplete
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
        <p class="center"> {{ kostensatz }} </p>
      </div>
      <div class="col l1">
        <p class="center"> Bearbeitungskosten <br> Losgrösse </p>
        <p class="center"> {{ bearbeitungskosten }} </p>
      </div>
      <div class="col l1">
        <p class="center"> Rüstkosten <br> Losgrösse </p>
        <p class="center"> {{ rüstkosten }} </p>
      </div>
      <!-- + -->
      <br>
      <a class="btn-floating btn-medium waves-effect waves-light blue" v-on:click="storeMessage()"><i class="material-icons">add</i></a>
    </div>

  <div v-for="fertigung in fertigungen" v-bind:key="fertigung.id">
      <div class="row card-panel">
        <div class="center col l1"></div>
        <div class="col l2">
          <p class="center"> {{fertigung.kostenstelle}} </p>
        </div>
        <div class="col l2">
          <p class="center"> {{fertigung.operation}} </p>
        </div>
        <div class="col l2">
          <p class="center"> {{fertigung.ta}} </p>
        </div>
        <div class="col l2">
          <p class="center"> {{fertigung.tr}} </p>
        </div>
        <div class="col l5"></div>
        <a class="btn-floating btn-medium waves-effect waves-light red" v-on:click="deleteFertigung(fertigung)" ><i class="material-icons">remove</i></a>
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

        kostenstelle: '',
        kostenstellen: [
          {
            "id" : 1,
            "Kostenstelle" : "Fräsmaschine Haas VCE",
            "ansatz" : 80

          },
          {
            "id" : 2,
            "Kostenstelle" : "Drehmaschine SL2",
            "ansatz" : 80
          },
          {
            "id" : 3,
            "Kostenstelle" : "Handarbeit - konventionell",
            "ansatz" : 50
          },
          {
          "id": 4,
          "Kostenstelle": "Schleifen",
          "ansatz": 60
          },
          {
            "id": 5,
            "Kostenstelle": "Bohren Fehlmann",
            "ansatz": 60
          },
          {
            "id": 6,
            "Kostenstelle": "Montage",
            "ansatz": 50
          },
          {
            "id": 7,
            "Kostenstelle": "Kontrolle",
            "ansatz": 50
          }
        ],
        operation: '',
        ta: '',
        tr: '',

        kostensatz: '',
        bearbeitungskosten: '',
        rüstkosten: '',

        rows: 1,

      }
    },
    methods: {
      storeMessage () {
        console.log('sip')
        FertigungRef.push({kostenstelle: this.kostenstelle, operation: this.operation, ta: this.ta, tr: this.tr})
        this.kostenstelle = '',
        this.operation = ''
        this.ta = '',
        this.tr = ''
      },
      deleteFertigung (fertigung) {
        FertigungRef.child(fertigung.id).remove()
      },
      
    },

    created () {
      FertigungRef.on('child_added', snapshot => {
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
      })
    }


  }

// Autocomplete
//  :error-messages="['Please select an option']"
</script>

<style>

</style>