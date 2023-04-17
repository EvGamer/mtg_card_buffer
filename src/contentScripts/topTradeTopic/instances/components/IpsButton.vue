<template>
  <button
    class="ipsButton ipsButton_verySmall ipsButton_light"
    @click.prevent="toggleTable"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "IpsButton"
}
</script>
