<template>
  <!-- TODO: naredi stil za image update -->
  <!-- Torej neka obroba in zraven ikonca za spremembo -->
  <div class="center">
    <img
      :src="slika"
      alt=""
      style="width: 25vh; height: 25vh; object-fit: cover; border-radius: 50%"
    />
  </div>
  <div style="text-align: center">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  slika: String,
})
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}
</style>
