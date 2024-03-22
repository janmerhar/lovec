<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click.prevent="emit('cancel')">
          <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" />
        </ion-button>
      </ion-buttons>

      <ion-title class="ion-text-center">
        <!-- slot for providing title -->
        <slot></slot>
      </ion-title>

      <ion-buttons slot="end" v-if="confirmButton">
        <ion-button @click.prevent="emit('confirm')">
          <font-awesome-icon :icon="['fas', 'plus']" size="xl" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/vue"

const emit = defineEmits(["confirm", "cancel"])

defineProps({
  confirmButton: {
    type: Boolean,
    default: true,
    required: false,
  },
})
</script>
