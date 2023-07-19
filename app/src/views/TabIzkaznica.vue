<template>
  <ion-page>
    <ion-content class="ion-padding-horizontal">
      <h1 class="ion-text-center">Izkaznica</h1>

      <grid-izkaznica :profile_picture="profile_picture"></grid-izkaznica>

      <ion-button expand="full">Odjava iz aplikacije</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton } from "@ionic/vue"
import GridIzkaznica from "@/components/izkaznica/GridIzkaznica.vue"

export default {
  components: {
    IonPage,
    IonContent,
    GridIzkaznica,
    IonButton,
  },
  data() {
    return {}
  },
}
</script>
