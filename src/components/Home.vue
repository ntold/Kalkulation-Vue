<template>
  <div class="container">
    <div class="center">
        <h4 class="truncate">Willkommen zurück</h4>
    </div>
    <div class="push"></div>
    <div class="row">
		<div class="col l6">
			<a class="waves-effect waves-light btn-large right btn1" v-on:click="fertigungActive = true">Neue Fertigung</a>
		</div>
    <div v-if="fertigungActive" id="modal-template" type="text/x-template"> 
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="header-grid">
                <div class="cancel" v-on:click="fertigungActive = false"><i class="material-icons">close</i></div>
                <div class="modal-header">Neue Fertigung</div>
                <div></div>
              </div>
              
              <div class="modal-body">
                <slot name="body">
                  <input type="text" class="left" placeholder="Name">
                  <input type="text" class="left" placeholder="Ersteller">
                </slot>
              </div>

              <div class="modal-footer">
                <slot class="footer-grid" name="footer">
                  <button class="date" disabled> {{datum}} </button>
                  <button class="waves-effect waves-light btn-small btn2 btn-ok" v-on:click="/*#TODO*/">
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
			<a class="waves-effect waves-light btn-large btn2">Vorhandene auswählen</a>
		</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      fertigungActive: false,
    };
  },
  methods: {
    neueFertigung() {
      this.fertigungActive = true;
    }
  },
  computed: {
    datum() {
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
        (d.getDate() + ". " +
        month[d.getMonth()] + " " +
        d.getFullYear());
      return this.time;
    }
  }
};

</script>

<style scoped>
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

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header{
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

.modal-enter, .modal-leave-active {
  opacity: 0;
}

.header-grid{
  display: grid;
  grid-template-columns: 0.05fr 1fr 0.05fr;
}

.cancel{
  cursor: pointer;
  color: red;
  font-size: 20px;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel:hover{
  color: firebrick;
}

.btn-ok{
  width: 140px !important;
  float: right;
  margin-top: 50px;
}

.date{
  margin-top: 50px;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.footer-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

</style>
