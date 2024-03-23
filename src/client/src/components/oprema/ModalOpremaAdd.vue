<template>
  <modal-template>
    <template #header>
      <modal-header
        @cancel="useModal().cancelModal"
        @confirm="useModal().confirmModal"
        :confirm-button="true"
        >blabalbalbj
      </modal-header>
    </template>

    <!--  -->
    <template #body>
      <ion-item fill="solid">
        <ion-label position="stacked">Tip</ion-label>
        <ion-input
          placeholder="Oprema"
          type="text"
          v-model="tip"
          required
        ></ion-input>
      </ion-item>
      <br />
      <ion-item fill="solid">
        <ion-label position="stacked">Naziv</ion-label>
        <ion-input
          placeholder="Oprema"
          type="text"
          v-model="naziv"
          required
        ></ion-input>
      </ion-item>
      <br />
      <ion-item fill="solid">
        <ion-label position="stacked">Opis</ion-label>
        <ion-textarea
          label="Solid textarea"
          labelPlacement="floating"
          :auto-grow="true"
          :rows="6"
          fill="solid"
          placeholder="Vnesi opis"
          v-model="stanje"
        ></ion-textarea>
      </ion-item>
      <!--  -->
      <br />
    </template>
    <!--  -->
  </modal-template>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonInput, IonTextarea } from "@ionic/vue"

import { ref } from "vue"

import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import { useModal } from "@/composables/useModal"

const naziv = ref("")
const tip = ref("")
const stanje = ref("")
</script>
