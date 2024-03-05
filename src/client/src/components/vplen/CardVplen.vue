<template>
  <ion-card :button="true">
    <ion-card-header>
      <!-- TODO: popravi tole -->
      <!-- MOGOCE, razmisli -->
      <ion-card-subtitle>Lovec lovec -- todo</ion-card-subtitle>
      <ion-card-title>{{ formatDateToString(vplen.datum) }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-list lines="none">
        <ion-item v-for="(zival, index) in vplen" :key="index">
          <ion-label>
            {{ zival }}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
    <ion-button fill="clear" @click.prevent="$emit('view')">Več</ion-button>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue"

import { defineComponent } from "vue"

import type { VplenDetails } from "@/types"

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
  },
  props: {
    vplen: {
      type: Object as () => VplenDetails,
      required: true,
    },
  },
  emits: ["view"],
  methods: {
    formatDateToString(date: string) {
      const datum = new Date(date)
      const formattedDate = datum.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })

      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    },
  },
})
</script>
