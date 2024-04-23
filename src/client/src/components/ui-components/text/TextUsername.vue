<template>
  <p
    style="
      margin-bottom: -5px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
      color: var(--ion-color-medium);
    "
  >
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
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: false,
  },
})
</script>
