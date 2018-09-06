<template>
<div class="nav">
  <div class="nav-logo"><img src="../assets/favicon.png" alt="TF-Bern Logo"></div>
  <div class="nav-title"><p>Kalkulationsblatt</p></div>
  <div class="filler"></div>
</div>
</template>

<script>
export default {
  data() {
    return { }
  }
};
</script>

<style scoped>
.nav{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  height: 100px;
  background-color: #0082b4;
  position: fixed;
  width: 100%;
  z-index: 9999;
}

.nav-logo img{
  width: 100px;
  margin-left: 100px;
}

.nav-title{
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
  color: white;
  font-size: 2.5em;
}


</style>
