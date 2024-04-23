<template>
  <img
    :src="url"
    style="
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 50%;
      border: 1px solid var(--ion-color-step-600);
    "
  />
</template>

<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: false,
  },
})
</script>
