<template>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-button @click.prevent="emit('cancel')">
        <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" />
      </ion-button>
    </ion-buttons>

    <ion-title slot="" class="ion-text-center header-text">
      <!-- slot for providing title -->
      <slot></slot>
    </ion-title>

    <ion-buttons slot="end" style="min-width: 38px">
      <ion-button @click.prevent="emit('confirm')" v-if="confirmButton">
        <font-awesome-icon :icon="['fas', 'check']" size="xl" />
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script setup lang="ts">
import { IonToolbar, IonTitle, IonButtons, IonButton } from "@ionic/vue"

const emit = defineEmits(["confirm", "cancel"])

defineProps({
  confirmButton: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

<style scoped>
.header-text {
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
}

ion-toolbar {
  --min-height: 65px;
}
</style>
