<template>
  <v-app>
    <div class="container">
      <div class="center">
        <h4 class="truncate">Willkommen zurück</h4>
      </div>
      <div class="push"></div>
      <div class="row">
      <div class="col l6">
        <a class="waves-effect waves-light btn-large right btn1" v-on:click="fertigungActive = true">Neue Kalkulation</a>
      </div>
      <div v-if="fertigungActive"> 
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="header-grid">
                  <div class="cancel" v-on:click="fertigungActive = false"><i class="material-icons">close</i></div>
                  <div class="modal-header">Neue Kalkulation</div>
                  <div></div>
                </div>
                <div class="modal-body">
                  <slot name="body">
                    <div class="new-calc">
                      <div class="input-name"><input type="text" class="left" placeholder="Bezeichnung" v-model="bezeichnung"></div> 
                      <div class="input-nr"><input type="text" class="left" placeholder="Zeichen Nr." v-model="zeichenNr"></div>
                      <button class="date input-date" disabled> {{date}} </button>
                      <v-select class="input-visum" placeholder="Visum" :items="visa" v-model="visum" item-text="name" flat solo autocomplete></v-select>
                    </div>
                  </slot>
                </div>
                <div class="modal-footer">
                  <slot class="footer-grid" name="footer">
                    
                    <button class="waves-effect waves-light btn-small btn2 btn-ok" v-on:click="storeInfo()">
                      Erstellen
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="col l6">
        <a class="waves-effect waves-light btn-large btn2" v-on:click="existingActive = true">Vorhandene auswählen</a>
      </div>
      <div v-if="existingActive"> 
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container2">
                <div class="header-grid">
                  <div class="cancel" v-on:click="existingActive = false"><i class="material-icons">close</i></div>
                  <div class="modal-header">Fertigungen</div>
                  <div></div>
                </div>
                
                <div class="modal-body">
                  <slot name="body">
                      <form class="example-form">
                      <mat-form-field class="example-full-width">
                        <mat-autocomplete autoActiveFirstOption >
                          <mat-option>
                            <div class="card-panel card-box">
                              <div class="thead-grid">
                                <div>Name / Ersteller</div>
                                <div>Status / Bearbeitet</div>
                              </div>
                              <div class="calc-row" v-for="(kalkulation, index) in kalkulationen" :key="index">
                                  <div class="name" v-on:click="gotoKalk(kalkulation)">{{kalkulation.beschreibung}}</div>
                                  <div class="status" v-on:click="gotoKalk(kalkulation)">{{kalkulation.datum}}</div>
                                  <i class="material-icons" v-on:click="delFertigungOverlay(index)">delete</i>
                                  <div class="creator" v-on:click="gotoKalk(kalkulation)">{{kalkulation.visum}}</div>
                                  <div class="updated" v-on:click="gotoKalk(kalkulation)">{{kalkulation.zeichenNr}}</div>
                                  <div class="calc-row-remove">
                                    <div class="calc-row-remove-grid">
                                      <div>Wollen Sie {{kalkulation.beschreibung}} wirklich löschen?</div>
                                      <div class="icon-wrap">
                                        <div class="done-icon" v-on:click="delFertigung(index, kalkulation)"><i class="material-icons">done</i></div>
                                        <div class="remove-icon" v-on:click="closeDelFertigung(index)"><i class="material-icons">close</i></div>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </mat-option>
                        </mat-autocomplete>
                      </mat-form-field>
                    </form>
                  </slot>
                </div>
                <div class="modal-footer">
                  <slot class="footer-grid" name="footer">
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import database from "./db";

const DatabaseRef = database.ref("Database");
const storeKalkulationRef = database.ref("Kalkulationen");

export default {
  name: "Home",
  data() {
    return {
      visum: "",
      visa: [],

      bezeichnung: "",
      zeichenNr: "",

      name: "",

      fertigungActive: false,
      existingActive: false,
      kalkulationen: []
    };
  },
  methods: {
    neueFertigung() {
      this.fertigungActive = true;
    },
    existing() {
      this.existingActive = true;
    },
    closeDelFertigung(id) {
      var element = $(".calc-row-remove")[id];
      element.classList.remove("flipInX", "display");
    },
    delFertigung(index, kalkulation) {
      this.closeDelFertigung(index);
      
      storeKalkulationRef.child(kalkulation.id).remove();
    },
    delFertigungOverlay(id) {
      var element = $(".calc-row-remove")[id];
      element.classList.add("display", "animated", "flipInX");
    },
    gotoKalk(id) {
      const key = id.id;
      this.$router.push({ path: `/edit/${key}/fertigung` });
    },
    storeInfo: function() {
      var key = storeKalkulationRef.push({
        beschreibung: this.bezeichnung,
        visum: this.visum.name,
        zeichenNr: this.zeichenNr,
        datum: this.date
      });
      this.fertigungActive = false;
      (this.bezeichnung = ""), (this.visum = ""), (this.zeichenNr = "");
    }
  },
  computed: {
    date() {
      var d = new Date();
      var month = new Array();
      month[0] = "Januar";
      month[1] = "Februar";
      month[2] = "März";
      month[3] = "April";
      month[4] = "Mai";
      month[5] = "Juni";
      month[6] = "Juli";
      month[7] = "August";
      month[8] = "September";
      month[9] = "Oktober";
      month[10] = "November";
      month[11] = "Dezember";
      this.time =
        d.getDate() + ". " + month[d.getMonth()] + " " + d.getFullYear();
      return this.time;
    }
  },
  created() {
    storeKalkulationRef.on("child_added", snapshot => {
      this.kalkulationen.push({ ...snapshot.val(), id: snapshot.key });
    });
    storeKalkulationRef.on("child_removed", snapshot => {
      const deletedKalkulation = this.kalkulationen.find(
        kalkulation => kalkulation.id === snapshot.key
      );
      const index = this.kalkulationen.indexOf(deletedKalkulation);
      this.kalkulationen.splice(index, 1);
      nativeToast({
        message: `Fertigung gelöscht`,
        type: "warning"
      });
    });
  },
  mounted() {
    var query = DatabaseRef;
    query.once("value").then(snapshot => {
      this.visa = snapshot.child("visum").val();
    });
  }
};
</script>

