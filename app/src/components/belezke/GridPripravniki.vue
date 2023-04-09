<template>
  <ion-grid>
    <!-- Header -->
    <ion-row class="background">
      <ion-col class="ion-text-center"><h3>Dnevnik pripravnikov</h3></ion-col>
    </ion-row>
    <ion-row class="header">
      <ion-col class="ion-text-center">Pripravnik</ion-col>
      <ion-col class="ion-text-center">Kratek opis</ion-col>
      <ion-col class="ion-text-center">Datum</ion-col>
    </ion-row>
    <!-- /Header -->
    <!-- Content -->
    <ion-row class="row-border row-hover">
      <ion-col class="ion-text-center" size="2">Janez Novak</ion-col>
      <ion-col class="ion-text-center" size="7">Zelo lepo napreduje</ion-col>
      <ion-col class="ion-text-center" size="3">1. 1. 2023</ion-col>
    </ion-row>
    <ion-row class="row-border row-hover">
      <ion-col class="ion-text-center" size="2">Janez Novak</ion-col>
      <ion-col class="ion-text-center" size="7"
        >Zelo lepo napreduje lalalalala</ion-col
      >
      <ion-col class="ion-text-center" size="3">1. 1. 2023</ion-col>
    </ion-row>
    <!-- /Content -->
    <ion-button expand="full">Odpri dnevnik pripravnikov</ion-button>
  </ion-grid>
</template>
<script>
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
  },
})
</script>

<style>
.background {
  background-color: var(--ion-color-secondary);
}

.row-border {
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.header {
  background-color: var(--ion-color-secondary);
  color: var(--ion-color-tertiary);
  border-bottom: 2px solid black;
}
</style>
