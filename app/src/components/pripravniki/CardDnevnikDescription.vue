<template>
  <ion-card :button="true" :color="color(dnevnik)">
    <ion-card-header>
      <ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
      <ion-card-title> {{ title }}</ion-card-title>
    </ion-card-header>

    <ion-card-content :color="color(dnevnik)">
      <ion-list>
        <!-- <ion-item :color="color(dnevnik)">
          Status: {{ dnevnik.status }}</ion-item
        > -->
        <ion-item :color="color(dnevnik)"> Ure: {{ dnevnik.ure }} </ion-item>
        <ion-item :color="color(dnevnik)"> Delo: {{ dnevnik.delo }} </ion-item>
        <ion-item :color="color(dnevnik)">
          Opis: <br />{{ dnevnik.opis }}
        </ion-item>
      </ion-list>
    </ion-card-content>

    <template v-if="showButtons && dnevnik.status == 'neobdelan'">
      <ion-button
        fill="clear"
        @click.prevent="$emit('accept', dnevnik._id ?? dnevnik.id)"
        >Potrdi</ion-button
      >
      <ion-button
        fill="clear"
        @click.prevent="$emit('reject', dnevnik._id ?? dnevnik.id)"
        >Zavrni</ion-button
      >
    </template>
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
} from "@ionic/vue"

export default {
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonList,
    IonItem,
  },
  props: ["subtitle", "title", "dnevnik", "showButtons"],
  emits: ["accept", "reject"],
  methods: {
    color(dnevnik) {
      if (dnevnik.status == "potrjen") return "primary"
      if (dnevnik.status == "zavrnjen") return "danger"
    },
  },
}
</script>

<style scoped>
/* #afafaf */
/* #e74c3c  */

ion-list {
  padding: 0;
}

.neobdelan {
  background-color: #afafaf !important;
  --background: #afafaf;
}
.zavrnjen {
  background-color: #e74c3c !important;
  --background: #e74c3c;
}
</style>
