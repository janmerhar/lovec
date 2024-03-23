<template>
  <modal-template>
    <template #header>
      <modal-header
        @confirm="useModal().confirmModal"
        @cancel="useModal().cancelModal"
        >abc</modal-header
      >
    </template>

    <template #body>
      <ion-item>
        <ion-label position="stacked">Your name</ion-label>
        <ion-input placeholder="Your name"></ion-input>
      </ion-item>
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonInput } from "@ionic/vue"

import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import { useModal } from "@/composables/useModal"
</script>
