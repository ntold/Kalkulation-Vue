<template>
    <div class="row card-panel">
      <!-- Kostenstelle -->
      <div class="input-filed col l2">
        <p class="center">Kostenstelle</p>
        <input type="text" v-model="kostenstelle" placeholder="dropdown todo">  
      </div>
      <!-- Operation -->
      <div class="input-filed col l2">
        <p class="center">Operation</p>
        <input type="text" v-model="operation">  
      </div>
      <!-- ta tr -->
      <div class="input-filed col l1">
        <p class="center">Std // ta</p> <!-- Hover for more information ONLY NR -->
        <input type="text" v-model="ta">  
      </div>
      <div class="input-filed col l1">
        <p class="center">Std // tr</p> <!-- Hover for more information ONLY NR-->
        <input type="text" v-model="tr">  
      </div>
    </div>
    
</template>

<script>
export default {
  name: 'fertigung',
  data () {
    return {
      kostenstelle: '',
      operation: '',
      ta: '',
      tr: ''
    }
  }

}
</script>

<style>

</style>
