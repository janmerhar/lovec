<template>
  <input
    type="text"
    class="input-search-bar"
    :placeholder="placeholder"
    v-model="search"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"

defineProps({
  placeholder: {
    type: String,
    default: "Search...",
  },
})

const search = ref("")
</script>
