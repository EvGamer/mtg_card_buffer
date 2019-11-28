<template>
  <div class="input-container">
    <input
      size="1"
      v-if="isEditing"
      v-model="newValue"
      @dblclick="confirm"
      @keypress.enter="confirm"
      class="input"
    />
    <div
      v-else
      @dblclick="edit"
      class="text"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: ['value'],
    data() {
      return {
        newValue: '',
        isEditing: false,
      }
    },
    methods: {
      edit() {
        this.newValue = this.text;
        this.isEditing = true;
      },
      confirm() {
        this.isEditing = false;
        this.value = this.newValue;
      }
    }
  }
</script>

<style scoped>
  .input-container {
    color: #c1d9d1;
    padding: 0;
  }
  .text {
    min-width: 30px;
    text-align: center;
    padding: 0;
  }
  .input {
    width: 100%;
    padding: 0;
    margin: 0;
    min-height: 0;
    border: none;
    color: #c1d9d1;
    border-bottom: 1px solid #c1d9d1;
    background-color: transparent;
  }
</style>

