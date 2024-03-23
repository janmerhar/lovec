<template>
  <modal-template>
    <template #header>
      <modal-header
        @cancel="useModal().cancelModal"
        @confirm="useModal().confirmModal"
        >Vnesi dnevnik</modal-header
      >
    </template>
    <template #body>
      <datepicker-horizontal class="ion-margin-bottom"></datepicker-horizontal>
      <!--
      Izbira mentorja
      - mentor je ze izbran, zato uporabnik nima izbire
      -->
      <ion-item fill="solid" class="ion-margin-vertical">
        <ion-label position="stacked">Mentor</ion-label>
        <ion-input type="text" :value="'abc'" disabled></ion-input>
      </ion-item>
      <!--
      Nastavi input na dropdown
      -->
      <ion-item fill="solid" class="ion-margin-bottom">
        <ion-label position="stacked">Delo</ion-label>
        <ion-input
          placeholder="Delo"
          type="text"
          v-model="delo"
          required
        ></ion-input>
      </ion-item>
      <!--  -->
      <ion-item fill="solid" class="ion-margin-top">
        <ion-label position="stacked">Ure</ion-label>
        <ion-input
          placeholder="Ure"
          type="number"
          v-model="ure"
          required
        ></ion-input>
      </ion-item>
      <!--  -->
      <ion-item fill="solid" class="ion-margin-top">
        <ion-label position="stacked">Opis</ion-label>
        <ion-textarea
          label="Solid textarea"
          labelPlacement="floating"
          :auto-grow="true"
          :rows="6"
          fill="solid"
          placeholder="Vnesi opis"
          v-model="opis"
        ></ion-textarea>
      </ion-item>
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonInput, IonTextarea } from "@ionic/vue"
import { ref } from "vue"

import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"

import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import { useModal } from "@/composables/useModal"

const datum = ref(new Date().toISOString().slice(0, 10))
const delo = ref("")
const ure = ref(1)
const opis = ref("")
const name = ref("")
</script>
