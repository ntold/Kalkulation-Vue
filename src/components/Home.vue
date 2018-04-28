<template>
<v-app>
    <div class="row card-panel">
      <div class="center col l1"></div>
      <!-- Kostenstelle -->
      <div class="col l2">
        <p class="center">Kostenstelle</p>
        <input type="text" v-model="messageText">  
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
      <a class="btn-floating btn-medium waves-effect waves-light red" v-if="rows > 1" v-on:click="rows -= 1" ><i class="material-icons">remove</i></a>
    </div>

    <div v-for="message in messages" v-bind:key="message.id" class="card mb-3">
      <div class="card-body">

        <p class="card-text">{{ message.text }}</p>
      </div>
    </div>
</v-app>
</template>

<script>
import firebase from 'firebase'
  
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
  const messagesRef = database.ref('messages')

  export default {
    name: 'kalkulation1',
    data () {
      return {
        fertigungen: [],
        messages: [],

        messageText: '',

        kostenstelle: '',
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
        messagesRef.push({text: this.messageText})
        this.messageText = ''
      }
      }

  }

// Autocomplete
//  :error-messages="['Please select an option']"
</script>

<style>

</style>