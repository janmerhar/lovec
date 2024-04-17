<template>
  <div class="center">
    <img
      :src="slika"
      alt=""
      style="width: 25vh; height: 25vh; object-fit: cover; border-radius: 50%"
    />
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
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
