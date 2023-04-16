<template>
  <ion-card :button="true">
    <ion-card-header>
      <ion-card-subtitle>Mentor {{ mentor }}</ion-card-subtitle>
      <ion-card-title>Pripravnik {{ pripravnik }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <!-- {{ opis }} -->
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
    <ion-button fill="clear" @click.prevent="$emit('accept')"
      >Potrdi</ion-button
    >
    <ion-button fill="clear" @click.prevent="$emit('reject')"
      >Zavrni</ion-button
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

export default {
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
  },
  props: ["mentor", "pripravnik", "opis"],
  emits: ["accept", "reject"],
}
</script>
