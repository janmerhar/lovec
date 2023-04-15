<template>
  <ion-card :button="true">
    <ion-card-header>
      <ion-card-title>{{ oprema }}</ion-card-title>
      <ion-card-subtitle>{{ datum }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <!-- {{ vplen }} -->
      Podrobnosti vplena, Podrobnosti vplena, Podrobnosti vplena, Podrobnosti
      vplena, Podrobnosti vplena, Podrobnosti vplena, Podrobnosti vplena,
      Podrobnosti vplena, Podrobnosti vplena, (Omejena dolžina, se preuredi)

      <!-- 
        Nacrt:
        - naredi trim na cca 200 znakov ter jim pripni tri pike
        - za vnos vzemi kar vnose iz tabele vplenov v vrsti objekta
        - vnose nato preuredi v string
        - Naj bo samo prvi znak v besedilu uppercase, vsi ostali na bodo lowercase
       -->
    </ion-card-content>
    <!-- <ion-button fill="clear" @click.prevent="$emit('view')">Več</ion-button> -->
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  // IonButton,
} from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    // IonButton,
  },
  props: ["datum", "oprema", "vplen"],
  emits: ["view"],
})
</script>
