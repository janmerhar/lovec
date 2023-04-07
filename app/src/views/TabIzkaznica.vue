<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Izkaznica</ion-title>
        </ion-toolbar>
      </ion-header>

      <div>
        <ion-text color="primary">
          <h5>Ime</h5>
        </ion-text>
        <ion-text color="dark"> Janez Novak </ion-text>
      </div>

      <br />
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue"
import QrcodeVue from "qrcode.vue"
import { defineComponent } from "vue"

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    QrcodeVue,
  },
  data() {
    return {
      qr_value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    }
  },
}
</script>