<style scoped>
/*Placeholder*/

::placeholder {
  color: grey;
  opacity: 0.5;
}

:-ms-input-placeholder {
  color: grey;
}

::-ms-input-placeholder {
  color: grey;
}

/*Buttons*/

.push {
  margin-bottom: 70px;
}
.btn1 {
  background-color: #008d3b;
  width: 50%;
}

.btn1:hover {
  background-color: #005222;
}

.btn2 {
  background-color: #0082b4;
  width: 50%;
}

.btn2:hover {
  background-color: #005b7d;
}

/*Overlay Neue & Vorhandene Fertigung*/

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-header {
  font-size: 20px;
  margin-top: 0;
  text-align: center;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.header-grid {
  display: grid;
  grid-template-columns: 0.05fr 1fr 0.05fr;
}

.cancel {
  cursor: pointer;
  color: red;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-transition: -webkit-transform 0.25s, opacity 0.25s;
  -moz-transition: -moz-transform 0.25s, opacity 0.25s;
  transition: transform 0.25s, opacity 0.25s;
}
.cancel:hover {
  color: firebrick;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  transform: rotate(180deg);
  opacity: 1;
}

.btn-ok {
  width: 140px !important;
  float: right;
  margin-top: 10px;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/*Neue Kalkulation*/

.modal-container {
  width: 450px;
  height: 350px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.input-name {
  grid-area: name;
  padding: 8px 16px;
}
.input-nr {
  grid-area: nr;
  padding: 8px 16px;
}
.input-date {
  grid-area: date;
  margin-right: 16px;
}
.input-visum {
  grid-area: visum;
}

.new-calc {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "name name"
    "nr date"
    "visum visum";
}

/*Vorhadene Auswählen*/

.modal-container2 {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.card-box {
  overflow: auto;
  height: 500px;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

.thead-grid {
  display: grid;
  grid-template-columns: 1fr 250px 50px;

  background-color: #bbb;
  padding: 5px;
}

.name {
  grid-area: name;
}
.status {
  grid-area: status;
}
.material-icons {
  grid-area: icn;
}
.creator {
  grid-area: creator;
}
.updated {
  grid-area: updated;
}

.calc-row {
  display: grid;
  grid-template-columns: 1fr 250px 50px;
  grid-template-areas:
    "name status icn"
    "creator updated icn";

  /* grid-template-columns: 1fr 250px 50px;
  grid-template-rows: 1fr 1fr 1px; */

  padding: 5px;
}

.calc-row:nth-child(odd) {
  background-color: #eee;
}

.calc-row:hover {
  cursor: pointer;
  background-color: #0082b4;
  transition: ease 0.1s;
  color: white;

  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
}

.calc-row .name {
  margin-left: 0em;
  font-weight: bold;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}

.calc-row .creator {
  font-size: 12px;
}

.material-icons:hover {
  color: firebrick;
}

.material-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.calc-row-remove {
  display: none;
  position: absolute;
  background-color: firebrick;
  color: white;

  height: 52px;
  width: 692px;
}

.calc-row-remove-grid {
  display: grid;
  grid-template-columns: 0.8fr 0.2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  width: 100%;
  padding: 8px 0 8px 14px;
}

.icon-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.done-icon *:hover,
.remove-icon *:hover {
  color: black;
}

.flipInX {
  -webkit-animation: flipInX 0.5s;
  -moz-animation: flipInX 0.5s;
  -o-animation: flipInX 0.5s;
  animation: flipInX 0.5s;
}

.flipOutX {
  -webkit-animation: flipOutX 0.5s;
  -moz-animation: flipOutX 0.5s;
  -o-animation: flipOutX 0.5s;
  animation: flipOutX 0.5s;
}

.display {
  display: flex;
  align-items: center;
  justify-content: center;
}

.display p {
  left: 0;
}
</style>
