<template>
  <div class="container">
    <div class="center">
        <h4 class="truncate">Willkommen zurück</h4>
    </div>
    <div class="push"></div>
    <div class="row">
		<div class="col l6">
			<a class="waves-effect waves-light btn-large right btn1" v-on:click="neueFertigung" >Neue Fertigung</a>
		</div>
    <div v-if="fertigungActive" class="card-panel"> 

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
      fertigungActive: false
    };
  },
  methods: {
    neueFertigung() {
      this.fertigungActive = true;
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
</style>
