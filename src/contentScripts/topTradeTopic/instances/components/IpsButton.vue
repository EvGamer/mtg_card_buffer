<template>
  <button
    class="ipsButton ipsButton_verySmall ipsButton_light"
    @click.prevent="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "IpsButton",
  emits: ["click"]
}
</script>
