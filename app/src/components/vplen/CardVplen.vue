<template>
  <ion-card :button="true">
    <ion-card-header>
      <ion-card-subtitle>{{ lovec }}</ion-card-subtitle>
      <ion-card-title>{{ formatDateToString(datum) }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-list lines="none">
        <ion-item v-for="zival in vplen" :key="vplen.id">
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
import { defineComponent, ref } from "vue"

import { Vplen } from "@/entities/Vplen"

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
  // props: ["datum", "lovec", "vplen"],
  props: {
    datum: {
      type: String,
      required: true,
    },
    lovec: {
      type: String,
      required: true,
    },
    vplen: {
      type: Array as () => Vplen[],
      required: true,
    },
  },
  emits: ["view"],
  methods: {
    formatDateToString(date: string) {
      const datum = new Date(date)
      const formattedDate = datum.toLocaleDateString("sl-SI", {
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
