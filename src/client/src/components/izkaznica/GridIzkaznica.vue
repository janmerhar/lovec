<template>
  <ion-grid class="ion-padding-vertical">
    <ion-row>
      <ion-col class="ion-no-padding" size="5">
        <img :src="profile_picture" alt="Profile picture" />
      </ion-col>
      <ion-col size="7">
        <ion-text color="primary"> Ime </ion-text>
        <p>
          <ion-text color="dark"> Janez Novak </ion-text>
        </p>
        <ion-text color="primary"> Priimek </ion-text>
        <p>
          <ion-text color="dark"> Janez </ion-text>
        </p>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-text color="primary"> Datum rojstva </ion-text>
        <p>
          <ion-text color="dark"> 1. 1. 2002 </ion-text>
        </p>
      </ion-col>
      <ion-col>
        <ion-text color="primary"> ID imetnika </ion-text>
        <p>
          <ion-text color="dark"> 63200000 </ion-text>
        </p>
      </ion-col>
      <ion-col>
        <ion-text color="primary"> Lovišče </ion-text>
        <p>
          <ion-text color="dark"> Bukovica </ion-text>
        </p>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { IonText, IonGrid, IonRow, IonCol } from "@ionic/vue"

export default {
  components: {
    IonText,
    IonGrid,
    IonRow,
    IonCol,
  },
  props: ["profile_picture"],
}
</script>
