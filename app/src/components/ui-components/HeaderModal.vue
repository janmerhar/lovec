<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click.prevent="cancel()">
          <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" />
        </ion-button>
      </ion-buttons>

      <ion-title class="ion-text-center">
        <!-- slot for providing title -->
        <slot></slot>
      </ion-title>

      <ion-buttons slot="end">
        <ion-button @click.prevent="confirm()">
          <font-awesome-icon :icon="['fas', 'plus']" size="xl" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/vue"

import { defineComponent } from "vue"

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
  },
  props: {
    confirmButton: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  emits: ["confirm", "cancel"],
  methods: {
    confirm() {
      this.$emit("confirm")
    },
    cancel() {
      this.$emit("cancel")
    },
  },
})
</script>
