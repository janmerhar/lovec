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
    return {
      profile_picture:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F08%2Fsimp_homersingle08_f_hires2-2000.jpg&q=60",
    }
  },
}
</script>
