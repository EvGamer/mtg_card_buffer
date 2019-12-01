<template>
  <div class="number-container">
    <button class='inc' @click="$emit('changeField', value - 1)">-</button>
    <div class='value'> {{ value }} </div>
    <button class='inc' @click="$emit('changeField', value + 1)">+</button>
  </div>  
</template>

<script>
export default {
  name: 'Counter',
  props: ['value'],
}
</script>

<style scoped>
.number-container {
  display: flex;
}

.inc {
  background: none;
  color: inherit;
  padding: 0 3px;
  border: none;
  min-height: 0;
  min-width: 0;
  opacity: 0;
  cursor: pointer;
}

.inc:hover {
  opacity: 1;
}

.inc:focus{
  outline: none;
}

.value {
 padding: 0 3px;
}

</style>
