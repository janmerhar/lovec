<template>
  <ion-card :button="true">
    <ion-card-header>
      <ion-card-subtitle>{{ oprema.tip }}</ion-card-subtitle>
      <ion-card-title>{{ oprema.naziv }}</ion-card-title>
      <ion-card-subtitle>
        Dodana:
        {{ formatDate(oprema.datum) }}
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{ oprema.stanje }}
    </ion-card-content>
    <ion-button fill="clear" @click.prevent="$emit('izbrisi', oprema.id)"
      >Izbriši</ion-button
    >
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
} from "@ionic/vue"

import { defineComponent } from "vue"
import { Oprema } from "@/types"

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
  },
  props: {
    oprema: {
      type: Object as () => Oprema,
      required: true,
    },
  },
  emits: ["izbrisi"],
  methods: {
    formatDate(datum: string) {
      const date = new Date(datum)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `${day}. ${month}. ${year}`
    },
  },
})
</script>
