<template>
  <div class="parent">
    <div class="child">
      <template v-if="elements.length == 0 && isLoading">
        <ion-spinner></ion-spinner>
      </template>

      <template v-else-if="elements.length == 0">
        <font-awesome-icon :icon="['fas', 'ban']" class="fa-8x" fixed-width />
        <p class="no-elements">
          {{ $t("framework.TabNoElements.noElements") }}
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { IonSpinner } from "@ionic/vue"

defineProps({
  elements: {
    type: Array,
    required: true,
  },
})

const isLoading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})
</script>

<style scoped>
.parent {
  position: relative;
  top: 30vh;
  color: var(--ion-background-color-step-600);
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.no-elements {
  font-size: 1.25rem;
  text-transform: uppercase;
}
</style>
