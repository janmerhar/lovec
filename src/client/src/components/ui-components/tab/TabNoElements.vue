<template>
  <!-- Showing message only if there's no items -->
  <template v-if="elements.length == 0">
    <div>no elements</div>
  </template>
</template>

<script setup lang="ts">
defineProps({
  elements: {
    type: Array,
    required: true,
  },
})
</script>
