<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!--  -->
      <h3 class="ion-text-center">Evidenca opreme za dan</h3>
      <div class="ion-padding">
        <ion-item fill="outline" class="">
          <ion-label position="stacked">Datum</ion-label>
          <ion-input
            placeholder="Datum"
            type="date"
            :clear-input="true"
            required
          ></ion-input>
        </ion-item>
      </div>
      <!--  -->
      <card-oprema-description
        :oprema="'Puška'"
        datum="Ponedeljek, 13. 3. 2023"
      ></card-oprema-description>
      <card-oprema-description
        :oprema="'Puška'"
        datum="Ponedeljek, 13. 3. 2023"
      ></card-oprema-description>
      <card-oprema-description
        :oprema="'Puška'"
        datum="Ponedeljek, 13. 3. 2023"
      ></card-oprema-description>
      <!--  -->
      <fab-button-add @click.prevent="openModalOpremaAdd"></fab-button-add>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalOpremaAdd from "@/components/oprema/ModalOpremaAdd.vue"
import CardOpremaDescription from "@/components/oprema/CardOpremaDescription.vue"

import {
  IonPage,
  // IonHeader,
  // IonToolbar,
  // IonTitle,
  IonContent,
  modalController,
  IonInput,
  IonLabel,
  IonItem,
} from "@ionic/vue"

export default {
  components: {
    IonPage,
    // IonHeader,
    // IonToolbar,
    // IonTitle,
    IonContent,
    FabButtonAdd,
    CardOpremaDescription,
    IonInput,
    IonLabel,
    IonItem,
  },
  methods: {
    async openModalOpremaAdd() {
      const modal = await modalController.create({
        component: ModalOpremaAdd,
      })
      modal.present()

      // const { data, role } = await modal.onWillDismiss()

      // if (role === "confirm") {
      //   this.message = `Hello, ${data}!`
      // }
    },
  },
}
</script>
