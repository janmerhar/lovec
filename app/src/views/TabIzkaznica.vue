<template>
  <ion-page>
    <ion-content class="ion-padding-horizontal">
      <h1 class="ion-text-center">Izkaznica</h1>

      <grid-izkaznica :profile_picture="profile_picture"></grid-izkaznica>

      <h1 class="ion-text-center">QR koda</h1>
      <qrcode-vue
        :value="qr_value"
        :size="1000"
        level="H"
        style="width: 100%; height: auto"
      />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue"
import QrcodeVue from "qrcode.vue"
import GridIzkaznica from "@/components/izkaznica/GridIzkaznica.vue"

export default {
  components: {
    IonPage,
    QrcodeVue,
    IonContent,
    GridIzkaznica,
  },
  data() {
    return {
      profile_picture:
        "https://cdna.artstation.com/p/assets/images/images/038/826/858/large/edward-munn-edm-asset.jpg?1624192416",
      qr_value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    }
  },
}
</script>
